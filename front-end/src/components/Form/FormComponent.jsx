import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCryptoshop } from '../../features/cryptoshops/cryptoshopsSlice'
import { Form, FormGroup, FormLabel, FormInput } from './Form.style'
import { Section } from '../Layout/Section.style'

function FormComponent() {

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
    <Section>
        <Form onSubmit={onSubmit}>
            <FormGroup className="form-group">
                <FormLabel htmlFor="text">
                    Cryptoshop
                </FormLabel>
                <FormInput 
                    type="text" 
                    name="text" 
                    id="text" 
                    value={text} 
                    onChange={
                        (e) => setText(e.target.value)
                        } 
                />
                <FormLabel htmlFor="text">
                    Website
                </FormLabel>
                <FormInput 
                    type="url" 
                    name="url" 
                    id="url" 
                    value={url} 
                    onChange={
                        (e) => setUrl(e.target.value)
                        } 
                />
                <FormLabel htmlFor="text">
                    Logo
                </FormLabel>
                <FormInput 
                    type="url" 
                    name="logo" 
                    id="logo" 
                    value={logo} 
                    onChange={
                        (e) => setLogo(e.target.value)
                        } 
                />
                <FormLabel htmlFor="pos">
                    Position
                </FormLabel>
                <FormInput 
                    type="text" 
                    name="xpos" 
                    id="xpos" 
                    placeholder="x"
                    value={xpos} 
                    onChange={
                        (e) => setXpos(e.target.value)
                        } 
                />
                <FormInput 
                    type="text" 
                    name="ypos" 
                    id="ypos" 
                    placeholder="y"
                    value={ypos} 
                    onChange={
                        (e) => setYpos(e.target.value)
                        } 
                />
                <FormLabel htmlFor="field">
                    Business field
                </FormLabel>
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
                <button className="btn btn-block" type="submit">Add Cryptoshop</button>
            </FormGroup>
        </Form>
    </Section>
  )
}

export default FormComponent