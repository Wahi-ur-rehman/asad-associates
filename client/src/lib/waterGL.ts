/**
 * Raw-WebGL water hero.
 *
 * A lit architectural water wall stands at the horizon and is mirrored in a
 * perspective water surface. The surface carries slow ambient swell, drifting
 * "drop" ripples, and a wake that follows the visitor's pointer / finger.
 *
 * Performance notes
 *  - one full-screen triangle, a single fragment shader, no textures, no deps
 *  - internal resolution is capped and adapts down if frames run long
 *  - rendering pauses when the hero is off-screen or the tab is hidden
 *  - reduced-motion users get one still frame
 */

export type WaterGLOptions = {
  /** Element that receives pointer events (the canvas itself sits under copy). */
  pointerTarget: HTMLElement;
  reducedMotion: boolean;
};

export type WaterGLHandle = { destroy: () => void };

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPtr;
uniform float uPtrAmp;

float HORIZON; /* set per frame: higher on portrait screens so the copy sits over the water */

float hash(float n){ return fract(sin(n * 127.1) * 43758.5453); }
float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

/* ---------- the lit water wall + night sky -------------------------------- */
vec3 scene(float sx, float sy, float aspect, float t){
  float nx = sx / aspect;
  float up = sy - HORIZON;
  float wide = smoothstep(0.7, 1.5, aspect);
  float cx = mix(0.0, 0.26, wide);
  float hw = mix(0.30, 0.15, wide);
  float ph = mix(0.20, 0.27, wide);

  /* sky: deep teal-black rising to an aqua haze at the horizon */
  vec3 col = mix(vec3(0.020, 0.078, 0.080), vec3(0.060, 0.230, 0.235), exp(-max(up, 0.0) * 6.5));
  col += vec3(0.05, 0.16, 0.15) * exp(-abs(up) * 18.0);

  /* niche: dark stone slab around the wall with a warm LED trim */
  float dx = abs(nx - cx);
  float inSlabX = smoothstep(hw + 0.12, hw + 0.03, dx);
  float inSlabY = step(0.0, up) * smoothstep(ph + 0.12, ph + 0.03, up);
  col = mix(col, vec3(0.012, 0.035, 0.037), inSlabX * inSlabY * 0.78);

  float trim = smoothstep(0.006, 0.0, abs(dx - hw)) * step(0.0, up) * step(up, ph)
             + smoothstep(0.006, 0.0, abs(up - ph)) * step(dx, hw);
  col += vec3(1.0, 0.82, 0.58) * trim * 0.85;

  /* the sheet of water: soft light with falling streaks */
  float inX = smoothstep(hw, hw - 0.012, dx);
  float inY = step(0.0, up) * smoothstep(ph, ph - 0.012, up);
  float cell = floor(nx * mix(160.0, 420.0, wide));
  float s = hash(cell);
  float flow = fract(up * 3.0 + t * (0.35 + s * 0.55) + s * 9.0);
  float streak = smoothstep(0.0, 0.6, flow) * smoothstep(1.0, 0.7, flow);
  vec3 sheet = mix(vec3(0.35, 0.62, 0.60), vec3(1.0, 0.95, 0.84), streak * (0.45 + 0.55 * s));
  sheet *= 0.34 + 0.5 * (1.0 - up / ph);
  col = mix(col, sheet, inX * inY);

  /* glow thrown outward by the wall */
  float glow = exp(-pow(dx / (hw + 0.2), 2.0) * 1.5) * exp(-max(up, 0.0) * 5.0) * step(-0.02, up);
  col += vec3(0.30, 0.52, 0.48) * glow * 0.20;
  return col;
}

