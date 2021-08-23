import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import style from './Nav.module.css'
import logo from '../../assets/logo192.png'


//svg
import { ReactComponent as Email } from '../../assets/icons/email.svg'
import { ReactComponent as Facebbok } from '../../assets/icons/facebook.svg'
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg'
import { ReactComponent as Search } from '../../assets/icons/search.svg'


const Nav = ({ searchNav, setSearchNav }) => {

    // open & close mobile menu
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
    let styleMobileMenu = isOpenMobileMenu ? style.listOpen : '' //menu list close/open
    let styleMobileButtonBurger = isOpenMobileMenu ? style.burgerOpen : '' //button burger close/open


    return (
        <nav className={style.nav}>
            <div className={style.backgroundTop}>
                <div className={style.containerTop}>
                    <Link to='/home' className={style.header}>
                        <img className={style.headerImg} src={logo} alt='logo' />
                        <p className={style.headerDesc}>K<span className={style.headerDesc1}>eto</span>Z<span className={style.headerDesc1}>ocha</span></p>
                    </Link>
                    <ul onClick={() => setIsOpenMobileMenu(false)} className={`${style.list} ${styleMobileMenu}`}>
                        <li className={style.listItem}><NavLink to='/home' activeClassName={style.activeLink} className={style.listItemAnchor}>Wszystkie wpisy</NavLink></li>
                        <li className={style.listItem}><NavLink to='/sweet' activeClassName={style.activeLink} className={style.listItemAnchor}>Na słodko</NavLink></li>
                        <li className={style.listItem}><NavLink to='/salty' activeClassName={style.activeLink} className={style.listItemAnchor}>Na słono/ostro</NavLink></li>
                        <li className={style.listItem}><NavLink to='/adaptation' activeClassName={style.activeLink} className={style.listItemAnchor}>Ketoadaptacja</NavLink></li>
                        <li className={style.listItem}><NavLink to='/base' activeClassName={style.activeLink} className={style.listItemAnchor}>Baza wiedzy</NavLink></li>
                        <li className={style.listItem}><NavLink to='/about' activeClassName={style.activeLink} className={style.listItemAnchor}>Historia KetoZochy</NavLink></li>
                    </ul>
                    <div onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)} className={`${style.burgerMenu} ${styleMobileButtonBurger}`}>
                        <div className={style.burgerBtn}></div>
                    </div>
                </div>
            </div>

            <div className={style.backgroundBottom}>
                <div className={style.containerBottom}>
                    <div className={style.desc__search}>
                        <input className={style.desc__searchInput} value={searchNav} onChange={e => setSearchNav(e.target.value)} />
                        <Search className={style.desc__searchSvg} />
                    </div>

                    <div className={style.desc__contact}>
                        <p className={style.desc__textEmail}>info@ketozocha.pl</p>
                        <a href='mailto:ketozocha@gmail.com?subject=Zapytanie' className={style.desc__contactItem}>
                            <Email className={style.desc__contactItemSvg} />
                            <p className={style.desc__contactItemText}>Email</p>
                        </a>

                        <a href='https://www.facebook.com/KetoZocha-103616275370795' target='_blank' rel="noopener noreferrer" className={style.desc__contactItem}>
                            <Facebbok className={style.desc__contactItemSvg} />
                            <p className={style.desc__contactItemText}>Facebbok</p>
                        </a>

                        <a href='https://instagram.com/ketozocha?utm_medium=copy_link' target='_blank' rel="noopener noreferrer" className={style.desc__contactItem}>
                            <Instagram className={style.desc__contactItemSvg} />
                            <p className={style.desc__contactItemText}>Instagram</p>
                        </a>

                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Nav