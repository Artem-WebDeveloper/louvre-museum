class Map {
  _map;
  constructor() {
    this._loadMap();

    this.addMarkers(
      { coords: [48.86091, 2.33637], popupText: 'Louvre Museum' },
      { coords: [48.86065, 2.3397], popupText: "Sarcophage d'Abou Roach" },
      { coords: [48.86239, 2.3365], popupText: 'Rue de Rivoli' },
      { coords: [48.8617, 2.3331], popupText: 'Arc de triomphe du Carrousel' },
      { coords: [48.86, 2.3333], popupText: 'Tunnel des Tuileries' }
    );
  }

  _loadMap() {
    this._map = L.map('map').setView([48.86091, 2.33637], 16.5);

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this._map);
  }

  addMarkers(...markers) {
    const icon = L.icon({
      iconUrl: './assets/svg/icon-position.svg',
      iconSize: [45, 95],
    });

    // markers.forEach(coords => {
    //   L.marker(coords, { icon: icon }).addTo(this._map);
    // });

    markers.forEach(({ coords, popupText }) => {
      L.marker(coords, { icon: icon }).addTo(this._map).bindPopup(popupText);
    });
  }
}

export default Map;
