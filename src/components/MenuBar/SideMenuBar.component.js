
import { NavLink } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { ReactComponent as GlobalIcon } from '../../assets/Globe.svg';
import { ReactComponent as Menu } from '../../assets/Hamburger.svg';

import './SideMenuBar.styles.scss';

const SideMenuBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const contain = useRef();
    const MenuScreen = useRef();
    const title = useRef();
    const MenuTap = useRef();

    const handleClick = () => {
        setShowMenu(!showMenu);
        if(showMenu){
            title.current.style.visibility = 'hidden';
            MenuTap.current.style.visibility = 'hidden';
            contain.current.style.width = '0';
            setTimeout(() => {
                MenuScreen.current.style.visibility = 'hidden';
            },300)
        }
        else{
            MenuScreen.current.style.visibility = 'visible';
            contain.current.style.width = '40%';
            title.current.style.visibility = 'visible';
            MenuTap.current.style.visibility = 'visible';
        }
    }

    return (
        <>
            <Menu className='hidden menu' onClick={handleClick} />
            <div className='MenuScreen' ref={MenuScreen} onClick={handleClick}>
                <div className='contain' ref={contain} onClick={e => {e.stopPropagation()}}>
                <div className='title' ref={title} onClick={e => {e.stopPropagation()}}>Menu</div>
                <div className='MenuTap' ref={MenuTap} onClick={handleClick}>
                    <NavLink
                        exact
                        activeClassName='active'
                        className='home-link nav_link'
                        to='/'
                    >
                        <p>Home</p>
                    </NavLink>
                    <NavLink
                        activeClassName='active'
                        className='icon-link nav_link'
                        to='/questions'
                    >
                        <p>
                            <GlobalIcon className='icon' />
                            All Questions
                        </p>
                    </NavLink>
                    <NavLink activeClassName='active' className='link nav_link' to='/tags'>
                        <p>Tags</p>
                    </NavLink>
                    <NavLink activeClassName='active' className='link nav_link' to='/users'>
                        <p>Users</p>
                    </NavLink>
                </div>
                </div>
            </div>
        </>
    );
}

export default SideMenuBar;