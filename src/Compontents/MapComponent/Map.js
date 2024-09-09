import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './map.css'
const MapComponent = () => {
  return (
    <div>
    <MapContainer className='map'
      center={[-2.38437,29.46436]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
    </div>
  );
};

export default MapComponent;
