import axios from 'axios'

const API_URL = '/api/cryptoshops/'

// Create new Cryptoshop
const createCryptoshop = async ( cryptoshopData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, cryptoshopData, config)

    return response.data

} 

// Get all Cryptoshops
const getCryptoshops = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
} 

// Delete user Cryptoshop
const deleteCryptoshop = async (cryptoshopId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + cryptoshopId, config)

    return response.data
}

const cryptoshopService = {
    createCryptoshop,
    getCryptoshops,
    deleteCryptoshop,
}

export default cryptoshopService