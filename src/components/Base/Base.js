import React, { useEffect } from 'react'
import style from './Base.module.css'

// components
import ListItemAd from '../ListItemAd/ListItemAd'

const Base = ({ dataFromDB }) => {

    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <main className={style.background}>
            <section className={style.itemsContainer}>
                {dataFromDB.length !== 0
                    ? <div>
                        {dataFromDB.map(item =>
                            <ListItemAd
                                key={item.id}
                                item={item}
                            />
                        )}
                    </div>
                    : <div></div>
                }
            </section>
        </main >
    )
}

export default Base