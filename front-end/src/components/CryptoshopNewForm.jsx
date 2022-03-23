import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCryptoshop } from '../features/cryptoshops/cryptoshopsSlice'

function CryptoshopNewForm() {

    const [text, setText] = useState('')
    const [xpos, setXpos] = useState('')
    const [ypos, setYpos] = useState('')
    const [url, setUrl] = useState('')
    const [field, setField] = useState('')
    const [logo, setLogo] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createCryptoshop(
            {
                "text": text, 
                "xpos": xpos, 
                "ypos": ypos, 
                "url": url, 
                "field": field, 
                "logo": logo
            }
        ))
        setText('')
        setXpos('')
        setYpos('')
        setLogo('')
        setField('')
        setUrl('')
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
                <label htmlFor="text">
                    Website
                </label>
                <input 
                    type="url" 
                    name="url" 
                    id="url" 
                    value={url} 
                    onChange={
                        (e) => setUrl(e.target.value)
                        } 
                />
                <label htmlFor="text">
                    Logo
                </label>
                <input 
                    type="url" 
                    name="logo" 
                    id="logo" 
                    value={logo} 
                    onChange={
                        (e) => setLogo(e.target.value)
                        } 
                />
                <label htmlFor="pos">
                    Position
                </label>
                <input 
                    type="text" 
                    name="xpos" 
                    id="xpos" 
                    placeholder="x"
                    value={xpos} 
                    onChange={
                        (e) => setXpos(e.target.value)
                        } 
                />
                <input 
                    type="text" 
                    name="ypos" 
                    id="ypos" 
                    placeholder="y"
                    value={ypos} 
                    onChange={
                        (e) => setYpos(e.target.value)
                        } 
                />
                <label htmlFor="field">
                    Business field
                </label>
                <select 
                    name="field" 
                    id="field"
                    value={field} 
                    onChange={
                        (e) => setField(e.target.value)
                    } 
                >
                    <option value="random">Random</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="grocery">Grocery</option>
                    <option value="electronics">Electronics</option>
                </select>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">Add Cryptoshop</button>
            </div>
        </form>
    </section>
  )
}

export default CryptoshopNewForm