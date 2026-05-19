import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://andreglegg-no.firebaseio.com/'
});

export default instance;