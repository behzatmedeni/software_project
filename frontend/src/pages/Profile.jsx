import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserPreferences, getUserReviews } from '../services/userService';
import { User, Settings, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReviewList from '../components/ReviewList';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [profile, setProfile] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [preferences, setPreferences] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            try {
                setIsLoading(true);
                const [profileData, reviewsData] = await Promise.all([
                    getUserProfile(user.id),
                    getUserReviews(user.id)
                ]);
                setProfile(profileData);
                setPreferences(profileData.studyPreferences || '');
                setReviews(reviewsData);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleSavePreferences = async () => {
        setIsSaving(true);
        setSaveMessage('');
        try {
            await updateUserPreferences(user.id, preferences);
            setSaveMessage('Preferences saved successfully!');
            setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
            console.error("Failed to save preferences:", error);
            setSaveMessage('Failed to save preferences.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="profile-page">
                <div className="profile-container" style={{ textAlign: 'center', padding: '40px' }}>
                    Loading profile...
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header-bar">
                <button onClick={() => navigate('/')} className="back-btn">
                    <ArrowLeft size={20} /> Back to Map
                </button>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>

            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <User size={48} color="white" />
                    </div>
                    <h2 className="profile-name">{profile?.name}</h2>
                    <p className="profile-email">{profile?.email}</p>
                    <div className="profile-role-badge">
                        {profile?.role === 'ADMIN' ? 'Administrator' : 'Student'}
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <h3 className="section-title">
                            <Settings size={18} /> Study Preferences
                        </h3>
                        <p className="section-desc">
                            What makes a perfect study spot for you? (e.g., quiet, needs power, fast wifi)
                        </p>
                        <textarea
                            className="preferences-input"
                            value={preferences}
                            onChange={(e) => setPreferences(e.target.value)}
                            placeholder="I prefer quiet places with large tables and strong coffee..."
                        />
                        <div className="save-action-row">
                            <span className={`save-message ${saveMessage.includes('Failed') ? 'error' : ''}`}>
                                {saveMessage}
                            </span>
                            <button 
                                className="save-btn" 
                                onClick={handleSavePreferences}
                                disabled={isSaving}
                            >
                                <Save size={16} /> {isSaving ? 'Saving...' : 'Save Preferences'}
                            </button>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3 className="section-title">My Reviews</h3>
                        <div className="reviews-container">
                            <ReviewList reviews={reviews} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
