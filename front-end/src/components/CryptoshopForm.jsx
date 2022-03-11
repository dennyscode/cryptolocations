import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCryptoshop } from '../features/cryptoshops/cryptoshopsSlice'

function CryptoshopForm() {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createCryptoshop({text}))
        setText('')
    }


  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">
                    Cryptoshop
                </label>
                <input 
                    type="text" 
                    name="text" 
                    id="text" 
                    value={text} 
                    onChange={
                        (e) => setText(e.target.value)
                        } 
                />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">Add Cryptoshop</button>
            </div>
        </form>
    </section>
  )
}

export default CryptoshopForm