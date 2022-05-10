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
import CryptoIcon from "../data/img/crypto_sm.png"
import CryptoLayer from './CryptoLayer';
import { getScreensize } from '../funcs/getScreensize';
import setCategoryMarkup from '../funcs/setCategoryMarkup'
import filterCryptoshops from '../funcs/filterCryptoshops'

let styles = 
  new Style({
      image: new Icon({
          anchor: [0.5, 1.05],
          offset: [0,0],
          // color: "white",
          src: CryptoIcon,
          crossOrigin: '',
          scale: [1, 1],
      }),
  })
// const geojsonObject = mapConfig.geojsonObject; // see full geojson object in Github
const geojsonObject = mapInfos.geojsonObject;
const geojsonObject2nd = mapInfos2nd.geojsonObject;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

const CryptoMap = ({cryptoshops, cryptoshopsIsSuccess, cryptoshopsIsError}) => {
  const dispatch = useDispatch()
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(1);
  const [categoryVectors, setCategoryVectors] = useState()
  // const cryptoshops = useSelector((state) => state.cryptoshops)
  const { geoJsons, isCreated, isCreating, isError, isLoading, isSuccess } = useSelector((state) => state.geojson)
  // const cryptoshops = useSelector((state) => state.cryptoshops)
  const [originalShoplist, setOriginalShoplist] = useState({
    'bar': [],
    'restaurant': [],
    'grocery': [],
    'other': [],
  })

  useEffect(() => {
    // console.log("CryptoMap Reloading..")
    if(cryptoshopsIsError) {
      console.log(cryptoshops.message)
    }
    
    if(cryptoshopsIsSuccess) {
      // console.log("cryptoshops", cryptoshops)
      filterCryptoshops(cryptoshops, originalShoplist, setOriginalShoplist);
      dispatch(createGeoJson(originalShoplist))
    }

    // if(isCreated === true) {}
    // if(isSuccess === true) {}

  }, [dispatch, cryptoshopsIsSuccess, cryptoshopsIsError, isCreated, isSuccess])

  const updateGeoJson = useSelector((state) => state.geojson)
  useEffect(() => {
    if(isCreated === true) {
      const _categoryMarkup = setCategoryMarkup(updateGeoJson.geojsons, styles)
      setCategoryVectors(_categoryMarkup)
    }
  }, [updateGeoJson])
  

  // const outputLayers = []
  //   outputLayers.push(<VectorLayer
  //       source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
  //       style={styles(CryptoIcon)} />)
        
  //   outputLayers.push(<VectorLayer
  //         source={vector({ features: new GeoJSON().readFeatures(geojsonObject2nd, { featureProjection: get('EPSG:3857') }) })}
  //         style={styles(RestaurantIcon)}
  //       />)



  return (
    <MapOpenlayer center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
        {categoryVectors}
        {/* {outputLayers} */}
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </MapOpenlayer>
  );
}
export default CryptoMap;