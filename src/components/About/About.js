import React, { useEffect } from 'react'
import style from './About.module.css'

// photos
import about1 from '../../assets/about1.jpg'
import about2 from '../../assets/about2.jpg'



const About = () => {

    // scroll to top when componene render
    useEffect(() => { window.scrollTo(0, 0) }, [])


    return (
        <main className={style.background}>
            <section className={style.about}>

                <figure className={style.about__headerFigure}>
                    <img className={style.about__headerImg} src={about1} alt="KetoZocha.pl" />
                </figure>

                <p className={style.about__text} >Jak się pewnie domyślasz po nazwie, mam na imię Zosia i jestem na diecie ketogenicznej.</p>
                <p className={style.about__text} >Już wybierając szkołę średnią, zdecydowałam się na gastronomię i od tamtej pory gotowanie wciąż jest moją pasją. Interesuje mnie tematyka diety, żywienia oraz tego, jak wielki jest związek pomiędzy tym, co jemy i jak się czujemy. Gluten i cukier wykluczyłam z diety lata temu, długo trzymałam się diety niskowęglowodanowej wykluczającej gluten. Od początku 2021, razem z moim mężem, jesteśmy na keto. Chcemy być zdrowi, czuć się dobrze. Z przyjemnością podzielę się z Tobą moimi najlepszymi przepisami, które udało mi się wymyślić.</p>
                <p className={style.about__text} >Pomysł na prowadzenie własnej strony podsuwają mi też od lat znajomi, których często karmię i w kółko gadam im o jedzeniu - które kocham robić i jeść. Idealnie pasuje do mnie cytat: “Jedyną rzeczą, którą lubię bardziej niż rozmowy o jedzeniu, jest jedzenie”. – John Walters</p>
                <p className={style.about__text} >Wiele osób słysząc o diecie keto, od razu przed oczami ma bekon posmarowany mascarpone i zero warzyw. Chciałabym pokazać, że da się i warto jeść inaczej. Istnieje wiele warzyw, które są keto-friendly (sprzyjają diecie keto). Mam nadzieję, że KetoZocha trochę 'zarazi' Cię pasją do gotowania oraz udowodni, że bezglutenowe, tłuste i niskowęglowodanowe jedzenie jest bardzo smaczne i zdrowe."</p>


                <figure className={style.about__headerFigure}>
                    <img className={style.about__headerImg} src={about2} alt="KetoZocha.pl" />
                </figure>
            </section>
        </main >
    )
}

export default About