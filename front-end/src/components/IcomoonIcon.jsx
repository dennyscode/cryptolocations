import IcoMoon, { iconList }from "react-icomoon";
const iconSet = require("../data/icomoon/selection.json");


function IcomoonIcon(props) {
    // console.log("IcoMoon Props:", props)
    console.log("IconList:", iconList(iconSet))

    return (
        <IcoMoon iconSet={iconSet} {...props} />
    )
}
export default IcomoonIcon