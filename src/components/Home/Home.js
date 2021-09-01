import React, { useState, useEffect } from 'react'
import style from './Home.module.css'


// components
import EditAd from '../EditAd/EditAd'
import ListItemAd from '../ListItemAd/ListItemAd'

// photos
import home__main from '../../assets/home__main.jpg'

const Home = ({ isLogIn, dataFromDB }) => {


    const [isEditAdVisible, setIsEditAdVisible] = useState(false)


    // scroll to top when componene render
    useEffect(() => { window.scrollTo(0, 0) }, [])


    // onScroll to parallax for section start
    useEffect(() => {

        //get container with text
        const startContainer = document.querySelector("#start__contaner")

        if (!startContainer) { return }

        // event listener funcion
        const startScrool = () => {

            // get scrool position
            let scrollPosition = window.pageYOffset

            // stop when > 700 => startContainer not visible
            if (scrollPosition > 700) { return }

            // console.log(window.pageYOffset);
            let scale = (1 - scrollPosition * 0.0015)
            startContainer.style.transform = `translateY(${scrollPosition * -0.5}px) scale(${scale > 0 ? scale : 0})`
        }

        // add/remove event listener
        window.addEventListener('scroll', startScrool)

        return () => window.removeEventListener('scroll', startScrool)
    }, [])


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

                    {/* HEADER */}
                    <figure id='logo__img' className={style.home__headerFigure}>
                        <img className={style.home__headerImg} src={home__main} alt="KetoZocha.pl" />
                    </figure>

                    {/* ALL RECIPIES */}
                    <section className={style.itemsContainer}>
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