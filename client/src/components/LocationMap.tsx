import { MapPin, Map as MapIcon, Building2, Navigation } from "lucide-react";
import { useState } from "react";

export default function LocationMap() {
  const [activeTab, setActiveTab] = useState<"isb" | "lhr">("isb");

  return (
    <div className="location-map">
      <div className="location-map-tabs">
        <button
          type="button"
          className={`location-tab-btn ${activeTab === "isb" ? "is-active" : ""}`}
          onClick={() => setActiveTab("isb")}
        >
          <Building2 size={14} />
          <span>HQ · Islamabad</span>
        </button>
        <button
          type="button"
          className={`location-tab-btn ${activeTab === "lhr" ? "is-active" : ""}`}
          onClick={() => setActiveTab("lhr")}
        >
          <Building2 size={14} />
          <span>Office · Lahore</span>
        </button>
      </div>

      <iframe
        title={activeTab === "isb" ? "Asad Associates Headquarters - Islamabad" : "Asad Associates Regional Office - Lahore"}
        src={
          activeTab === "isb"
            ? "https://maps.google.com/maps?q=Rawal+Dam+Chowk,+Park+Road,+Islamabad&z=14&output=embed"
            : "https://maps.google.com/maps?q=Lahore,+Pakistan&z=12&output=embed"
        }
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <div className="map-overlay">
        <span className="map-pin" />
        <strong>{activeTab === "isb" ? "Islamabad (HQ)" : "Lahore (Branch)"}</strong>
        <small>{activeTab === "isb" ? "Main Rawal Dam Chowk, Park Road" : "Regional Projects Office"}</small>
        <span className="map-nationwide-badge">
          <Navigation size={10} /> Nationwide Execution Across Pakistan
        </span>
      </div>
    </div>
  );
}
