import React, { useState, useEffect } from 'react'
import style from './Recipe.module.css'


//firebase
import { firestore } from '../../shared/fire'

// constans
import { mainColName } from '../../shared/constans'

//components
import AlertSmall from "../../UI/AlertSmall/AlertSmall"
import Spinner from '../../UI/Spinner/Spinner'




const Recipe = props => {

    // scroll to top when componene render
    useEffect(() => window.scrollTo(0, 0), [])

    // show or hide small alert
    const [isAlertSmallShow, setIsAlertSmallShow] = useState(false)

    // Spinner
    const [isMainSpinnerShow, setIsMainSpinnerShow] = useState(false)

    // STATE - set one Recipe
    const [oneRecipe, setOneRecipe] = useState()


    useEffect(() => {

        // show main spinner
        setIsMainSpinnerShow(true)

        // get ad with itemID from DB and save in State
        firestore.collection(mainColName).doc(props.match.params.key).get()
            .then(resp => {
                setOneRecipe(resp.data())
            })
            .catch(err => {
                console.log('listener err', err)
                setIsAlertSmallShow({ alertIcon: 'error', description: 'Błąd. Spróbuj ponownie później.', animationTime: '2', borderColor: 'red' })
            })
            .finally(() => {

                // hide main spinner
                setIsMainSpinnerShow(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <main className={style.background}>
            {isMainSpinnerShow && <Spinner />}

            {/* AlertSmall */}
            {isAlertSmallShow && <AlertSmall alertIcon={isAlertSmallShow.alertIcon} description={isAlertSmallShow.description} animationTime={isAlertSmallShow.animationTime} borderColor={isAlertSmallShow.borderColor} hide={() => setIsAlertSmallShow(false)} />}

            {oneRecipe &&
                <section className={style.recipe}>
                    <div className={style.recipe__container}>

                        <div className={style.recipe__btnContainer}>
                            <button className={style.recipe__btn} onClick={() => window.history.back()}>{"< Wróć"}</button>
                        </div>

                        {oneRecipe.imageURL[0] &&
                            <figure className={style.recipe__figure} >
                                <img className={style.recipe__img} src={oneRecipe.imageURL[0]} alt='przepis KetoZocha.pl' />
                            </figure>}

                        <h1 className={style.recipe__title}>{oneRecipe.titleRecipe}</h1>

                        <p className={style.recipe__text}>{oneRecipe.id.split(' ')[0]}</p>

                        {oneRecipe.descriptionRecipe1 && <p className={style.recipe__text}>{oneRecipe.descriptionRecipe1}</p>}

                        {oneRecipe.imageURL[1] &&
                            <figure className={style.recipe__figure} >
                                <img className={style.recipe__img} src={oneRecipe.imageURL[1]} alt='przepis KetoZocha.pl' />
                            </figure>}

                        {oneRecipe.descriptionRecipe2 && <p className={style.recipe__text}>{oneRecipe.descriptionRecipe2}</p>}

                        {oneRecipe.imageURL[2] &&
                            <figure className={style.recipe__figure} >
                                <img className={style.recipe__img} src={oneRecipe.imageURL[2]} alt='przepis KetoZocha.pl' />
                            </figure>}

                        {oneRecipe.descriptionRecipe3 && <p className={style.recipe__text}>{oneRecipe.descriptionRecipe3}</p>}

                        {oneRecipe.imageURL[3] &&
                            <figure className={style.recipe__figure} >
                                <img className={style.recipe__img} src={oneRecipe.imageURL[3]} alt='przepis KetoZocha.pl' />
                            </figure>}

                        {oneRecipe.descriptionRecipe4 && <p className={style.recipe__text}>{oneRecipe.descriptionRecipe4}</p>}

                        {/* linki */}
                        {oneRecipe.links[0].href &&
                            <div>
                                <p className={style.recipe__textLink}>Przydatne linki:</p>
                                {oneRecipe.links.map((i, index) =>
                                    i.href
                                        ? <div key={index}>
                                            <p className={style.recipe__descLink}>{i.desc}</p>
                                            <a className={style.recipe__link} key={index} href={i.href}>{i.text}</a>
                                        </div>
                                        : null
                                )}
                            </div>}
                    </div>
                </section>
            }


        </main >
    )
}

export default Recipe
