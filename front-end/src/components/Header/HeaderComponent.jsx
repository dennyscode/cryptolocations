import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'
import { Header, HeaederItems, HeaderItem } from './Header.style'
import PrimaryButtonComponent from '../Buttons/PrimaryButton/PrimaryButton.style'

function HeaderComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <Header>
        <div className="logo">
            <Link to='/'>CryptoFinder</Link>
        </div>
        <HeaederItems>
            { user ? ( 
                <HeaderItem>
                    <button className="btn" onClick={onLogout}>
                        <FaSignOutAlt/> Logout
                    </button>
                </HeaderItem>
                ) : (
                <>
                    <HeaderItem>
                        <Link to='/login'>
                            <FaSignInAlt/> Login
                        </Link>
                    </HeaderItem>
                    <HeaderItem>
                        <Link to='/register'>
                            <FaUser/> Register
                        </Link>
                    </HeaderItem>
                </>)
            }
        </HeaederItems>
    </Header>
  )
}

export default HeaderComponent