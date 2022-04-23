import { useDispatch } from 'react-redux'
import { deleteCryptoshop } from '../../features/cryptoshops/cryptoshopsSlice'

function ListItemComponent({cryptoshop}) {

    const dispatch = useDispatch()
    console.log(cryptoshop)
  return (
        <div className="cryptoshop">
            <div>
                { new Date(cryptoshop.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{ cryptoshop.text }</h2>
            {cryptoshop.shoptype === undefined ? '' : <p>{cryptoshop.shoptype}</p>}
            {cryptoshop.shopsiteurl === undefined ? '' : <p>{cryptoshop.shopsiteurl}</p>}
            {cryptoshop.shopcoordinates === undefined ? '' : <p>x: {cryptoshop.shopcoordinates[0]} | y: {cryptoshop.shopcoordinates[1]}</p>}
            {cryptoshop.shoplogourl === undefined ? '' : <p>{cryptoshop.shoplogourl}</p>}

            <button className="close" onClick={() => dispatch(deleteCryptoshop(cryptoshop._id))}>X</button>
        </div>
    )
}

export default ListItemComponent