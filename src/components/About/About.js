import React, { useEffect } from 'react'
import style from './About.module.css'

// photos
import about1 from '../../assets/about1.jpg'
import about2 from '../../assets/about2.png'



const About = () => {

    // scroll to top when componene render
    useEffect(() => { window.scrollTo(0, 0) }, [])

    // onScroll to parallax for section start
    useEffect(() => {

        //get container with text
        const figure = document.querySelector("#figure")
        const img = document.querySelector("#img")

        if (!figure || !img) { return }

        // event listener funcion
        const startScrool = () => {

            // get scrool position
            let scrollPosition = window.pageYOffset

            // stop when > 700 => startContainer not visible
            if (scrollPosition > 700) { return }

            // console.log(window.pageYOffset);
            let scale = (1 - scrollPosition * 0.0015)
            figure.style.transform = scale > 0.4 && `translateY(${scrollPosition * 0.45}px) scale(${scale > 0 ? scale : 0})`
            img.style.borderRadius = `${100 - scale * 100}%`
        }

        // add/remove event listener
        window.addEventListener('scroll', startScrool)
        return () => {
            window.removeEventListener('scroll', startScrool)
        }
    }, [])


    return (
        <main className={style.background}>
            <section className={style.about}>

                <figure id='figure' className={style.about__headerFigure}>
                    <img id='img' className={style.about__headerImg} src={about1} alt="KetoZocha.pl" />
                </figure>

                <p className={`${style.about__text} ${style.about__text__center} ${style.about__text__header}`} >Jak się pewnie domyślasz po nazwie, mam na imię Zosia i jestem na diecie <strong>ketogenicznej</strong>.</p>
                <p className={style.about__text} >Już wybierając szkołę średnią, zdecydowałam się na gastronomię i od tamtej pory gotowanie wciąż jest moją pasją. Interesuje mnie tematyka <strong>diety, żywienia</strong> oraz tego, jak wielki jest związek pomiędzy tym, co jemy i jak się czujemy. Gluten i cukier wykluczyłam z diety lata temu, długo trzymałam się <strong>diety niskowęglowodanowej</strong> wykluczającej gluten. Od początku 2021, razem z moim mężem, jesteśmy na <strong>keto</strong>. Chcemy być zdrowi, czuć się dobrze. Z przyjemnością podzielę się z Tobą moimi najlepszymi przepisami, które udało mi się wymyślić.</p>
                <p className={style.about__text} >Pomysł na prowadzenie własnej strony podsuwają mi też od lat znajomi, których często karmię i w kółko gadam im o jedzeniu - które kocham robić i jeść. Idealnie pasuje do mnie cytat:</p>
                <p className={`${style.about__text__quote} ${style.about__text__center}`} > “Jedyną rzeczą, którą lubię bardziej niż rozmowy o jedzeniu, jest jedzenie”. – John Walters</p>
                <p className={style.about__text} >Wiele osób słysząc o <strong>diecie keto</strong>, od razu przed oczami ma bekon posmarowany mascarpone i zero warzyw. Chciałabym pokazać, że da się i warto jeść inaczej. Istnieje wiele warzyw, które są <strong>keto-friendly (sprzyjają diecie keto)</strong>. Mam nadzieję, że KetoZocha trochę 'zarazi' Cię pasją do gotowania oraz udowodni, że <strong>bezglutenowe, tłuste i niskowęglowodanowe jedzenie</strong> jest bardzo smaczne i zdrowe."</p>


                <figure className={style.about__headerFigure}>
                    <img className={style.about__headerImg} src={about2} alt="KetoZocha.pl" />
                </figure>
            </section>
        </main >
    )
}

export default About