import querystring from 'querystring'
import { writeGeoJsonFiles } from '../../funcs/writeGeoJsonFiles'

// Create new Geojson
const testfunc = async ( cryptoshopData ) => {
    const output = await writeGeoJsonFiles(cryptoshopData).then((data) => { return data})
    return output
} 

// Get all Geojsons
const getGeojsons = async () => {
    console.log("getGeojsons")
    // return response.data
} 

// Get all Geojsons
const getMyGeojsons = async (input) => {
    writeGeoJsonFiles(input)

    // Can also constructor from another URLSearchParams
    // const params = new URLSearchParams('q=bla&foo=bar&person=Eric');
    // let url = new URL(`${API_URL}/my/?foo=1&bar=2`);
    // console.log("URL", url)
    // console.log("URL:", url.getAll())
    // let params = new URLSearchParams(url.search);
    // console.log("API-URL:", API_URL)
    // //Add a second foo parameter.
    // params.append('bla', 4);


    // console.log(params.getAll('foo')) //Prints ["1","4"].    console.log("PARAMS:", params)
    // console.log(`${url}${params.toString()}`)

    // return response.data
} 

const geojsonService = {
    getMyGeojsons,
    testfunc
}

export default geojsonService