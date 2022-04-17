import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import './Header.scss'

import { RootState } from '../../store';
import { signOut } from '../../store/actions/authActions';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { authenticated } = useSelector((state: RootState) => state.auth);


    const logoutClickHandler = () => {
        dispatch(signOut())
    }

    const handleClick = (path: string) => {
        setIsOpen(false)
        navigate(path)
    }

    return (
        <div className="navbar">
            <span onClick={() => navigate('/dashboard')} className="nav-logo"><span className="nav-logo-primary">Tİ</span>KO Event Organizer System </span>
            <div className={`nav-items ${isOpen && "open"}`}>
                {
                    !authenticated
                        ?
                        <>
                            <p onClick={() => handleClick('/signin')}>Sign In</p>
                            <p onClick={() => handleClick('/signup')}>Sign Up</p>
                        </>
                        :
                        <>
                            <p onClick={() => handleClick('/dashboard')}>Dashboard</p>
                            <p onClick={() => handleClick('/add_visitor')}>Add Visitor</p>
                            <p onClick={() => handleClick('/visitors')}>Visitors</p>
                            <p onClick={() => logoutClickHandler()}>Sign Out</p>
                        </>
                }

            </div>
            <div className={`nav-toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="bar">

                </div>
            </div>
        </div>
    );
};

export default Header;