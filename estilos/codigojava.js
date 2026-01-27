//PAGINA LUGARES DE PEREGRINACION__________________________________________________________________________________

/*CODIGO DE MAPA DE LA RIOJA*/

// 1) Crear mapa (centro aprox. La Rioja)
const map = L.map("mapRioja", { scrollWheelZoom: false }).setView([-29.8, -67.6], 7);

// 2) Capa base
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 18,
}).addTo(map);

// 3) Icono pulsante
const pulseIcon = L.divIcon({
  className: "",
  html: '<div class="pulse-marker"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// 4) Tus lugares (podés editar textos)
const lugares = [
  {
    nombre: "Iglesia Catedral (San Nicolás de Bari) – La Rioja Capital",
    coords: [-29.4130556, -66.8558333],
    descripcion: "Iglesia madre de la diócesis. Punto central del itinerario.",
  },
  {
    nombre: "Iglesia “El Salvador” – Chamical",
    coords: [-30.359, -66.315], // referencia Chamical (si tenés el link exacto de Maps, lo ajusto)
    descripcion: "Comunidad y memoria en el corazón de Chamical.",
  },
  {
    nombre: "Iglesia “Sagrado Corazón” – Sañogasta (La Puntilla)",
    coords: [-29.320373896, -67.627795953], // referencia Sañogasta
    descripcion: "Capilla del Sagrado Corazón (zona Sañogasta).",
  },
  {
    nombre: "Gruta “Bajo de Luca / Bajos de Lucas” – Chamical",
    coords: [-30.38569434, -66.26041862],
    descripcion: "Lugar de memoria cercano a Chamical.",
  },
  {
    nombre: "Paraje “Buen Pastor” – Punta de los Llanos (zona)",
    coords: [-30.165433858, -66.556575246], // referencia Punta de los Llanos
    descripcion: "Paraje de peregrinación en la zona de Punta de los Llanos.",
  },
];

// 5) Marcadores + animación al click
const markers = [];

lugares.forEach((lugar) => {
  const m = L.marker(lugar.coords, { icon: pulseIcon }).addTo(map);

  m.bindPopup(`
    <strong>${lugar.nombre}</strong><br/>
    ${lugar.descripcion}<br/>
    <small>(${lugar.coords[0].toFixed(5)}, ${lugar.coords[1].toFixed(5)})</small>
  `);

  // FlyTo (zoom animado) + abre popup
  m.on("click", () => {
    map.flyTo(lugar.coords, 12, { duration: 1.2 });
    m.openPopup();
  });

  markers.push(m);
});

// 6) Ajustar encuadre para que entren todos
const grupo = L.featureGroup(markers);
map.fitBounds(grupo.getBounds().pad(0.25));
