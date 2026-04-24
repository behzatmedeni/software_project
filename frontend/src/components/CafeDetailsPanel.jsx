import React, { useState, useEffect } from 'react';
import { getCafeById, createReview } from '../services/cafeService';
import { ArrowLeft, MapPin, Star, Wifi, Plug, VolumeX, Users, PhoneCall, Maximize } from 'lucide-react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const CafeDetailsPanel = ({ cafeId, onBack }) => {
    const [cafeDetails, setCafeDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const data = await getCafeById(cafeId);
                setCafeDetails(data);
            } catch (error) {
                console.error("Error fetching cafe details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (cafeId) fetchDetails();
    }, [cafeId]);

    const handleReviewSubmit = async (reviewData) => {
        setIsSubmitting(true);
        try {
            const payload = { ...reviewData, cafeId };
            const newReview = await createReview(payload);

            // Update local state to show new review instantly
            setCafeDetails(prev => ({
                ...prev,
                reviews: [newReview, ...(prev.reviews || [])],
                reviewCount: prev.reviewCount + 1,
                // Rough local average update (assuming averageRating exists)
                averageRating: prev.averageRating ? ((prev.averageRating * prev.reviewCount) + newReview.starRating) / (prev.reviewCount + 1) : newReview.starRating
            }));
        } catch (error) {
            console.error("Failed to submit review:", error);
            alert("Failed to post review. Is the backend running?");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading details...</div>;
    }

    if (!cafeDetails) {
        return <div style={{ padding: '40px 24px', textAlign: 'center', color: '#ef4444' }}>Cafe found.</div>;
    }

    const f = cafeDetails.facilities || {};

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Back Button & Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--panel-border)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                        borderRadius: '50%', width: '32px', height: '32px', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0
                    }}
                >
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h2 style={{ fontSize: '1.4rem', margin: '0 0 4px 0', color: '#fff', lineHeight: 1.2 }}>{cafeDetails.name}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <MapPin size={12} /> {cafeDetails.address}
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

                {/* Rating Block */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b', lineHeight: 1 }}>
                        {cafeDetails.averageRating?.toFixed(1) || '-'}
                    </div>
                    <div>
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < Math.round(cafeDetails.averageRating || 0) ? "#f59e0b" : "transparent"} color="#f59e0b" />
                            ))}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            Based on {cafeDetails.reviewCount} reviews
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '8px' }}>About</h4>
                    <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.5, margin: 0 }}>
                        {cafeDetails.description}
                    </p>
                </div>

                {/* Amenities Grid */}
                <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Amenities</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {f.wifiQuality !== 'NONE' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff' }}>
                                <div style={{ background: '#3b82f630', padding: '6px', borderRadius: '8px' }}><Wifi size={16} color="#3b82f6" /></div>
                                <div>
                                    <div style={{ lineHeight: 1 }}>Wi-Fi</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{f.wifiQuality}</div>
                                </div>
                            </div>
                        )}
                        {f.powerOutlets && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff' }}>
                                <div style={{ background: '#10b98130', padding: '6px', borderRadius: '8px' }}><Plug size={16} color="#10b981" /></div>
                                <div><div style={{ lineHeight: 1 }}>Power</div><div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Available</div></div>
                            </div>
                        )}
                        {f.quietArea && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff' }}>
                                <div style={{ background: '#8b5cf630', padding: '6px', borderRadius: '8px' }}><VolumeX size={16} color="#8b5cf6" /></div>
                                <div><div style={{ lineHeight: 1 }}>Quiet Zone</div><div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Dedicated</div></div>
                            </div>
                        )}
                        {f.voiceMeetings && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fff' }}>
                                <div style={{ background: '#ec489930', padding: '6px', borderRadius: '8px' }}><PhoneCall size={16} color="#ec4899" /></div>
                                <div><div style={{ lineHeight: 1 }}>Calls</div><div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Allowed</div></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Reviews</h4>
                    <ReviewList reviews={cafeDetails.reviews} />
                    <ReviewForm onSubmit={handleReviewSubmit} isSubmitting={isSubmitting} />
                </div>
            </div>
        </div>
    );
};

export default CafeDetailsPanel;
