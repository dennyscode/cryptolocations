import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ListItemComponent from '../components/List/ListItemComponent'
import Spinner from '../components/Spinner/SpinnerComponent'
import { getCryptoshops, resetCryptoshop } from '../features/cryptoshops/cryptoshopsSlice'
import ListComponent from '../components/List/ListComponent'

function Main() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cryptoshops, isLoading, isError, message } = useSelector((state) => state.cryptoshops)
  const {user} = useSelector((state) => state.auth )
    useEffect(() => {
      if(isError) {
        console.log(message)
      }
      if(!user) {
        navigate('/login')
      }
      dispatch(getCryptoshops())

      return  () => {
        dispatch(resetCryptoshop())
      }
    }, [user, navigate, isError, message, dispatch]
  )

  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <> 
      <section className='content'>
        <ListComponent inputList={cryptoshops}/>
      </section>
    </>
  )
}

export default Main