import React from 'react';
import { Star } from 'lucide-react';

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '10px 0' }}>No reviews yet. Be the first!</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reviews.map(review => (
                <div key={review.id} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '12px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#fff' }}>User</span>
                        <span style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} fill={i < review.starRating ? "#f59e0b" : "transparent"} color={i < review.starRating ? "#f59e0b" : "var(--text-secondary)"} />
                            ))}
                        </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        {review.comment}
                    </p>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
