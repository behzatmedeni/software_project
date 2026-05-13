import api from './api';

export const getUserProfile = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const updateUserPreferences = async (userId, studyPreferences) => {
    const response = await api.put(`/users/${userId}/preferences`, { studyPreferences });
    return response.data;
};

export const getUserReviews = async (userId) => {
    const response = await api.get(`/users/${userId}/reviews`);
    return response.data;
};
