function filterCryptoshops(itemsObject, originalShoplist, setOriginalShoplist) {
    let _newShoplist = originalShoplist // create a temporary object for editing
    if(itemsObject) {
        itemsObject.forEach(item => {
            let shoptype; // distignuish category of shop-item, set to "other" if none available
            item.shoptype === undefined ?  shoptype = "other" : shoptype = item.shoptype;    
            if (_newShoplist[shoptype].filter(el => el._id === item._id).length === 0) {
                _newShoplist[shoptype] = [... _newShoplist[shoptype], item]; // modify category in temporary object
            }
        })
        setOriginalShoplist(_newShoplist); // pass temporary object to original shop-list
        // console.log("setoriginalShopList:", originalShoplist)
    }
}
export default filterCryptoshops