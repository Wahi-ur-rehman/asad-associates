import { ReactNode } from "react";
import FloatingContact from "./FloatingContact";
import CookieNotice from "./CookieNotice";

export default function Layout({ children }: { children: ReactNode }) {
  return <><a className="skip-link" href="#main-content">Skip to content</a><div id="main-content">{children}</div><FloatingContact /><CookieNotice /></>;
}
