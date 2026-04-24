import React from 'react';

const FilterPill = ({ label, icon: Icon, active, onClick, colorClass = "var(--accent-blue)" }) => {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                border: `1px solid ${active ? colorClass : 'rgba(255, 255, 255, 0.1)'}`,
                background: active ? `${colorClass}20` : 'rgba(255, 255, 255, 0.05)',
                color: active ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '0.85rem',
                fontWeight: active ? '500' : '400',
                backdropFilter: 'blur(4px)'
            }}
        >
            {Icon && <Icon size={14} color={active ? colorClass : 'var(--text-secondary)'} />}
            {label}
        </button>
    );
};

export default FilterPill;
