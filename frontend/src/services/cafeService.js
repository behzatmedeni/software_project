import api from './api';

/**
 * Cafe Service — handles all cafe-related API calls
 */

/**
 * Get all cafes (optionally filtered by facility params)
 * @param {Object} filters - Optional filter parameters
 * @param {string} filters.wifiQuality - NONE, SLOW, FAST, VERY_FAST
 * @param {boolean} filters.powerOutlets
 * @param {boolean} filters.quietArea
 * @param {string} filters.tableSpace - SMALL, MEDIUM, LARGE
 * @param {boolean} filters.groupFriendly
 * @param {boolean} filters.voiceMeetings
 * @returns {Promise<Array>} Array of CafeDTO objects
 */
export const getCafes = async (filters = {}) => {
    // Remove null/undefined params
    const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null)
    );
    const response = await api.get('/cafes', { params });
    return response.data;
};

/**
 * Get a single cafe's full details (including reviews)
 * @param {string} cafeId - UUID of the cafe
 * @returns {Promise<Object>} CafeDetailDTO
 */
export const getCafeById = async (cafeId) => {
    const response = await api.get(`/cafes/${cafeId}`);
    return response.data;
};

/**
 * Get reviews for a specific cafe
 * @param {string} cafeId - UUID of the cafe
 * @returns {Promise<Array>} Array of ReviewDTO objects
 */
export const getReviewsByCafe = async (cafeId) => {
    const response = await api.get(`/cafes/${cafeId}/reviews`);
    return response.data;
};

/**
 * Submit a new review
 * @param {Object} reviewData
 * @param {string} reviewData.userId - UUID
 * @param {string} reviewData.cafeId - UUID
 * @param {number} reviewData.starRating - 1-5
 * @param {string} reviewData.comment
 * @param {string} reviewData.photoUrl
 * @returns {Promise<Object>} Created ReviewDTO
 */
export const createReview = async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
};
