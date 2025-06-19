// src/components/MapComponent.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// IMPORTANTE: Importar os ícones padrão do Leaflet
// Isso é essencial para que o marcador apareça corretamente.
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

// Configura o ícone padrão do Leaflet globalmente para que os marcadores funcionem
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

interface MapComponentProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  popupText?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, zoom = 15, popupText = "Localização da Transportadora" }) => {
  const theme = useTheme();

  const position: LatLngExpression = [latitude, longitude];

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
  };

  // Removendo os estados de carregamento explícitos para o Leaflet,
  // pois a biblioteca geralmente renderiza o mapa rapidamente se o CSS e os ícones estiverem configurados.
  // Você pode adicionar um loader se sua lógica exigir um carregamento de dados pré-mapa.

  return (
    <Box sx={{ width: '100%' }}>
      <MapContainer
        center={position}
        zoom={zoom}
        style={mapContainerStyle}
        scrollWheelZoom={true}
        // whenReady={() => setMapLoaded(true)} // Pode ser removido se não for usar o loader explícito
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {popupText}
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default MapComponent;