const IconNameEdit = (category) => {
    // console.log("ICONS OUT:", geoArray, category)
    return [`${category.trim().replace(/^\w/, (c) => c.toUpperCase())}Icon`,`${category}.png`]
}

export default IconNameEdit;