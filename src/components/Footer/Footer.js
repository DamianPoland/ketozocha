import React from 'react'
import style from './Footer.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logoStudioWWW.png'


const Footer = () => {
    return (
        <footer className={style.background}>
            <div className={style.foot}>
                <p className={style.foot__item}>Copyright © ketozocha.pl 2021</p>
                <a href='https://studio-www.com/' target='_blank' rel="noopener noreferrer" className={`${style.designedBy} ${style.link}`}>
                    <span className={`${style.text} ${style.textLeft}`}>Designed by</span>
                    <img className={style.logo} src={logo} alt='logo' />
                    <span className={`${style.text} ${style.textRight}`}>studio-www.com</span>
                </a>
            </div>
            <Link to='/privacy-policy' className={style.link}>Polityka prywatności</Link>
        </footer>
    )
}

export default Footer