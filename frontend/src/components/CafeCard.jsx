import React from 'react';
import { Star, Wifi, Plug, VolumeX, Users, PhoneCall, Maximize } from 'lucide-react';

const CafeCard = ({ cafe, isSelected, onClick }) => {
    const f = cafe.facilities;

    // Helpers to render badges
    const renderWifiBadge = () => {
        if (!f || f.wifiQuality === 'NONE') return null;
        const colors = {
            SLOW: '#ef4444',
            FAST: '#3b82f6',
            VERY_FAST: '#8b5cf6'
        };
        return (
            <span style={{ color: colors[f.wifiQuality], display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                <Wifi size={12} /> {f.wifiQuality.replace('_', ' ')}
            </span>
        );
    };

    return (
        <div
            className="glass-card"
            onClick={onClick}
            style={{
                padding: '16px',
                cursor: 'pointer',
                marginBottom: '12px',
                border: isSelected ? '1px solid var(--accent-neon)' : '',
                boxShadow: isSelected ? '0 0 15px rgba(0, 240, 255, 0.2)' : ''
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: isSelected ? 'var(--accent-neon)' : '#fff' }}>
                    {cafe.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '12px', fontSize: '0.8rem' }}>
                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                    <span style={{ fontWeight: '600' }}>{cafe.averageRating?.toFixed(1) || 'New'}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>({cafe.reviewCount})</span>
                </div>
            </div>

            <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {cafe.description}
            </p>

            {/* Facilities row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                {renderWifiBadge()}
                {f?.powerOutlets && (
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                        <Plug size={12} /> Power
                    </span>
                )}
                {f?.quietArea && (
                    <span style={{ color: '#a855f7', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                        <VolumeX size={12} /> Quiet
                    </span>
                )}
            </div>
        </div>
    );
};

export default CafeCard;
