import React, { useRef, useState, useEffect } from "react"
import MapContext from "./MapContext";
import * as ol from "ol";
import * as olSource from "ol/source";

const MapOpenlayer = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

//  map !== null ? console.log("map", map) : console.log("no map"); 
//  ol !== null ? console.log("ol", ol) : console.log("no ol");

 const tileOSM = new ol.Tile({
  source: new olSource.OSM(),
  visible: true,
  title: 'OSMStandard'      
})

const openStreetMapHumanitarian = new ol.Tile({
  source: new olSource.OSM({
    url: 'https://a.tile.openstreetmap.de/${z}/${x}/${y}.png ',
    attributions: 'An adaptation of the "German" Mapnik style to the CartoCSS structure used by the international style.'
  }),
  visible: false,
  title: 'OpenStreetMapStandard'      
})

const tileStamenTerrain = new ol.Tile({
  source: new olSource.XYZ({
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
    attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }),
  visible: false,
  title: 'StamenTerrain'      
})


  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: []
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);
  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);
  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center])
  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default MapOpenlayer;
