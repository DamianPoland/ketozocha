import React, { useEffect } from 'react'
import style from './About.module.css'




const About = () => {

    // scroll to top when componene render
    useEffect(() => { window.scrollTo(0, 0) }, [])


    return (
        <main className={style.background}>
            <section className={style.about}>
                <p className={style.about__text} >Jak się pewnie domyślasz po nazwie, mam na imię Zosia i jestem na diecie ketogenicznej. </p>
                <p className={style.about__text} >Już od kilkunastu lat bardzo interesuje mnie tematyka diety, żywienia oraz tego, jak wielki jest związek pomiędzy tym, co jemy i jak się czujemy. Gluten i cukier wykluczyłam z diety lata temu - długo trzymałam się diety niskowęglowodanowej wykluczającej gluten. Od początku 2021, razem z moim mężem, jesteśmy na keto. Chcemy być zdrowi, czuć się dobrze. Z przyjemnością podzielę się z Tobą moimi najlepszymi przepisami, które udało mi się wymyślić.</p>
                <p className={style.about__text} >Pomysł na prowadzenie własnej strony podsuwają mi też od lat znajomi, których często karmię i w kółko gadam im o jedzeniu - które kocham robić i jeść.</p>
                <p className={style.about__text} >Wiele osób słysząc o diecie keto od razu przed oczami ma bekon posmarowany mascarpone i zero warzyw. Chciałabym pokazać, że da się i warto jeść inaczej. Istnieje wiele warzyw, które są keto-friendly (sprzyjają diecie keto).</p>
                <p className={style.about__text} >Mam nadzieję, że KetoZocha trochę 'zarazi' Cię pasją do gotowania oraz udowodni, że bezglutenowe, tłuste i niskowęglowodanowe jedzenie jest bardzo smaczne i zdrowe.</p>
            </section>
        </main >
    )
}

export default About