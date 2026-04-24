import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// Custom icon for selected cafe
const selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map centering when a cafe is selected
const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 15, { duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

const MapComponent = ({ cafes, selectedCafeId, onSelectCafe }) => {
    // Default to Riga coordinates
    const defaultCenter = [56.9496, 24.1052];

    const selectedCafe = cafes.find(c => c.id === selectedCafeId);
    const center = selectedCafe ? [selectedCafe.latitude, selectedCafe.longitude] : defaultCenter;

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <MapContainer
                center={defaultCenter}
                zoom={13}
                zoomControl={false}
                style={{ width: '100%', height: '100%', backgroundColor: '#0d0f1a' }}
            >
                {/* Dark theme styled map tiles from CartoDB */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                <MapController center={center} />

                {cafes.map(cafe => (
                    <Marker
                        key={cafe.id}
                        position={[cafe.latitude, cafe.longitude]}
                        icon={selectedCafeId === cafe.id ? selectedIcon : new L.Icon.Default()}
                        eventHandlers={{
                            click: () => onSelectCafe(cafe.id),
                        }}
                    >
                        <Popup className="custom-popup">
                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>{cafe.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{cafe.address}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
