import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./clinic-locator.css";

// --- Fix default marker icons path when bundlers don't copy images automatically
// (common with CRA / Vite). You can remove if your setup already handles this.
// @ts-ignore
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// @ts-ignore
import markerIcon from "leaflet/dist/images/marker-icon.png";
// @ts-ignore
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Small helper to debounce a value
function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// Map controller component to run imperative Leaflet calls
function MapController({ clinics, selectedId, onMarkerClick }) {
  const map = useMap();

  // Fit bounds to current clinic set
  useEffect(() => {
    if (!clinics || clinics.length === 0) return;
    const bounds = L.latLngBounds(clinics.map((c) => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [clinics, map]);

  // Center on selected clinic
  useEffect(() => {
    if (!selectedId) return;
    const c = clinics.find((x) => x.id === selectedId);
    if (c) {
      map.setView([c.lat, c.lng], Math.max(map.getZoom(), 15), {
        animate: true,
      });
    }
  }, [selectedId, clinics, map]);

  return null;
}

const fallbackClinics = [
  {
    id: "WRP",
    name: "Manchester",
    address: "Wilmslow Road Pharmacy, 480 Wilmslow Rd, Withington, Manchester M20 3BG",
    lat: 53.433647,
    lng: -2.228699,
    directionsUrl: "https://maps.app.goo.gl/4x3P8bYT6qPNkMos5",
    bookingUrl: "https://clearear2u.co.uk/booking",
  },
  {
    id: "CPC",
    name: "Southport",
    address: "Careplus Chemist, 34 Shakespeare St, Southport PR8 5AB",
    lat: 53.640781,
    lng: -3.002837,
    directionsUrl: "https://maps.app.goo.gl/UTp9d22DF3N4F2DB7",
    bookingUrl: "https://clearear2u.co.uk/booking",
  },
  {
    id: "247",
    name: "Liverpool",
    address: "247 Pharmacy, 15 Stuart Rd, Waterloo, Liverpool L22 4QR",
    lat: 53.48051,
    lng: -3.018777,
    directionsUrl: "https://maps.app.goo.gl/isWQJzsLYNbvYMyw9",
    bookingUrl: "https://clearear2u.co.uk/booking",
  },
];

export default function ClinicLocator({ clinics = fallbackClinics }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);
  const [selectedId, setSelectedId] = useState(null);
  const listRef = useRef(null);
  const cardRefs = useRef({});

  // Filter clinics by query
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return clinics;
    return clinics.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }, [clinics, debouncedQuery]);

  // When filter changes, clear selection if not in filtered
  useEffect(() => {
    if (!selectedId) return;
    if (!filtered.some((c) => c.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  // Scroll to selected card smoothly
  useEffect(() => {
    if (!selectedId) return;
    const el = cardRefs.current[selectedId];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedId]);

  // Handle card click -> select and center map via MapController effect
  const handleSelect = (id) => setSelectedId(id);
  const handleMarkerClick = (id) => setSelectedId(id);

  return (
    <section className="clinic-locator" aria-label="Find Your Nearest Clinic">
      <div className="clinic-locator__grid">
        {/* Left column: list */}
        <aside className="clinic-locator__list" aria-label="Clinic list">
          <div className="clinic-locator__sticky">
            <div className="clinic-locator__searchbar" role="search">
              <label htmlFor="clinic-search" className="sr-only">
                Enter a location
              </label>
              <input
                id="clinic-search"
                className="clinic-locator__input"
                type="search"
                placeholder="Enter a Location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Filter clinics by name or address"
              />
              <button
                type="button"
                className="clinic-locator__searchbtn"
                aria-label="Search"
              >
                🔍
              </button>
            </div>
            <div className="clinic-locator__counter" aria-live="polite">
              <span className="clinic-locator__counter-label">Number Of Clinics:</span>
              <span className="clinic-locator__counter-value">{filtered.length}</span>
            </div>
          </div>

          <ul
            className="clinic-locator__cards"
            role="listbox"
            aria-label="Clinics"
            ref={listRef}
          >
            {filtered.map((c) => (
              <li
                key={c.id}
                role="option"
                aria-selected={selectedId === c.id}
                tabIndex={0}
                ref={(el) => (cardRefs.current[c.id] = el)}
                className={
                  "clinic-card" + (selectedId === c.id ? " clinic-card--active" : "")
                }
                onClick={() => handleSelect(c.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(c.id);
                  }
                }}
              >
                <h3 className="clinic-card__title">{c.name}</h3>
                <div className="clinic-card__row">
                  <span className="clinic-card__pin" aria-hidden>
                    📍
                  </span>
                  <address className="clinic-card__address">{c.address}</address>
                </div>
                <div className="clinic-card__actions">
                  <a
                    className="btn btn--secondary"
                    href={c.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Directions
                  </a>
                  <a
                    className="btn btn--primary"
                    href={c.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Book Appointment
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right column: map */}
        <div className="clinic-locator__map" aria-label="Clinic map">
          <MapContainer
            className="clinic-locator__map-el"
            center={[53.48, -2.24]}
            zoom={9}
            scrollWheelZoom
            keyboard
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filtered.map((c) => (
              <Marker
                key={c.id}
                position={[c.lat, c.lng]}
                eventHandlers={{
                  click: () => handleMarkerClick(c.id),
                }}
                // @ts-ignore
                className={selectedId === c.id ? "marker--active" : ""}
              >
                <Popup>
                  <strong>{c.name}</strong>
                  <br />
                  <span>{c.address}</span>
                </Popup>
              </Marker>
            ))}

            <MapController
              clinics={filtered}
              selectedId={selectedId}
              onMarkerClick={handleMarkerClick}
            />
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
