import React, { useState, useEffect } from 'react'
import style from './Home.module.css'


// components
import EditAd from '../EditAd/EditAd'
import ListItemAd from '../ListItemAd/ListItemAd'

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

                    {isLogIn && <button className='btn' onClick={() => setIsEditAdVisible(true)}>Dodaj ogłoszenie</button>}

                    {/* HEADER */}
                    <section>

                        JAKIŚ HEADER ???

                    </section>

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
                                Loading...
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