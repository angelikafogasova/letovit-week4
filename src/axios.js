import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todoapp-c0e97.firebaseio.com',
});

export default instance