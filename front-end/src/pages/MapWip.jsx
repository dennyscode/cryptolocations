import React, { useState } from 'react';
import MapOpenlayer from "../Map/MapOpenlayer";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layers from '../Layers/Layers';
import TileLayer from '../Layers/TileLayer'
import VectorLayer from '../Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import olFeature from 'ol/Feature'
import Collection from 'ol/Collection'
import Point from 'ol/geom/Point';
import ImageStyle from 'ol/style/Image';
import Controls from '../Controls/Controls'
import FullScreenControl from '../Controls/FullScreenControl'
import mapConfigPoint from "../config_point.json";
import { useSelector, useDispatch } from 'react-redux'
import { getMyCryptoshops, reset } from '../features/cryptoshops/cryptoshopsSlice'
import CryptoshopItem from '../components/CryptoshopItem'
import Spinner from '../components/Spinner'




let styles = {
  'Point': new Style({
    stroke: new Stroke({
      color: 'blue',
      radius: 2000,
      width: 1000,
      size: 2000,
    }),
    fill: new Fill({
      color: 'blue'
    }),
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
};

  const geojsonObject = mapConfigPoint.geojsonObject; // see full geojson object in Github


function MapWip() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cryptoshops, isLoading, isError, message } = useSelector((state) => state.cryptoshops)

    const {user} = useSelector((state) => state.auth )
    useEffect(() => 
        {
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

    const [center, setCenter] = useState([-15, 0]);
    const [zoom, setZoom] = useState(3);
    const [showLayer1, setShowLayer1] = useState(true);
    const [showLayer2, setShowLayer2] = useState(true);
    const [mapPoints, setMapPoints] = useState([10, 10]);


    const point = new olFeature({
      geometry: new Point(fromLonLat([10, 10]))
    })

    console.log("POINT:", point)

    const rawPoint = new Point(fromLonLat([-94.6053, 39.0432]));

    console.log("RAW POINT:", )

    const pointArray = [ [-94.6053, 39.0432] ]
    const collection = new Collection(rawPoint) 

    console.log("collection - get Points:", collection)

    const point2 = new olFeature({
        'format' :new GeoJSON(),
        'geometry': rawPoint,
        'size': 20,
        'style': styles.Point,
    })

    console.log({"POINT:": point, "POINT_RAW": pointArray, "rawpPoint": rawPoint, "POINT2": point2, "collection": collection})
    

    if(isLoading) {
      return <Spinner />
    }

  return (
      <>
        <h1>MapWip</h1>
        <MapOpenlayer center={fromLonLat(center)} zoom={zoom}>
        <Layers>
            <TileLayer
              source={osm()}
              zIndex={0}
            />

            <VectorLayer
              source={vector({features: collection})}
              style={styles.Point}
            />

            {showLayer2 && (
            <VectorLayer
              source={vector({})}
              style={styles.MultiPolygon}
            />
            )}

        </Layers>
        <Controls>
            <FullScreenControl />
        </Controls>
        </MapOpenlayer> 

        <section className='content'>
        {cryptoshops.length > 0 ? (
          <div className='cryptoshops'>
            {cryptoshops.map((cryptoshop) => (
              <CryptoshopItem key={cryptoshop._id} cryptoshop={cryptoshop} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>

        <div id="map" className="map"><div id="popup"></div></div>
      </>
  )
}

export default MapWip