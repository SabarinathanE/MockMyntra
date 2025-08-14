import axios from "axios";

export const MyntraApi = axios.create({
    baseURL: 'http://localhost:3001'
})

// http://localhost:3001/Slider
// http://localhost:3001/products
// http://localhost:3001/shopCategory
// http://localhost:3001/icons