/* ---------- water height field -------------------------------------------- */
float swell(vec2 q, float t){
  float h = 0.0;
  h += sin(q.x * 1.7 + q.y * 0.9 + t * 0.8) * 0.50;
  h += sin(q.x * -2.3 + q.y * 1.9 + t * 1.1) * 0.30;
  h += sin(q.x * 3.9 + q.y * -3.1 + t * 1.6) * 0.16;
  h += sin(q.x * 7.1 + q.y * 5.3 - t * 2.1) * 0.07;
  return h * 0.030;
}

float ring(vec2 q, vec2 c, float rad, float amp){
  float d = length(q - c);
  float x = d - rad;
  return sin(x * 24.0) * exp(-x * x * 16.0) * amp * exp(-d * 0.35);
}

float height(vec2 q, float t, vec2 pw, float pa){
  float h = swell(q, t);
  for (int i = 0; i < 3; i++){
    float fi = float(i);
    float k = t * 0.10 + fi / 3.0;
    float ph = fract(k);
    float id = floor(k);
    vec2 c = vec2((hash(id * 3.1 + fi) - 0.5) * 3.4, 2.0 + hash(id * 7.7 + fi * 2.0) * 1.8);
    h += ring(q, c, ph * 2.8, (1.0 - ph) * (1.0 - ph) * 0.030);
  }
  float a = fract(t * 0.55);
  float b = fract(t * 0.55 + 0.5);
  h += ring(q, pw, a * 1.3, pa * 0.028 * (1.0 - a));
  h += ring(q, pw, b * 1.3, pa * 0.028 * (1.0 - b));
  return h;
}

