import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        Accept: 'application/json'
    },
    params: {
        language: 'ru-RU'
    }
});

export default api;