import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  LayerGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./clinic-locator.css";
import { Link } from "react-router-dom";

// --- Fix default marker icons path when bundlers don't copy images automatically
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

// ---- Home visit data (edit centers/radius as needed)
const HOME_VISIT_CITIES = [
  { id: "liverpool", name: "Liverpool", center: [53.4084, -2.9916], radiusMiles: 7 },
  { id: "manchester", name: "Manchester", center: [53.4808, -2.2426], radiusMiles: 7 },
  { id: "southport", name: "Southport", center: [53.6477, -3.0065], radiusMiles: 7 },
];

const milesToMeters = (m) => m * 1609.344;

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
function MapController({ mode, clinics, selectedId, cities, selectedCityId }) {
  const map = useMap();

  // Fit bounds to the current set (clinics or cities)
  useEffect(() => {
    if (mode === "clinics") {
      if (!clinics || clinics.length === 0) return;
      const bounds = L.latLngBounds(clinics.map((c) => [c.lat, c.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    } else {
      const bounds = L.latLngBounds(cities.map((c) => c.center));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [mode, clinics, cities, map]);

  // Center on selected item
  useEffect(() => {
    if (mode === "clinics" && selectedId) {
      const c = clinics.find((x) => x.id === selectedId);
      if (c) {
        map.setView([c.lat, c.lng], Math.max(map.getZoom(), 15), { animate: true });
      }
    }
    if (mode === "home" && selectedCityId) {
      const city = cities.find((x) => x.id === selectedCityId);
      if (city) {
        map.setView(city.center, Math.max(map.getZoom(), 11), { animate: true });
      }
    }
  }, [mode, selectedId, selectedCityId, clinics, cities, map]);

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
    bookingUrl: "/booking",
  },
  {
    id: "CPC",
    name: "Southport",
    address: "Careplus Chemist, 34 Shakespeare St, Southport PR8 5AB",
    lat: 53.640781,
    lng: -3.002837,
    directionsUrl: "https://maps.app.goo.gl/UTp9d22DF3N4F2DB7",
    bookingUrl: "/booking",
  },
  {
    id: "247",
    name: "Liverpool",
    address: "247 Pharmacy, 15 Stuart Rd, Waterloo, Liverpool L22 4QR",
    lat: 53.48051,
    lng: -3.018777,
    directionsUrl: "https://maps.app.goo.gl/isWQJzsLYNbvYMyw9",
    bookingUrl: "/booking",
  },
];

export default function ClinicLocator({ clinics = fallbackClinics }) {
  // Mode: show clinics (default) or home-visit coverage/cities
  const [mode, setMode] = useState("clinics"); // "clinics" | "home"

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);

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

  // Handlers
  const handleSelectClinic = (id) => {
    setSelectedId(id);
    setSelectedCityId(null);
    setMode("clinics");
  };
  const handleMarkerClick = (id) => setSelectedId(id);
  const handleOpenHome = () => {
    setMode("home");
    setSelectedId(null);
  };
  const handleSelectCity = (id) => {
    setSelectedCityId(id);
    setMode("home");
  };

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
                disabled={mode === "home"}
              />
              <button
                type="button"
                className="clinic-locator__searchbtn"
                aria-label="Search"
                disabled={mode === "home"}
              >
                🔍
              </button>
            </div>
            <div className="clinic-locator__counter" aria-live="polite">
              <span className="clinic-locator__counter-label">Number Of Clinics:</span>
              <span className="clinic-locator__counter-value">{filtered.length}</span>
            </div>
          </div>

          {/* Cards list */}
          <ul
            className="clinic-locator__cards"
            role="listbox"
            aria-label={mode === "clinics" ? "Clinics" : "Home visits"}
            ref={listRef}
          >
            {/* Clinics as usual */}
            {mode === "clinics" && (
              <>
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
                    onClick={() => handleSelectClinic(c.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectClinic(c.id);
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
                      <Link
                        className="btn btn--primary"
                        to={c.bookingUrl}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </li>
                ))}

                {/* ---- 4th tile: Home Visits ---- */}
                <li
                  key="home-tab"
                  role="option"
                  aria-selected={mode === "home"}
                  tabIndex={0}
                  className="clinic-card clinic-card--home"
                  onClick={handleOpenHome}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenHome();
                    }
                  }}
                >
                  <h3 className="clinic-card__title">Home Visits</h3>
                  <p className="clinic-card__address">
                    Available in Liverpool, Manchester, and Southport.
                  </p>
                  <div className="clinic-card__actions">
                    <button className="btn btn--primary" type="button">
                      View Coverage
                    </button>
                  </div>
                </li>
              </>
            )}

            {/* Home visits list: three cities */}
            {mode === "home" && (
              <>
                {HOME_VISIT_CITIES.map((city) => (
                  <li
                    key={city.id}
                    role="option"
                    aria-selected={selectedCityId === city.id}
                    tabIndex={0}
                    className={
                      "clinic-card" +
                      (selectedCityId === city.id ? " clinic-card--active" : "")
                    }
                    onClick={() => handleSelectCity(city.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectCity(city.id);
                      }
                    }}
                  >
                    <h3 className="clinic-card__title">{city.name}</h3>
                    <p className="clinic-card__address">
                      Home visits within ~{city.radiusMiles} miles.
                    </p>
                    <div className="clinic-card__actions">
                      <Link
                        className="btn btn--primary"
                        to={`/booking?type=home-visit&city=${city.id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Book Home Visit
                      </Link>
                    </div>
                  </li>
                ))}

                {/* Back tile */}
                <li
  key="back-to-clinics"
  role="option"
  aria-selected={false}
  tabIndex={0}
  className="clinic-card clinic-card--home"
  onClick={() => { setMode("clinics"); setSelectedCityId(null); }}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMode("clinics");
      setSelectedCityId(null);
    }
  }}
>
  <h3 className="clinic-card__title">← Back to Clinics</h3>
</li>

              </>
            )}
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

            {/* Clinic markers only in Clinics mode */}
            {mode === "clinics" &&
              filtered.map((c) => (
                <Marker
                  key={c.id}
                  position={[c.lat, c.lng]}
                  eventHandlers={{ click: () => handleMarkerClick(c.id) }}
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

            {/* Red coverage circles in Home Visits mode */}
            {mode === "home" && (
              <LayerGroup>
                {HOME_VISIT_CITIES.map((city) => (
                  <Circle
                    key={city.id}
                    center={city.center}
                    radius={milesToMeters(city.radiusMiles)}
                    pathOptions={{
                      color: selectedCityId === city.id ? "#d32f2f" : "#ef5350",
                      weight: selectedCityId === city.id ? 3 : 2,
                      fillColor: "#ef5350",
                      fillOpacity: 0.12,
                    }}
                  />
                ))}
              </LayerGroup>
            )}

            <MapController
              mode={mode}
              clinics={filtered}
              selectedId={selectedId}
              cities={HOME_VISIT_CITIES}
              selectedCityId={selectedCityId}
            />
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
