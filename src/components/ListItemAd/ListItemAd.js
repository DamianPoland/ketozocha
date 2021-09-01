import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './ListItemAd.module.css'

//photos
import PhotoEmpty from '../../assets/photoEmpty.png'
import pepper from '../../assets/pepper.jpg'
import sugar from '../../assets/sugar.jpg'
import adaptation from '../../assets/adaptation.jpg'
import books from '../../assets/books.jpg'



const ListItemAd = ({ item, isLogIn, editAd }) => {

    const [sortIcon, setSortIcon] = useState([])
    useEffect(() => {
        const stringArray = item.categoryRecipe.filter(i => i.isChecked === true)

        let helpArray = []
        stringArray.forEach(i => {
            i.name === 'Słono' && helpArray.push(pepper)
            i.name === 'Słodko' && helpArray.push(sugar)
            i.name === 'Ketoadaptacja' && helpArray.push(adaptation)
            i.name === 'Baza' && helpArray.push(books)

        })
        setSortIcon(helpArray)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Link to={`/home/${item.id}`} className={style.recipeItem} >

            <section className={style.recipeItem__container}>

                <div className={style.recipeItem__containerIcons}>
                    {sortIcon.map((i, index) => (
                        <img key={index} className={style.recipeItem__Icon} src={i} alt='ikonka' />
                    ))}
                </div>

                <p className={style.recipeItem__itemTitle}>{item.titleRecipe}</p>

                <p className={style.recipeItem__itemDate}>{item.id.split(' ')[0]}</p>


                <div className={style.recipeItem__itemContainer}>

                    <figure className={style.recipeItem__itemFigure}>
                        <img className={style.recipeItem__itemImg} src={item.imageURL[0] || PhotoEmpty} onError={(e) => { e.target.onerror = null; e.target.src = PhotoEmpty }} alt="main KetoZocha.pl" />
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
