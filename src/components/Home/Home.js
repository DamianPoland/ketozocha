import React, { useState, useEffect, useRef } from 'react'
import style from './Home.module.css'


// components
import EditAd from '../EditAd/EditAd'
import ListItemAd from '../ListItemAd/ListItemAd'

// photos
import home__main from '../../assets/home__main.jpg'
import logo512 from '../../assets/logo512.png'

const Home = ({ isLogIn, dataFromDB, searchNav }) => {


    const [isEditAdVisible, setIsEditAdVisible] = useState(false)


    // scroll to top when componene render
    useEffect(() => { window.scrollTo(0, 0) }, [])


    // avocado with eyes
    useEffect(() => {
        const eyeball = e => {
            var eye = document.querySelectorAll('.eye')
            eye.forEach(eye => {
                let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2)
                let y = (eye.getBoundingClientRect().top) + window.scrollY + (eye.clientHeight / 2)
                let radian = Math.atan2(e.pageX - x, e.pageY - y)
                let rot = (radian * (180 / Math.PI) * -1) + 0
                eye.style.transform = "rotate(" + rot + "deg)"
            })
        }

        // add/remove event listener for width more than 1500px
        (window.innerWidth >= 1500) && window.addEventListener('mousemove', eyeball)
        return () => window.removeEventListener('mousemove', eyeball)
    }, [])


    // scroll to items when start search in nav
    const itemsContainer = useRef(null)
    useEffect(() => {
        searchNav && dataFromDB.length && window.scrollTo(0, itemsContainer.current.offsetTop - 64) // got to first item
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchNav])


    // call from listItemAd when Ad is edit
    const [editData, setEditData] = useState(false)
    const editAd = (e, item) => {
        e.preventDefault()
        setEditData(item)
        setIsEditAdVisible(true)
    }
    useEffect(() => !isEditAdVisible && setEditData(false), [isEditAdVisible]) // when close editAd then clear setEditData


    return (
        <main className={style.background}>

            {!isEditAdVisible ?
                <div className={style.section__container}>

                    {isLogIn && <div className={style.home__btnAbsolute}>
                        <button className='btn' onClick={() => setIsEditAdVisible(true)}>Dodaj ogłoszenie</button>
                    </div>}

                    {/* Avocado and eyes */}
                    {(window.innerWidth >= 1500) &&
                        <figure id='logo__img' className={style.home__avocadoFigure}>
                            <img className={style.home__avocadoImg} src={logo512} alt="Avocado and eyes" />
                            <div className={style.home__avocadoEyes}>
                                <div className={`${style.home__avocadoEye} eye`}></div>
                                <div className={`${style.home__avocadoEye} eye`}></div>
                            </div>
                        </figure>}

                    {/* HEADER */}
                    <figure id='logo__img' className={style.home__headerFigure}>
                        <img className={style.home__headerImg} src={home__main} alt="KetoZocha.pl" />
                    </figure>

                    {/* ALL RECIPIES */}
                    <section ref={itemsContainer} className={style.itemsContainer}>
                        {dataFromDB.length !== 0
                            ? <div>
                                {dataFromDB.map(item =>
                                    <ListItemAd
                                        key={item.id}
                                        item={item}
                                        isLogIn={isLogIn}
                                        editAd={editAd}
                                    />
                                )}
                            </div>
                            : <div></div>
                        }
                    </section>
                </div>
                :
                <EditAd
                    setIsEditAdVisible={setIsEditAdVisible}
                    editData={editData}
                />
            }


        </main >
    )
}

export default Home