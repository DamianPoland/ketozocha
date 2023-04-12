import React from 'react'
import style from './Footer.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logoAlexaWeb.png'


const Footer = () => {
    return (
        <footer className={style.background}>
            <div className={style.foot}>
                <p className={style.foot__item}>Copyright © ketozocha.pl 2023</p>
                <a href='https://alexa-web.com/' target='_blank' rel="noopener noreferrer" className={`${style.designedBy} ${style.link}`}>
                    <span className={`${style.text} ${style.textLeft}`}>Designed & Developed by</span>
                    <img className={style.logo} src={logo} alt='logo' />
                    <span className={`${style.text} ${style.textRight}`}>Alexa-Web.com</span>
                </a>
            </div>
            <Link to='/privacy-policy' className={style.link}>Polityka prywatności</Link>
        </footer>
    )
}

export default Footer