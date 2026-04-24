import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MapComponent from '../components/MapComponent';
import { getCafes } from '../services/cafeService';

const Home = () => {
    const [cafes, setCafes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCafeId, setSelectedCafeId] = useState(null);

    const [filters, setFilters] = useState({
        minWifiQuality: null,
        hasPowerOutlets: false,
        needsQuietArea: false
    });

    // Fetch cafes initially and whenever filters change
    useEffect(() => {
        const fetchCafes = async () => {
            setIsLoading(true);
            try {
                // Only include active filters in the request, matching backend parameter names
                const activeFilters = {};
                if (filters.minWifiQuality) activeFilters.wifiQuality = filters.minWifiQuality;
                if (filters.hasPowerOutlets) activeFilters.powerOutlets = true;
                if (filters.needsQuietArea) activeFilters.quietArea = true;

                const data = await getCafes(activeFilters);
                setCafes(data);
            } catch (error) {
                console.error("Failed to load cafes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCafes();
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSelectCafe = (id) => {
        setSelectedCafeId(id);
    };

    return (
        <div className="app-container">
            <Sidebar
                cafes={cafes}
                filters={filters}
                onFilterChange={handleFilterChange}
                selectedCafeId={selectedCafeId}
                onSelectCafe={handleSelectCafe}
            />

            <div style={{ flex: 1, position: 'relative' }}>
                <MapComponent
                    cafes={cafes}
                    selectedCafeId={selectedCafeId}
                    onSelectCafe={handleSelectCafe}
                />

                {isLoading && (
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'var(--panel-bg)',
                        backdropFilter: 'blur(10px)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid var(--panel-border)',
                        color: 'var(--text-secondary)',
                        zIndex: 1000
                    }}>
                        Loading spots...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