void main(){
  float aspect = uRes.x / uRes.y;
  HORIZON = mix(0.12, 0.05, smoothstep(0.7, 1.5, aspect));
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  /* gentle camera drift so the room feels three-dimensional */
  float sway = sin(t * 0.13) * 0.35 + uPtr.x * 0.25;
  float camH = 1.1;
  float dy = HORIZON - uv.y;

  vec3 col;
  if (dy <= 0.0005){
    col = scene(uv.x, uv.y, aspect, t);
  } else {
    float tt = camH / dy;
    vec2 q = vec2(sway + uv.x * tt, tt);

    /* pointer position on the water plane */
    float pdy = HORIZON - uPtr.y;
    float pt = camH / max(pdy, 0.02);
    vec2 pw = vec2(sway + uPtr.x * pt, pt);
    float pa = uPtrAmp * step(0.02, pdy);

    float e = 0.012 * tt + 0.004;
    float h0 = height(q, t, pw, pa);
    float hx = height(q + vec2(e, 0.0), t, pw, pa);
    float hz = height(q + vec2(0.0, e), t, pw, pa);
    vec3 n = normalize(vec3(-(hx - h0) / e * 5.5, 1.0, -(hz - h0) / e * 5.5));

    vec3 rd = normalize(vec3(uv.x, uv.y - HORIZON, 1.0));
    vec3 r = reflect(rd, n);
    r.y = abs(r.y) + 0.0001;
    float rz = max(r.z, 0.08);
    vec3 refl = scene(r.x / rz, r.y / rz + HORIZON, aspect, t);

    float cosT = clamp(dot(n, -rd), 0.0, 1.0);
    float F = clamp(0.42 + 0.58 * pow(1.0 - cosT, 3.0), 0.0, 1.0);

    /* body of the water + faint caustic net */
    vec2 cq = q * 2.2;
    float c1 = sin(cq.x * 1.7 + t * 0.7 + sin(cq.y * 1.3 - t * 0.5) * 1.6);
    float c2 = sin(cq.y * 2.1 - t * 0.6 + sin(cq.x * 1.1 + t * 0.4) * 1.8);
    float caustic = pow(1.0 - abs(c1 * c2), 6.0);
    vec3 body = mix(vec3(0.010, 0.060, 0.066), vec3(0.030, 0.170, 0.175), clamp(dy * 2.2, 0.0, 1.0));
    body += vec3(0.35, 0.75, 0.70) * caustic * 0.10 * exp(-tt * 0.22);

    col = mix(body, refl * 1.3, F);

    /* haze into the horizon so water and sky meet seamlessly */
    float fog = 1.0 - exp(-tt * 0.16);
    vec3 haze = vec3(0.075, 0.225, 0.225);
    col = mix(col, haze, fog * 0.55);
  }

  /* vignette + dither (kills gradient banding on dark teal) */
  vec2 vv = gl_FragCoord.xy / uRes - 0.5;
  col *= 1.0 - dot(vv, vv) * 0.9;
  col += (hash2(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("[water] shader error", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function startWaterGL(canvas: HTMLCanvasElement, options: WaterGLOptions): WaterGLHandle | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" }) as WebGLRenderingContext | null;
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, "uRes");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uPtr = gl.getUniformLocation(program, "uPtr");
  const uPtrAmp = gl.getUniformLocation(program, "uPtrAmp");

  const coarse = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 760;
  let quality = coarse ? 0.55 : 0.8; // fraction of device pixels actually shaded
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  const resize = () => {
    const w = Math.max(2, Math.round(canvas.clientWidth * dpr * quality));
    const h = Math.max(2, Math.round(canvas.clientHeight * dpr * quality));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
  };

  /* pointer state (uv space: x centred in height units, y up, 0 at middle) */
  const ptr = { x: 0, y: -0.4, tx: 0, ty: -0.4, amp: 0 };
  const onMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.height) return;
    ptr.tx = (event.clientX - rect.left - rect.width / 2) / rect.height;
    ptr.ty = 0.5 - (event.clientY - rect.top) / rect.height;
    ptr.amp = Math.min(1, ptr.amp + 0.35);
  };
  const onDown = (event: PointerEvent) => { onMove(event); ptr.amp = 1; };
  if (!options.reducedMotion) {
    options.pointerTarget.addEventListener("pointermove", onMove, { passive: true });
    options.pointerTarget.addEventListener("pointerdown", onDown, { passive: true });
  }

  let raf = 0;
  let running = false;
  let visible = true;
  let last = performance.now();
  let clock = 3 + Math.random() * 20;
  let slowFrames = 0;
  let frames = 0;
  let destroyed = false;

  const draw = () => {
    gl.uniform1f(uTime, clock % 600);
    gl.uniform2f(uPtr, ptr.x, ptr.y);
    gl.uniform1f(uPtrAmp, ptr.amp);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const frame = (now: number) => {
    if (!running) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    clock += dt;
    ptr.x += (ptr.tx - ptr.x) * Math.min(1, dt * 6);
    ptr.y += (ptr.ty - ptr.y) * Math.min(1, dt * 6);
    ptr.amp *= Math.exp(-dt * 0.9);
    draw();

    /* adaptive resolution: if the device struggles, shade fewer pixels */
    frames++;
    if (dt > 0.034) slowFrames++;
    if (frames === 40) {
      if (slowFrames > 14 && quality > 0.34) { quality *= 0.8; resize(); }
      frames = 0;
      slowFrames = 0;
    }
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || destroyed || options.reducedMotion) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  const sync = () => { if (visible && !document.hidden) start(); else stop(); };

  const observer = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true; sync(); }, { threshold: 0.01 });
  observer.observe(canvas);
  document.addEventListener("visibilitychange", sync);

  const onResize = () => { resize(); if (!running) draw(); };
  window.addEventListener("resize", onResize);
  const onLost = (event: Event) => { event.preventDefault(); stop(); canvas.classList.add("is-lost"); };
  canvas.addEventListener("webglcontextlost", onLost);

  resize();
  draw();
  if (options.reducedMotion) canvas.classList.add("is-ready");
  else { requestAnimationFrame(() => canvas.classList.add("is-ready")); sync(); }

  return {
    destroy() {
      destroyed = true;
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("webglcontextlost", onLost);
      options.pointerTarget.removeEventListener("pointermove", onMove);
      options.pointerTarget.removeEventListener("pointerdown", onDown);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
