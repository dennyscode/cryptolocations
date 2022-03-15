import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Main from './pages/Main'
import Map from './pages/Map'
import Login from './pages/Login'
import Header from './components/Header'


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/map' element={<Map />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </div>
      </Router> 
      <ToastContainer />
    </>
  );
}

export default App;
