import { useDispatch } from 'react-redux'
import { deleteCryptoshop } from '../features/cryptoshops/cryptoshopsSlice'

function CryptoshopItem({cryptoshop}) {

    const dispatch = useDispatch()

  return (
        <div className="cryptoshop">
            <div>
                { new Date(cryptoshop.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{ cryptoshop.text }</h2>
            <button className="close" onClick={() => dispatch(deleteCryptoshop(cryptoshop._id))}>X</button>
        </div>
    )
}

export default CryptoshopItem