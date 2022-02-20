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

// const iconFeature = new Feature({
//   geometry: new Point(fromLonLat([0, -10])),
//   name: 'Fish.1',
// });

// const feature1 = new Feature({
//   geometry: new Point(fromLonLat([0, -10])),
//   name: '<div class="tooltip__header"><b>Sushiz-Restaurant</b><img class="tooltip__logo" src="data/sushi-logo.jpg"></div><br><p class="tooltip__infos"><em>Food</em><a href="#" src="www.website.com">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>', //<u>Type:</u>
//   placement: 'top'
// });

// const feature2 = new Feature({
//   geometry: new Point(fromLonLat([-30, 10])),
//   name: '<div class="tooltip"><em>Tooltip</em> <u>with</u> <b>HTML</b></div>',
//   // title="<em>Tooltip</em> <u>with</u> <b>HTML</b>",
// });

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

// iconFeature.setStyle(function () {
//   // const x = Math.sin((i * Math.PI) / 180) * 3;
//   // const y = Math.sin((j * Math.PI) / 180) * 4;
//   // iconStyle.getImage().setScale([x, y]);
//   // iconStyle.getText().setScale([x, y]);
//   return iconStyle;
// });

rasterLayer.on('postrender', function (event) {
  // const vectorContext = getVectorContext(event);
  // const x = Math.cos((i * Math.PI) / 180) * 3;
  // const y = Math.cos((j * Math.PI) / 180) * 4;
  // iconStyle.getImage().setScale([x, y]);
  // iconStyle.getText().setScale([x, y]);
  // vectorContext.drawFeature(feature2, iconStyle);
});



// setInterval(function () {
//   i = (i + 4) % 360;
//   j = (j + 5) % 360;
//   vectorSource.changed();
// }, 1000);

Window.cryptoLocations = {
  "shops": [],
  "onLoad":
    function(fn) {
      // see if DOM is already available
      if (document.readyState === "complete" || document.readyState === "interactive") {
          // call on next available tick
          setTimeout(fn, 1);
      } else {
          document.addEventListener("DOMContentLoaded", fn);
      }
    },
  "createMap":
    function() {
      Window.cryptoLocations.map = new Map({
        layers: [rasterLayer],
        target: document.querySelector('#map'),
        view: new View({
          center: fromLonLat([-15, 0]),
          zoom: 3,
        }),
      });
      // display popup on click
      const map = Window.cryptoLocations.map;
      const element = Window.cryptoLocations.popup;

      map.on('click', function (evt) {
        const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });

        $(element).popover('dispose');
        if (feature) {
          Window.cryptoLocations.setPopup.setPosition(evt.coordinate);
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
    },

  "apiFetcher": 
    function(source) {
      fetch(source)
        .then(response => response.json())
        .then(console.log("THIS", this, self))
        .then(data => Window.cryptoLocations.fetchLooper({"this": this, "data": data}));
    },

  "fetchLooper":
    function(input) {
        input.data.forEach(el => {
            console.log(el);
            input.this.createShopOnMap(el)
        })
    },
  "setVectorLayer":
    function() {
      console.log(this);
      Window.cryptoLocations.vectorSource = new VectorSource({
        features: Window.cryptoLocations.shops,
      });
  
      const vectorLayer = new VectorLayer({
        source: Window.cryptoLocations.vectorSource,
      });

      Window.cryptoLocations.map.addLayer(vectorLayer)
    },

  "cryptoShopCoordinates":
    function(rawCoordinates) {
      return rawCoordinates.split(",").map(el => { return parseInt(el) })
    },
  
  "createPopup":
    function() {
      Window.cryptoLocations.popup = document.getElementById('popup');

      Window.cryptoLocations.setPopup = new Overlay({
        element: Window.cryptoLocations.popup,
        positioning: 'bottom-center',
        stopEvent: false,
      });
    },

  "createShopOnMap": 
    function(element) {
      console.log("createShopOnMap", this)
      Window.cryptoLocations.shops.push(
        new Feature({
          // geometry: new Point(fromLonLat([0, -10])),
          geometry: new Point(fromLonLat(this.cryptoShopCoordinates(element.shopCoordinates))),
          // name: '<div class="tooltip__header"><b>Sushiz-Restaurant</b><img class="tooltip__logo" src="data/sushi-logo.jpg"></div><br><p class="tooltip__infos"><em>Food</em><a href="#" src="www.website.com">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>', //<u>Type:</u>
          name: `<div class="tooltip__header"><b>${element.shopName}</b><img class="tooltip__logo" src="${element.shopLogoUrl}"></div><br><p class="tooltip__infos"><em>${element.shopType}</em><a href="${element.shopSiteUrl}" target="_blank">Website</a></p><div class="tooltip__cryptos"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span></div>`, //<u>Type:</u>
          placement: 'top'
        })
      );
    },
    "init":
      function() {
        Window.cryptoLocations.createPopup();
        Window.cryptoLocations.createMap();
        Window.cryptoLocations.map.addOverlay(Window.cryptoLocations.setPopup);

      }
}

Window.cryptoLocations.onLoad(Window.cryptoLocations.init)