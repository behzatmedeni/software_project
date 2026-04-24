import React from 'react';
import FilterPill from './FilterPill';
import CafeCard from './CafeCard';
import CafeDetailsPanel from './CafeDetailsPanel';
import { Wifi, Plug, VolumeX, Coffee } from 'lucide-react';

const Sidebar = ({ cafes, filters, onFilterChange, selectedCafeId, onSelectCafe }) => {
    return (
        <div
            className="glass-panel"
            style={{
                width: '380px',
                height: '96vh',
                margin: '2vh',
                position: 'absolute',
                left: 0,
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(24px)'
            }}
        >
            {selectedCafeId ? (
                <CafeDetailsPanel
                    cafeId={selectedCafeId}
                    onBack={() => onSelectCafe(null)}
                />
            ) : (
                <>
                    {/* Header */}
                    <div style={{ padding: '24px 24px 16px 24px', borderBottom: '1px solid var(--panel-border)' }}>
                        <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', margin: '0 0 8px 0' }}>
                            <Coffee size={28} color="var(--accent-purple)" />
                            WHERE TO STUDY
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                            Find your perfect productive spot.
                        </p>
                    </div>

                    {/* Filters */}
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--panel-border)' }}>
                        <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                            Filters
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            <FilterPill
                                label="Fast Wi-Fi"
                                icon={Wifi}
                                active={filters.minWifiQuality === 'FAST'}
                                onClick={() => onFilterChange('minWifiQuality', filters.minWifiQuality === 'FAST' ? null : 'FAST')}
                                colorClass="#3b82f6"
                            />
                            <FilterPill
                                label="Power Outlets"
                                icon={Plug}
                                active={filters.hasPowerOutlets}
                                onClick={() => onFilterChange('hasPowerOutlets', !filters.hasPowerOutlets)}
                                colorClass="#10b981"
                            />
                            <FilterPill
                                label="Quiet Zone"
                                icon={VolumeX}
                                active={filters.needsQuietArea}
                                onClick={() => onFilterChange('needsQuietArea', !filters.needsQuietArea)}
                                colorClass="#8b5cf6"
                            />
                        </div>
                    </div>

                    {/* Cafe List */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{cafes.length} places found</span>
                        </div>

                        {cafes.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                                No spots match your filters.
                            </div>
                        ) : (
                            cafes.map(cafe => (
                                <CafeCard
                                    key={cafe.id}
                                    cafe={cafe}
                                    isSelected={selectedCafeId === cafe.id}
                                    onClick={() => onSelectCafe(cafe.id)}
                                />
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
