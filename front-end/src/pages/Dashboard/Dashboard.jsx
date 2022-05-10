import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FormComponent from '../../components/Form/FormComponent'
import Spinner from '../../components/Spinner/SpinnerComponent'
import { getMyCryptoshops, getCryptoshops, resetCryptoshop } from '../../features/cryptoshops/cryptoshopsSlice'
import CryptoMap from '../../components/CryptoMap'
import ListComponent from '../../components/List/ListComponent'
import IntroComponent from '../../components/Intro/IntroComponent'
import Modal from 'react-modal';
import { PrimaryButton, PrimaryButton_Text } from "../../components/Buttons/PrimaryButton/PrimaryButton.style"

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cryptoshops, isLoading, isError, message } = useSelector((state) => state.cryptoshops)
  useEffect(() => {
    if(cryptoshops.isError) {
      console.log(cryptoshops.message)
    }
    console.log("OUT:", cryptoshops)
  },[cryptoshops])

  const {user} = useSelector((state) => state.auth )
    useEffect(() => {
      if(isError) {
        console.log(message)
      }
      if(!user) {
        navigate('/login')
      }
      // dispatch(getMyCryptoshops())
      dispatch(getCryptoshops())

      return  () => {
        // dispatch(resetCryptoshop())
      }
    }, [user, navigate, isError, message, dispatch]
  )

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <> 
      <IntroComponent user={user} />
      <CryptoMap cryptoshops={cryptoshops} />
      <PrimaryButton onClick={openModal}>
        <PrimaryButton_Text>
          Add a PLACE
        </PrimaryButton_Text>
      </PrimaryButton>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <FormComponent />
      </Modal>
      <ListComponent inputList={cryptoshops}/>
    </>
  )
}

export default Dashboard