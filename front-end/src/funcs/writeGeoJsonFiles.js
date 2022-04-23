import React from 'react'

export const writeGeoJsonFiles = (shoplistObject) => {
    const _geoJsonRaw = {};
    return new Promise((resolve, reject) => {
        console.log("starting writeGeoJsonFiles...")
        const categoryList = Object.keys(shoplistObject);
        categoryList.map(category => {
            _geoJsonRaw[category] = 
            { 
            "geojsonObject": {
                "type": "FeatureCollection",
                "features": []
            }
            }
            shoplistObject[category].map(shopItem => {
            if (shopItem.shopcoordinates !== undefined) {
                if (shopItem.shopcoordinates[0] !== undefined && shopItem.shopcoordinates[1] !== undefined)
                if(Number.isInteger(parseInt(shopItem.shopcoordinates[0])) && Number.isInteger(parseInt(shopItem.shopcoordinates[1]))) {
                    let _geoJsonRawItem = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [parseInt(shopItem.shopcoordinates[0]), parseInt(shopItem.shopcoordinates[1])]
                    },
                    "properties": {},
                    };
                    // console.log(shopItem)
                    
                    if(shopItem._id !== undefined) {
                    _geoJsonRawItem.properties["_id"] = shopItem._id
                    }
                    if(shopItem.shopsiteurl !== undefined) {
                    _geoJsonRawItem.properties["shopsiteurl"] = shopItem.shopsiteurl
                    }
                    if(shopItem.text !== undefined) {
                    _geoJsonRawItem.properties["text"] = shopItem.text
                    }
                    if(shopItem.shoplogourl !== undefined && shopItem.shoplogourl !== "") {
                    _geoJsonRawItem.properties["shoplogourl"] = shopItem.shoplogourl
                    }
                    if(shopItem.cryptos !== undefined) {
                    _geoJsonRawItem.properties["cryptos"] = shopItem.cryptos
                    }
                    if(shopItem.updatedAt !== undefined) {
                    _geoJsonRawItem.properties["updatedAt"] = shopItem.updatedAt
                    }
                    _geoJsonRaw[category].geojsonObject.features.push(_geoJsonRawItem)
                }
            }
            })
        })
        resolve(_geoJsonRaw) //_geoJsonRaw
    });
}
