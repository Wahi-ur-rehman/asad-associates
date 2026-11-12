import { ChangeEvent, FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Mail, Paperclip, Send, Smartphone } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";
import { track } from "@/lib/track";

type Brief = {
  service: string;
  property: string;
  location: string;
  plotSize: string;
  budget: string;
  timing: string;
  name: string;
  contact: string;
  notes: string;
  fileName: string;
};

const emptyBrief: Brief = {
  service: "",
  property: "",
  location: "",
  plotSize: "",
  budget: "",
  timing: "",
  name: "",
  contact: "",
  notes: "",
  fileName: "",
};

const services = ["Swimming pool", "Fountain / waterfall", "Outdoor living", "Renovation / care"];
const propertyTypes = ["Private home", "Farmhouse", "Hotel / commercial", "Other"];
const timings = ["Exploring ideas", "Next 3–6 months", "Ready to discuss", "Maintenance / repair"];
const budgets = ["To be discussed", "Under PKR 5M", "PKR 5–15M", "PKR 15M+"];

export default function ProjectBrief() {
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<"sent" | "direct">("sent");
  const [fileError, setFileError] = useState("");

  const update = (key: keyof Brief, value: string) =>
    setBrief((previous) => ({ ...previous, [key]: value }));

  const begin = () => {
    track("project_brief_start");
    setStep(2);
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      event.target.value = "";
      setFileError("Please choose a file smaller than 10 MB.");
      update("fileName", "");
      return;
    }
    setFileError("");
    update("fileName", file.name);
  };

  const contactOk = /(^[^\s@]+@[^\s@]+\.[^\s@]+$)|(^[+\d][\d\s().-]{6,}$)/.test(
    brief.contact.trim()
  );
  const ready = Boolean(
    brief.property &&
      brief.timing &&
      brief.location &&
      brief.plotSize &&
      brief.budget &&
      brief.name &&
      contactOk &&
      !fileError
  );

  const subject = `Asad Associates Project Brief — ${brief.service} (${brief.name})`;
  const emailBodyText = `Hello Asad Associates,\n\nI would like to discuss: ${brief.service}\nProperty: ${brief.property}\nLocation: ${brief.location}\nPlot size: ${brief.plotSize}\nBudget range: ${brief.budget}\nTiming: ${brief.timing}\nName: ${brief.name}\nPreferred contact: ${brief.contact}\nReference file selected: ${brief.fileName || "None"}\n\nProject notes:\n${brief.notes}`;
  const whatsappBody = `Hello Asad Associates, I submitted a project brief on your website for a ${brief.service.toLowerCase()} project in ${brief.location}. Plot size: ${brief.plotSize}. Budget: ${brief.budget}. My name is ${brief.name}. Contact: ${brief.contact}. ${brief.notes ? `Notes: ${brief.notes}` : ""}`;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!ready || submitting) return;

    setSubmitting(true);
    track("project_brief_submitting", { service: brief.service });

    try {
      // Direct transfer to hamiddarboys@gmail.com via FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Client Brief: ${brief.service} — ${brief.name} (${brief.location})`,
          _template: "table",
          _captcha: "false",
          client_name: brief.name,
          client_contact: brief.contact,
          service_requested: brief.service,
          property_type: brief.property,
          project_timing: brief.timing,
          plot_size: brief.plotSize,
          budget_range: brief.budget,
          project_location: brief.location,
          project_notes: brief.notes || "None provided",
          attached_reference: brief.fileName || "None attached",
          submitted_at: new Date().toISOString(),
          source_website: "Asad Associates (https://wahi-ur-rehman.github.io/asad-associates/)",
        }),
      });

      if (response.ok) {
        setDeliveryStatus("sent");
      } else {
        setDeliveryStatus("direct");
      }
    } catch {
      // In case of network/offline issues, allow fallback
      setDeliveryStatus("direct");
    } finally {
      setSubmitting(false);
      setComplete(true);
      track("project_brief_complete", { service: brief.service });
    }
  };

  if (complete) {
    return (
      <div className="brief-success">
        <div className="success-icon">
          <Check size={22} />
        </div>
        <div>
          <span className="section-kicker">
            {deliveryStatus === "sent" ? "Brief Transferred" : "Brief Ready"}
          </span>
          <h3>
            {deliveryStatus === "sent"
              ? "Your brief has been transferred."
              : "Thank you for your brief."}
          </h3>
          <p>
            Your inquiry for <strong>{brief.service}</strong> in{" "}
            <strong>{brief.location}</strong> has been transferred directly to our
            principal engineering desk at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-semibold underline text-teal-900"
            >
              {SITE.email}
            </a>
            . Our team in Islamabad &amp; Lahore will review your specifications and
            reach out via <strong>{brief.contact}</strong>.
          </p>

          <div className="bg-teal-950/5 border border-teal-900/10 rounded-sm p-3 my-4 text-xs font-mono text-teal-950 space-y-1">
            <div>
              <span className="text-teal-700">Recipient:</span> {SITE.email}
            </div>
            <div>
              <span className="text-teal-700">Client:</span> {brief.name} ({brief.contact})
            </div>
            <div>
              <span className="text-teal-700">Project:</span> {brief.service} · {brief.plotSize} · {brief.budget}
            </div>
          </div>

          <div className="brief-actions">
            <a
              className="button button-whatsapp"
              href={whatsappUrl(whatsappBody)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("whatsapp_click")}
            >
              <Smartphone size={16} /> Continue in WhatsApp Direct
            </a>
            <a
              className="button button-dark"
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBodyText)}`}
              onClick={() => track("lead_form_submit")}
            >
              <Mail size={16} /> Open Email Copy
            </a>
          </div>

          <button
            className="brief-reset"
            onClick={() => {
              setComplete(false);
              setStep(1);
              setBrief(emptyBrief);
            }}
          >
            Start another brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-brief">
      <div className="brief-progress">
        <span className={step === 1 ? "is-active" : "is-done"}>
          01 <small>Project</small>
        </span>
        <i />
        <span className={step === 2 ? "is-active" : ""}>
          02 <small>Contact</small>
        </span>
      </div>

      {step === 1 ? (
        <div className="brief-step">
          <span className="section-kicker">Step one · Tell us about your project</span>
          <h3>
            What would you like
            <br />
            <i>to create?</i>
          </h3>
          <div className="brief-choice-grid">
            {services.map((service) => (
              <button
                type="button"
                key={service}
                className={brief.service === service ? "is-selected" : ""}
                onClick={() => update("service", service)}
              >
                {service}
                {brief.service === service && <Check size={16} />}
              </button>
            ))}
          </div>
          <button
            className="button button-dark brief-next"
            disabled={!brief.service}
            onClick={begin}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <form className="brief-step" onSubmit={submit}>
          <button type="button" className="brief-back" onClick={() => setStep(1)}>
            <ArrowLeft size={14} /> Back
          </button>
          <span className="section-kicker">Step two · Help us understand the project</span>
          <h3>
            A little more
            <br />
            <i>context.</i>
          </h3>

          <div className="flex items-center gap-2 p-2.5 mb-3 bg-teal-900/5 border border-teal-900/10 rounded-sm text-xs text-teal-950">
            <Mail size={14} className="text-teal-700 shrink-0" />
            <span>
              Submissions transfer directly to{" "}
              <strong className="font-semibold text-teal-900">{SITE.email}</strong>
            </span>
          </div>

          <div className="brief-form-grid">
            <label>
              Property type
              <select
                required
                value={brief.property}
                onChange={(event) => update("property", event.target.value)}
              >
                <option value="">Select one</option>
                {propertyTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Project timing
              <select
                required
                value={brief.timing}
                onChange={(event) => update("timing", event.target.value)}
              >
                <option value="">Select one</option>
                {timings.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="brief-form-grid">
            <label>
              Plot size
              <input
                required
                value={brief.plotSize}
                onChange={(event) => update("plotSize", event.target.value)}
                placeholder="Approx. kanal, marla, or sq ft"
              />
            </label>
            <label>
              Budget range
              <select
                required
                value={brief.budget}
                onChange={(event) => update("budget", event.target.value)}
              >
                <option value="">Select one</option>
                {budgets.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Project location
            <input
              required
              value={brief.location}
              onChange={(event) => update("location", event.target.value)}
              placeholder="Area or city"
            />
          </label>

          <div className="brief-form-grid">
            <label>
              Your name
              <input
                required
                value={brief.name}
                onChange={(event) => update("name", event.target.value)}
                placeholder="Full name"
              />
            </label>
            <label>
              Preferred contact
              <input
                required
                value={brief.contact}
                onChange={(event) => update("contact", event.target.value)}
                placeholder="Phone or email"
                aria-invalid={brief.contact.length > 0 && !contactOk}
              />
            </label>
          </div>
          {brief.contact.length > 0 && !contactOk && (
            <small className="brief-error">Enter a valid phone number or email address.</small>
          )}

          <label>
            What are you imagining?
            <textarea
              value={brief.notes}
              onChange={(event) => update("notes", event.target.value)}
              placeholder="Approximate size, style, or anything useful..."
              rows={4}
            />
          </label>

          <label className="brief-file">
            <Paperclip size={15} />{" "}
            <span>
              {brief.fileName || "Add a filename for an optional site plan or reference image"}
            </span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFile}
              aria-label="Optional site plan or reference file"
            />
          </label>
          {fileError && <small className="brief-error">{fileError}</small>}

          <button
            className="button button-dark brief-next"
            type="submit"
            disabled={!ready || submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Transferring to {SITE.email}...
              </>
            ) : (
              <>
                <Send size={16} /> Submit &amp; Transfer to {SITE.email}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
