import React, { useState } from 'react';
import MapOpenlayer from "../Map/MapOpenlayer";
import Layers from '../Layers/Layers';
import TileLayer from '../Layers/TileLayer'
import VectorLayer from '../Layers/VectorLayer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "../Source";
import { fromLonLat, get } from 'ol/proj';
import Controls from '../Controls/Controls'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

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
};


function CryptoMap() {

    const feature1 = new Feature({
        geometry: new Point(fromLonLat([0, -10])),
        name: '<div class="tooltip__header"><b>Sushiz-Restaurant</b><img class="tooltip__logo" src="data/sushi-logo.jpg"></div><br><p class="tooltip__infos"><em>Food</em><a href="#" src="www.website.com">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>', //<u>Type:</u>
        placement: 'top'
      });

    const [center, setCenter] = useState([-94.9065, 38.9884]);
    const [zoom, setZoom] = useState(1);
    const [showLayer1, setShowLayer1] = useState(true);
    const [showLayer2, setShowLayer2] = useState(true);
    
    return (
        <>
            {/* <div>CryptoMap</div> */}
            <MapOpenlayer center={fromLonLat(center)} zoom={zoom}>
                <Layers>
                    <TileLayer
                        source={osm()}
                        zIndex={0}
                    />
                    {showLayer1 && (
                    <VectorLayer
                        source={vector({})}
                        features={feature1}
                        style={styles.MultiPolygon}
                    />
                    )}
                    {showLayer2 && (
                    <VectorLayer
                        source={vector({})}
                        style={styles.MultiPolygon}
                    />
                    )}
                </Layers>
                <Controls>
                </Controls>
            </MapOpenlayer>
        </>
    )
}

export default CryptoMap