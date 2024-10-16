
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from '../img/mapMarker.png';


const mapElement = document.getElementById("map") as HTMLElement;
export let markers: L.Marker[] = [];

var map = L.map(mapElement).setView([60.20229230490585, 24.92592338230693], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);


const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [47, 50],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const createMarker = (lat: number, lon: number, content: HTMLElement) => {
  const marker = L.marker([lat, lon], { icon: customIcon })
    .addTo(map)
    .bindPopup(content);
  markers.push(marker);
};

const deleteMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
};

const changeView = (lat: number, lon: number, zoom: number) => {
  map.setView([lat, lon], zoom, { animate: true, duration: 2.0 });
};

export { createMarker, deleteMarkers, changeView };
