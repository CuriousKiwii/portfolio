// Leaflet service-area map with OpenStreetMap tiles.
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapPoints } from "../data/site";

export default function map(el: HTMLElement) {
  const m = L.map(el, { scrollWheelZoom: false, attributionControl: true, zoomControl: true });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(m);
  const pts = mapPoints.map((p) => {
    const icon = L.divIcon({
      className: "",
      html: `<span class="block size-4 rounded-full border-2 border-white shadow-lg ${p.primary ? "bg-primary ring-4 ring-primary/30" : "bg-secondary"}"></span>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    return L.marker([p.lat, p.lng], { icon, title: p.name })
      .addTo(m)
      .bindPopup(`<strong>${p.name}</strong><br>${p.detail}`);
  });
  m.fitBounds(L.featureGroup(pts).getBounds().pad(0.6));
  L.circle([33.42, -111.94], { radius: 38000, color: "#f0a23b", weight: 1, fillOpacity: 0.06 }).addTo(m);
}
