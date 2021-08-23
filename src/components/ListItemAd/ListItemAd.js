import React from 'react'
import { Link } from 'react-router-dom'
import style from './ListItemAd.module.css'

//photos
import PhotoEmpty from '../../assets/photoEmpty.png'



const ListItemAd = ({ item, isLogIn, editAd }) => {

    return (
        <Link to={`/home/${item.id}`} className={style.recipeItem} >

            <section className={style.recipeItem__container}>

                <p className={style.recipeItem__itemTitle}>{item.titleRecipe}</p>

                <p className={style.recipeItem__itemDate}>{item.id.split(' ')[0]}</p>


                <div className={style.recipeItem__itemContainer}>

                    <figure className={style.recipeItem__itemFigure}>
                        <img className={style.recipeItem__itemImg} src={item.smallImageURL || PhotoEmpty} onError={(e) => { e.target.onerror = null; e.target.src = PhotoEmpty }} alt="main nieruchomość" />
                    </figure>

                    <div className={style.recipeItem__itemDescContainer}>
                        <p className={style.recipeItem__itemText}>{item.descriptionRecipe1}</p>
                    </div>

                </div>

                <div className={style.recipeItem__btn} >
                    {isLogIn && <button className='btn' onClick={(e) => editAd(e, item)}>Edytuj</button>}
                </div>
            </section>
        </Link>
    )
}

export default ListItemAd
