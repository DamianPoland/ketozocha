import React from 'react'
import { Link } from 'react-router-dom'
import style from './Footer.module.css'

//svg
import { ReactComponent as Email } from '../../assets/icons/email.svg'
import { ReactComponent as Facebbok } from '../../assets/icons/facebook.svg'


const Footer = () => {
    return (
        <footer className={style.background}>

            <div className={style.desc}>
                <div className={style.desc_container}>

                    <section className={style.desc__item}>
                        <p className={style.desc__title}>O MNIE</p>
                        <p className={style.desc__text}>Keto Zocha to blog, którego tematem<br />jest dieta: keto, LCHF, paleo, low carb.<br />Znajdziesz tu przepis na: prosty deser<br />bez glutenu, ciasto bez cukru, prosta<br />tania przekąska.</p>
                    </section>

                    <section className={style.desc__item}>
                        <p className={style.desc__title}>NAWIGACJA</p>
                        <nav className={style.desc__nav}>
                            <Link to='/home' className={style.desc__link}><i className={style.desc__arrow} />Strona główna</Link>
                            <Link to='/sweet' className={style.desc__link}><i className={style.desc__arrow} />Na słodko</Link>
                            <Link to='/salty' className={style.desc__link}><i className={style.desc__arrow} />Na słono/ostro</Link>
                            <Link to='/about' className={style.desc__link}><i className={style.desc__arrow} />O mnie</Link>
                            <Link to='/privacy-policy' className={style.desc__link}><i className={style.desc__arrow} />Polityka prywatności</Link>
                        </nav>
                    </section>

                    <section className={style.desc__item}>
                        <p className={style.desc__title}>KONTAKT</p>

                        <div className={style.desc__contact}>

                            <a href='mailto:ketozocha@gmail.com?subject=Zapytanie' className={style.desc__contactItem}>
                                <Email className={style.desc__contactItemSvg} />
                                <p className={style.desc__contactItemText}>Email</p>
                            </a>

                            <a href='https://www.facebook.com/AplikacjeIStronyInternetowe/' target='_blank' rel="noopener noreferrer" className={style.desc__contactItem}>
                                <Facebbok className={style.desc__contactItemSvg} />
                                <p className={style.desc__contactItemText}>Facebbok</p>
                            </a>

                        </div>
                    </section>

                </div>
            </div>
            <div className={style.foot}>
                <p className={style.foot__item}>Copyright © ketozocha.pl 2021</p>
                <a href='https://studio-www.com/' target='_blank' rel="noopener noreferrer" className={style.foot__item}>Designed by studio-www.com</a>
            </div>
        </footer>
    )
}

export default Footer