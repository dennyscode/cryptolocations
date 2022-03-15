import axios from 'axios'
import querystring from 'querystring'
import packageJson from '../../../package.json'

const PROXY_URL = packageJson.proxy
const API_URL = 'api/cryptoshops/'

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

// Get all Cryptoshops
const getMyCryptoshops = async (input) => {
    console.log("getMyCryptoshops:", input, API_URL)
    // Can also constructor from another URLSearchParams
    // const params = new URLSearchParams('q=bla&foo=bar&person=Eric');
    // let url = new URL(`${API_URL}/my/?foo=1&bar=2`);
    // console.log("URL", url)
    // console.log("URL:", url.getAll())
    // let params = new URLSearchParams(url.search);
    // console.log("API-URL:", API_URL)
    // //Add a second foo parameter.
    // params.append('bla', 4);

    const urlProxy = new URL(PROXY_URL);
    const url = `${urlProxy.href}${API_URL}my/`;
    console.log(url)

    //Add a userId parameter
    let params = new URLSearchParams(url.search);
    params.append('userid', input.userId);

    // console.log(params.getAll('foo')) //Prints ["1","4"].    console.log("PARAMS:", params)
    console.log(`${url}${params.toString()}`)


    const config = {
        headers: {
            Authorization: `Bearer ${input.token}`,
            userId: `${input.userId}`
        },
        query: {
            blup: 'blup'
        }
    }
    // axios.post('http://something.com/', );
    const response = await axios.get(`${url}?${params.toString()}`, config)
    console.log(response.data)

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
    getMyCryptoshops,
    getCryptoshops,
    deleteCryptoshop,
}

export default cryptoshopService