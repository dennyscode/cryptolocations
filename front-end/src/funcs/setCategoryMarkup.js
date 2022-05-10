import VectorLayer from '../Layers/VectorLayer'
import IconNameEdit from '../utils/iconNameEdit'
import { vector } from "../Source";
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import RestaurantIcon from "../data/icomoon/restaurant.png"
import GroceryIcon from "../data/icomoon/grocery.png"
import BarIcon from "../data/icomoon/bar.png"
import OtherIcon from "../data/icomoon/pin.png"
import CryptoIcon from '../data/img/crypto_sm.png'
import { Icon, Style } from 'ol/style';

const setCategoryMarkup = (cryptoshops, styles) => {
    const iconSchema = {
        "restaurant": RestaurantIcon,
        "grocery": GroceryIcon,
        "bar": BarIcon,
        "other": OtherIcon
    }

    const getStyle = function(icon) { 
        // console.log("getStyle:", icon)
        return (
            new Style({
                image: new Icon({
                    anchor: [0.5, 1.05],
                    offset: [0,0],
                    // color: "white",
                    src: icon,
                    crossOrigin: '',
                    scale: [1, 1],
                
                    // rotation: Math.PI / 4,
                }),
                // text: new Text({
                //   text: 'shop\nTEXT',
                //   scale: [0, 0],
                //   rotation: Math.PI / 4,
                //   textAlign: 'center',
                //   textBaseline: 'top',
                // }),
            })
        )
    }

    if(cryptoshops === {}) {
        return <>Loading...</>
    } else {
        if( cryptoshops && cryptoshops.length != 0) {
            let output = [];
            Object.keys(cryptoshops).forEach((category, index) => {
                const geoIcon = iconSchema[category]
                const styleProps = getStyle(geoIcon)
              
                output.push(<VectorLayer key={index}
                    source={vector({ features: new GeoJSON().readFeatures(cryptoshops[category].geojsonObject, { featureProjection: get('EPSG:3857') }) })}
                    style={styleProps}
                />)
            })
            return (
                output
            )
        }
    }
}
export default setCategoryMarkup
