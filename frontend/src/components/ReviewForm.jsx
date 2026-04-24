import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

const ReviewForm = ({ onSubmit, isSubmitting }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || !comment.trim()) return;

        // Pass fake user ID for now since we don't have auth
        // In a real app we'd get this from UserContext
        onSubmit({
            userId: '11111111-1111-1111-1111-111111111111',
            starRating: rating,
            comment: comment
        });

        setRating(0);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#fff' }}>Leave a Review</h4>

            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                        <Star
                            key={i}
                            size={20}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            fill={starValue <= (hover || rating) ? "#f59e0b" : "transparent"}
                            color={starValue <= (hover || rating) ? "#f59e0b" : "var(--text-secondary)"}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                        />
                    );
                })}
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the Wi-Fi? Was it quiet?"
                style={{
                    width: '100%',
                    minHeight: '80px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--panel-border)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#fff',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    resize: 'vertical',
                    marginBottom: '10px'
                }}
            />

            <button
                type="submit"
                disabled={isSubmitting || rating === 0 || !comment.trim()}
                style={{
                    width: '100%',
                    background: 'var(--accent-blue)',
                    color: '#fff',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: (isSubmitting || rating === 0 || !comment.trim()) ? 'not-allowed' : 'pointer',
                    opacity: (isSubmitting || rating === 0 || !comment.trim()) ? 0.5 : 1,
                    fontWeight: '500'
                }}
            >
                {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Review</>}
            </button>
        </form>
    );
};

export default ReviewForm;
