import React, { useState, useEffect } from 'react';
import MapOpenlayer from "../Map/MapOpenlayer";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMyCryptoshops, reset } from '../features/cryptoshops/cryptoshopsSlice'
import Layers from '../Layers/Layers';
import TileLayer from '../Layers/TileLayer'
import Spinner from '../components/Spinner'
import VectorLayer from '../Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import olFeature from 'ol/Feature'
import olGeomPoint from 'ol/geom/Point'
import Controls from '../Controls/Controls'
import FullScreenControl from '../Controls/FullScreenControl'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
// import mapConfig from "../config_point.json";
import mapConfig from "../config_geo.json"
import mapInfos from "../geoInfos.json"
import CryptoIcon from "../data/img/crypto_sm.png"


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

const geojsonObject = mapConfig.geojsonObject; // see full geojson object in Github
const geojsonObject2 = mapInfos.geojsonObject;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

const Map = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(1);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  useEffect(() => {
    // code to run after render goes here
    const feature1 = new Feature({
      geometry: new Point(fromLonLat([0, -10])),
      name: '<div class="tooltip__header"><b>Sushiz-Restaurant</b><img class="tooltip__logo" src="data/sushi-logo.jpg"></div><br><p class="tooltip__infos"><em>Food</em><a href="#" src="www.website.com">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>', //<u>Type:</u>
      placement: 'top'
    });
  });

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
  
  // load shops:
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { cryptoshops, isLoading, isError, message } = useSelector((state) => state.cryptoshops)

  const {user} = useSelector((state) => state.auth )
    useEffect(() => {
      if(isError) {
        console.log(message)
      }
      if(!user) {
        navigate('/login')
      }
      dispatch(getMyCryptoshops())

      return  () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch]
  )

  if(isLoading) {
    return <Spinner />
  }


return (
  <div>
    <MapOpenlayer center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
        {showLayer1 && (
          <VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
          style={styles.MultiPolygon}
          />
        )}
        <VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
          style={styles.iconStyle}
        />
        ${console.log("VECTOR:", vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) }))}
        {/* {showLayer2 && (
          <VectorLayer
          source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
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