import React, { useEffect } from 'react'
import style from './About.module.css'
import grubas from '../../assets/grubas.jpg'




const About = () => {

    // scroll to top when componene render
    useEffect(() => { window.scrollTo(0, 0) }, [])


    return (
        <main className={style.background}>
            <section className={style.about}>
                <p>Lubię jeść !!!</p>
                <img src={grubas} alt='grubas' />
            </section>
        </main >
    )
}

export default About