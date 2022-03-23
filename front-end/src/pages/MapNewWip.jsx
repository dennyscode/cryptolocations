import React, { useState } from 'react';
import MapOpenlayer from "../Map/MapOpenlayer";
import MapContext from "../Map/MapContext";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layers from '../Layers/Layers';
import TileLayer from '../Layers/TileLayer'
// import VectorLayer from '../Layers/VectorLayer';
import VectorLayer from 'ol/source/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature'
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


function MapNewWip() {
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
    const [mapPoints, setMapPoints] = useState([-94.579228, 39.135386]);

    const newPoint = fromLonLat([10, 10]);

    const newFeature = new Feature({
        // geometry: new Point(fromLonLat([0, -10])),
        geometry: new Point(newPoint),
        // name: '<div class="tooltip__header"><b>Sushiz-Restaurant</b><img class="tooltip__logo" src="data/sushi-logo.jpg"></div><br><p class="tooltip__infos"><em>Food</em><a href="#" src="www.website.com">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>', //<u>Type:</u>
        name: `<div class="tooltip__header"><b>.shopName}</b><img class="tooltip__logo" src=".shopLogoUrl}"></div><br><p class="tooltip__infos"><em>.shopType}</em><a href=".shopSiteUrl}" target="_blank">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>`, //<u>Type:</u>
        placement: 'top'
    })

    const newPointFeature = new Feature({
        geometry: new Point(fromLonLat([10, 10]))
      })

    const newVectorSource = new VectorSource({
        features: [newPointFeature],
    });

    const newVectorLayer = new VectorLayer({
        source: newVectorSource
    });

    const point = new Feature({
      geometry: new Point(fromLonLat([10, 10]))
    })

    console.log("POINT:", point)

    const rawPoint = new Point(fromLonLat(mapPoints));

    console.log("RAW POINT:", )

    const pointArray = [ mapPoints ]
    const collection = new Collection(rawPoint) 

    console.log("collection - get Points:", collection)

    const point2 = new Feature({
        'format' :new GeoJSON(),
        'geometry': rawPoint,
        'size': 20,
        'style': styles.Point,
    })

    console.log({"POINT:": point, "POINT_RAW": pointArray, "rawpPoint": rawPoint, "POINT2": point2, "collection": collection})
    console.log("MapContext:", MapContext)

    if(isLoading) {
      return <Spinner />
    }

  return (
      <>
        <h1>MapNewWip</h1>
        <MapOpenlayer center={fromLonLat(center)} zoom={zoom}>
        <Layers>
            <TileLayer
              source={osm()}
              zIndex={0}
            />

            <VectorLayer
              style={styles.Point}
            />

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

export default MapNewWip