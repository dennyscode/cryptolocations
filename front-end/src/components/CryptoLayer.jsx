import CryptoIcon from '../data/img/crypto_sm.png'
import { Circle as Icon, Style } from 'ol/style';
import { get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { vector } from "../Source";
import VectorLayer from '../Layers/VectorLayer';


function CryptoLayer({index, geojson, icon}) {

    const style = new Style({
        image: new Icon({
          anchor: [0.5, 1.05],
          offset: [0,0],
          // color: "white",
          src: icon,
          crossOrigin: '',
          scale: [1, 1],
          // rotation: Math.PI / 4,
        })
    })

    console.log("ICON:", CryptoIcon, icon)
  return (
      <>
    <VectorLayer 
        source={vector({ features: new GeoJSON().readFeatures(geojson, { featureProjection: get('EPSG:3857') }) })}
        style={style}
    /> 
    <img src={CryptoIcon} /> 
    </>)
}
export default CryptoLayer