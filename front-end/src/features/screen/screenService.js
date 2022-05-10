import querystring from 'querystring'
import { getScreensize } from '../../funcs/getScreensize'

// Create new Geojson
const testfunc = async () => {
    const output = await getScreensize().then((data) => { return data})
    return output
} 

// Get all Geojsons
const getGeojsons = async () => {
    console.log("getGeojsons")
    // return response.data
} 

const screenService = {
    testfunc
}

export default screenService