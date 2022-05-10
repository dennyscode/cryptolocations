import { useState, useEffect } from "react"
import FormComponent from "../components/Form/FormComponent"
import CryptoMap from "../components/CryptoMap"
import { useSelector, useDispatch } from 'react-redux'
import { getCryptoshops } from '../features/cryptoshops/cryptoshopsSlice'
import { resetGeoJson } from '../features/geojson/geojsonSlice'
import { PrimaryButtonCallForAttention } from "../components/Buttons/PrimaryButton/PrimaryButton.style"

const MapWip = () => {
  const dispatch = useDispatch()
  const { cryptoshops, isError, isLoaded, isLoading, isSuccess, message } = useSelector((state) => state.cryptoshops)
  const [showForm, setShowForm] = useState(false)


  const handleToggleShowform = () => {
    console.log("Pin a shop!")
    setShowForm(!showForm)
  }

  useEffect(() => {
    if(isError) {
      console.log(cryptoshops.message)
    } else {
    // dispatch(getScreensize())
      dispatch(getCryptoshops())
    }
  }, [isError]
  )

  return (
    <>
      <CryptoMap cryptoshops={cryptoshops} cryptoshopsIsSuccess={isSuccess} cryptoshopsIsError={isError} />
      <PrimaryButtonCallForAttention onClick={handleToggleShowform}>Pin a shop!</PrimaryButtonCallForAttention>
      { showForm === false ? " " : <FormComponent /> }
    </>
  )
}
export default MapWip