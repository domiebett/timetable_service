import axios from 'axios';

export class BaseService {
    constructor() { }

    /**
     * Get data from a url
     * @param path - url path
     */
    async fetch(path) {
        const response = await axios.get(path);
        return response.data;
    }
}
