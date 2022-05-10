import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { createScreen } from './features/screen/screenSlice'
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Register'
import Main from './pages/Main'
import Login from './pages/Login'
import HeaderComponent from './components/Header/HeaderComponent'
import MapWip from './pages/MapWip'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(createScreen())
  }, []
  )  
  const screen = useSelector((state) => state.screen)
  // console.log("screen::: ", screen)
  // useEffect(() => {
  //   console.log("useEffect...", screen)
  // }, [])

  return (
    <>
      <Router>
        {/* <div className='container'> */}
          <HeaderComponent />
          <Routes>
            <Route path='/' element={<MapWip />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/main' element={<Main />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        {/* </div> */}
      </Router> 
      <ToastContainer />
    </>
  );
}

export default App;
