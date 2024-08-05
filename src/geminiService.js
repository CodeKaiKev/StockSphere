// src/services/geminiService.js
import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_KEY; // Replace with your Gemini API key
const BASE_URL = 'https://api.gemini.com/v1';

const getStockInfo = async (symbol) => {
    try {
        const response = await axios.get(`${BASE_URL}/pubticker/${symbol}`, {
            headers: {
                'X-GEMINI-APIKEY': GEMINI_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        // console.error('Error fetching stock info:', error);
        throw error;
    }
};

export { getStockInfo };
