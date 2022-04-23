import React, { useState, useEffect } from 'react';
import MapOpenlayer from "../Map/MapOpenlayer";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptoshops, resetCryptoshop } from '../features/cryptoshops/cryptoshopsSlice'
import { createGeoJson, resetGeoJson, getGeoJsons, geojsonsSlice } from '../features/geojson/geojsonSlice'
import Layers from '../Layers/Layers';
import TileLayer from '../Layers/TileLayer'
import Spinner from '../components/Spinner/SpinnerComponent'
import VectorLayer from '../Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Icon, IconImage, Stroke, Style } from 'ol/style';
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import olFeature from 'ol/Feature'
import IcomoonIcon from '../components/IcomoonIcon';
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
import RestaurantIcon from '../data/icomoon/restaurant.png'
import CryptoMap from '../components/CryptoMap';


const white = [255, 255, 255, 1];
const blue = [0, 153, 255, 1];
const width = 3;
let styles = {
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'Point': new Style({
    image: new CircleStyle({
      radius: width * 2,
      fill: new Fill({
        color: blue,
      }),
      stroke: new Stroke({
        color: white,
        width: width / 2,
      }),
    }),
    zIndex: Infinity,
  }),
  "iconStyle":
    new Style({
      image: new Icon({
        anchor: [0.5, 1.05],
        offset: [0,0],
        // color: "white",
        src: CryptoIcon,
        crossOrigin: '',
        scale: [1, 1],
    
        // rotation: Math.PI / 4,
      }),
      // text: new Text({
      //   text: 'FISH\nTEXT',
      //   scale: [0, 0],
      //   rotation: Math.PI / 4,
      //   textAlign: 'center',
      //   textBaseline: 'top',
      // }),
    })
  };

// const geojsonObject = mapConfig.geojsonObject; // see full geojson object in Github
const geojsonObject = mapInfos.geojsonObject;
const geojsonObject2nd = mapInfos2nd.geojsonObject;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const Map = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const images = importAll(require.context('../data/icomoon', false, /\.(png|jpe?g|svg)$/));
  // console.log("REQUIRE:", images, Object.keys(images))

  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(1);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const cryptoshops = useSelector((state) => state.cryptoshops)
  const geoJsons = useSelector((state) => state.geojson)
  const [originalShoplist, setOriginalShoplist] = useState({
    'bar': [],
    'restaurant': [],
    'grocery': [],
    'other': [],
  })

//   const testMarkup = () => {return (<VectorLayer
//     source={vector({ 
//       features: new GeoJSON().readFeatures(geojsonObject2nd, { 
//         featureProjection: get('EPSG:3857') 
//       }) 
//     })}
//     style={styles.iconStyle}
// />)}


  // useEffect(() => {
  //   // code to run after render goes here
  //   const feature1 = new Feature({
  //     geometry: new Point(fromLonLat([0, -10])),
  //     name: '<div class="tooltip__header"><b>Sushiz-Restaurant</b><img class="tooltip__logo" src="data/sushi-logo.jpg"></div><br><p class="tooltip__infos"><em>Food</em><a href="#" src="www.website.com">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>', //<u>Type:</u>
  //     placement: 'top'
  //   });
  // });

  const getMapObject = function(ev) {
    console.log("getMapObject", ev)
    console.log(ev.target.dataset.map === "first")
    // new openlayers.source.Stamen({
    //   layer: "terrain"
    // });
  }

  const point = new olFeature({
    geometry: new olGeomPoint(fromLonLat([10, 10]))
  })
  

  useEffect(() => {
    if(cryptoshops.isError) {
      console.log(cryptoshops.message)
    }
    // if(!user) {
    //   navigate('/login')
    // }
    console.log("EIN useEffect")
    dispatch(getCryptoshops())

    return  () => {
      dispatch(resetGeoJson())
    }
  }, []
  )

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

  const users = useSelector((state) => state.auth)
    useEffect(() => {
      if(users.isError) {
        console.log(users.message)
      }
      // if(!user) {
      //   navigate('/login')
      // }

      return  () => {
        dispatch(resetCryptoshop())
      }
    }, [users.user, navigate, users.isError, users.message, dispatch]
  )

  useEffect(() => {
    if(geoJsons.isCreated === true) {
      console.log("geoJsons.isCreated!")
      dispatch(getGeoJsons())
    }
  
    if(cryptoshops.isSuccess && geoJsons.isCreated === false) {
      dispatch(createGeoJson(originalShoplist))
    }
  
  }, [dispatch, cryptoshops.isSuccess, geoJsons.isCreated])

return (
  <div>
    Icon: <IcomoonIcon icon="pin" size={40} color="orange" />
    {/* <img src={} alt="test" /> */}

    <MapOpenlayer center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
        {/* <CryptoMap /> */}
        <VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject2nd, { featureProjection: get('EPSG:3857') }) })}
          style={styles.iconStyle}
        />
        {/* <VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
          style={styles.iconStyle}
        /> */}
        {/* {testMarkup} */}
        {/* {showLayer1 && (
          <VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
          style={styles.MultiPolygon}
          />
        )} */}

          {/* {showLayer2 && (
          <VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
          style={styles.MultiPolygon}
          />
        )} */}
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </MapOpenlayer>
    <button onClick={getMapObject} data-map="first">MapSetter</button>
    <div>
      <input
        type="checkbox"
        checked={showLayer1}
        onChange={event => setShowLayer1(event.target.checked)}
      /> Johnson County
    </div>
    <div>
      <input
        type="checkbox"
        checked={showLayer2}
        onChange={event => setShowLayer2(event.target.checked)}
      /> Wyandotte County
    </div>
    <img src={CryptoIcon}></img>
  </div>
  );
}
export default Map;