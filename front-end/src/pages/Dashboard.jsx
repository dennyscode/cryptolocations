import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CryptoshopForm from '../components/CryptoshopForm'
import CryptoshopItem from '../components/CryptoshopItem'
import Spinner from '../components/Spinner'
import { getMyCryptoshops, reset } from '../features/cryptoshops/cryptoshopsSlice'

function Dashboard() {
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
      dispatch(getMyCryptoshops())

      return  () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch]
  )

  if(isLoading) {
    return <Spinner />
  }
  
  return (
    <> 
      <section className="heading">
        <h1>Welcome  { user && user.name }</h1>
        <p>Shops Dashboard</p>
      </section>
      <CryptoshopForm />

      <section className='content'>
        {cryptoshops.length > 0 ? (
          <div className='cryptoshops'>
            {cryptoshops.map((cryptoshop) => (
              <CryptoshopItem key={cryptoshop._id} cryptoshop={cryptoshop} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard