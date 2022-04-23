import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Register'
import Main from './pages/Main'
import Login from './pages/Login'
import HeaderComponent from './components/Header/HeaderComponent'
import MapWip from './pages/MapWip'
import CryptoMap from './components/CryptoMap'


function App() {
  return (
    <>
      <Router>
        {/* <div className='container'> */}
          <HeaderComponent />
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/map' element={<MapWip />}></Route>
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
