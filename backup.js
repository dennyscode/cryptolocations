// import 'ol/ol.css';
import './style.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM'
import View from 'ol/View';
import {Icon, Style, Text} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import {getVectorContext} from 'ol/render';

const rasterLayer = new TileLayer({
  source: new OSM(),
});

const iconFeature = new Feature({
  geometry: new Point(fromLonLat([0, -10])),
  name: 'Fish.1',
});

const feature1 = new Feature({
  geometry: new Point(fromLonLat([0, -10])),
  name: '<div class="tooltip__header"><b>Sushiz-Restaurant</b><img class="tooltip__logo" src="data/sushi-logo.jpg"></div><br><p class="tooltip__infos"><em>Food</em><a href="#" src="www.website.com">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>', //<u>Type:</u>
  placement: 'top'
});

const feature2 = new Feature({
  geometry: new Point(fromLonLat([-30, 10])),
  name: '<div class="tooltip"><em>Tooltip</em> <u>with</u> <b>HTML</b></div>',
  // title="<em>Tooltip</em> <u>with</u> <b>HTML</b>",
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1.05],
    offset: [0,0],
    src: 'data/crypto_sm.png',
    crossOrigin: '',
    scale: [1, 1],

    // rotation: Math.PI / 4,
  }),
  text: new Text({
    text: 'FISH\nTEXT',
    scale: [0, 0],
    rotation: Math.PI / 4,
    textAlign: 'center',
    textBaseline: 'top',
  }),
});

let i = 0;
let j = 45;

iconFeature.setStyle(function () {
  // const x = Math.sin((i * Math.PI) / 180) * 3;
  // const y = Math.sin((j * Math.PI) / 180) * 4;
  // iconStyle.getImage().setScale([x, y]);
  // iconStyle.getText().setScale([x, y]);
  return iconStyle;
});

rasterLayer.on('postrender', function (event) {
  // const vectorContext = getVectorContext(event);
  // const x = Math.cos((i * Math.PI) / 180) * 3;
  // const y = Math.cos((j * Math.PI) / 180) * 4;
  // iconStyle.getImage().setScale([x, y]);
  // iconStyle.getText().setScale([x, y]);
  // vectorContext.drawFeature(feature2, iconStyle);
});

const vectorSource = new VectorSource({
  features: [iconFeature, feature1, feature2],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: document.getElementById('map'),
  view: new View({
    center: fromLonLat([-15, 0]),
    zoom: 3,
  }),
});

setInterval(function () {
  i = (i + 4) % 360;
  j = (j + 5) % 360;
  vectorSource.changed();
}, 1000);

const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false,
});
map.addOverlay(popup);

// display popup on click
map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    return feature;
  });
  $(element).popover('dispose');
  if (feature) {
    popup.setPosition(evt.coordinate);
    $(element).popover({
      placement: 'top',
      html: true,
      animation: false,
      content: feature.get('name'),
    });
    $(element).popover('show');
  }
});

// change mouse cursor when over marker
map.on('pointermove', function (e) {
  const pixel = map.getEventPixel(e.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});
// Close the popup when the map is moved
map.on('movestart', function () {
  $(element).popover('dispose');
});
