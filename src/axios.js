import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', //https://todoapp-c0e97.firebaseio.com; https://mighty-wildwood-75803.herokuapp.com/
});

export default instance