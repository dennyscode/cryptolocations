import React, { useState, useEffect } from 'react';
import MapOpenlayer from "../Map/MapOpenlayer";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptoshops, resetCryptoshop } from '../features/cryptoshops/cryptoshopsSlice'
import { createGeoJson, resetGeoJson, getGeoJsons, geojsonsSlice } from '../features/geojson/geojsonSlice'
import Layers from '../Layers/Layers';
import TileLayer from '../Layers/TileLayer'
import Spinner from './Spinner/SpinnerComponent'
import VectorLayer from '../Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Icon, IconImage, Stroke, Style } from 'ol/style';
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import olFeature from 'ol/Feature'
import IcomoonIcon from './IcomoonIcon';
import olGeomPoint from 'ol/geom/Point'
import Controls from '../Controls/Controls'
import FullScreenControl from '../Controls/FullScreenControl'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
// import mapConfig from "../config_point.json";
import mapConfig from "../config_geo.json"
import mapInfos from "../geoInfos.json"
import mapInfos2nd from "../geoInfos2nd.json"
import RestaurantIcon from "../data/icomoon/restaurant.png"
import GroceryIcon from "../data/icomoon/grocery.png"
import BarIcon from "../data/icomoon/bar.png"
import OtherIcon from "../data/icomoon/pin.png"
import CryptoIcon from "../data/img/crypto_sm.png"
import CryptoLayer from './CryptoLayer';
import IconNameEdit from '../utils/iconNameEdit';


const iconSchema = {
    "RestaurantIcon": RestaurantIcon,
    "GroceryIcon": GroceryIcon,
    "BarIcon": BarIcon,
    "OtherIcon": OtherIcon
}

let styles = (icon) => 
{ 
    return(
        new Style({
            image: new Icon({
                anchor: [0.5, 1.05],
                offset: [0,0],
                // color: "white",
                src: icon,
                crossOrigin: '',
                scale: [1, 1],
            }),
        })
    )
}

// const geojsonObject = mapConfig.geojsonObject; // see full geojson object in Github
const geojsonObject = mapInfos.geojsonObject;
const geojsonObject2nd = mapInfos2nd.geojsonObject;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

const CryptoMap = ({categoryJson}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(1);
  const cryptoshops = useSelector((state) => state.cryptoshops)
  const geoJsons = useSelector((state) => state.geojson)
  const [originalShoplist, setOriginalShoplist] = useState({
    'bar': [],
    'restaurant': [],
    'grocery': [],
    'other': [],
  })

  useEffect(() => {
    if(cryptoshops.isError) {
      console.log(cryptoshops.message)
    }
    dispatch(getCryptoshops())

    return  () => {
      dispatch(resetGeoJson())
    }
  }, []
  )

  const iconSchema = {
    "restaurant": RestaurantIcon,
    "grocery": GroceryIcon,
    "bar": BarIcon,
    "other": OtherIcon
}

  const filterCryptoshops = (itemsObject) => {
    let _newShoplist = originalShoplist // create a temporary object for editing
    itemsObject.forEach(item => {
      let shoptype; // distignuish category of shop-item, set to "other" if none available
      item.shoptype === undefined ?  shoptype = "other" : shoptype = item.shoptype;    
      if (_newShoplist[shoptype].filter(el => el._id === item._id).length === 0) {
        _newShoplist[shoptype] = [... _newShoplist[shoptype], item]; // modify category in temporary object
      }
    })
    setOriginalShoplist(_newShoplist); // pass temporary object to original shop-list
  }

  useEffect(() => {
    filterCryptoshops(cryptoshops.cryptoshops);
  }, [cryptoshops])

  useEffect(() => {
    if(geoJsons.isCreated === true) {
      dispatch(getGeoJsons())
    }
    if(cryptoshops.isSuccess && geoJsons.isCreated === false) {
      dispatch(createGeoJson(originalShoplist))
    }
  }, [dispatch, cryptoshops.isSuccess, geoJsons.isCreated])


  const outputLayers = []
    outputLayers.push(<VectorLayer
        source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
        style={styles(CryptoIcon)} />)
        
    outputLayers.push(<VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject2nd, { featureProjection: get('EPSG:3857') }) })}
          style={styles(RestaurantIcon)}
        />)

function SetCategoryMarkup(props) {
    if(props.categoryJson === {}) {
        return <>Loading...</>
    } else {
        let output = [];
        Object.keys(props.geojsons).forEach((category, index) => {
            const geoIcon = IconNameEdit(category)
            output.push(<VectorLayer key={index}
                source={vector({ features: new GeoJSON().readFeatures(props.geojsons[category].geojsonObject, { featureProjection: get('EPSG:3857') }) })}
                style={styles(iconSchema[category])}
            />)
        })
        return output;
    }
}

  return (
    <MapOpenlayer center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
        {SetCategoryMarkup(categoryJson=geoJsons)}
        {/* {outputLayers} */}
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </MapOpenlayer>
  );
}
export default CryptoMap;