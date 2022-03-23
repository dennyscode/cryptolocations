import React, { useState, useEffect } from 'react';
import MapOpenlayer from "../Map/MapOpenlayer";
import Layers from '../Layers/Layers';
import TileLayer from '../Layers/TileLayer'
import VectorLayer from '../Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import olFeature from 'ol/Feature'
import olGeomPoint from 'ol/geom/Point'
import Controls from '../Controls/Controls'
import FullScreenControl from '../Controls/FullScreenControl'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import mapConfig from "../config_point.json";


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
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
};

const geojsonObject = mapConfig.geojsonObject; // see full geojson object in Github
const geojsonObject2 = mapConfig.geojsonObject2; // see full geojson object in Github
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];


const Map = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
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

  const point = new olFeature({
    geometry: new olGeomPoint(fromLonLat([10, 10]))
  })
  

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
          style={styles.Point}
          />
        )}
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
      /> Wyandotte County</div>
    </div>
  );
}
export default Map;