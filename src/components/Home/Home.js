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
                    <figure className={style.home__headerFigure}>
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
                            : <div>
                                EMPTY
                            </div>
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