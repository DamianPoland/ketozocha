import React, { useState, useEffect } from 'react'
import style from './EditAd.module.css'
import { categoryRecipeArray } from '../../shared/data'

// image compression library
import imageCompression from 'browser-image-compression';

//firebase
import { firestore, storage } from '../../shared/fire'

// constans
import { mainColName } from '../../shared/constans'

//photos
import Photo from '../../assets/photo.png'

// components
import AlertSmall from "../../UI/AlertSmall/AlertSmall"


const EditAd = ({ setIsEditAdVisible, editData }) => {

    useEffect(() => {

    }, [])

    // generator [yyyy-mm-dd date1970]
    const idGenerator = () => `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getTime()}`

    // show or hide small alert
    const [isAlertSmallShow, setIsAlertSmallShow] = useState(false)

    // id
    const [id, setId] = useState(idGenerator())

    // CATEGORY ----------------------------------------------------------------------------------------------------

    const [categoryRecipe, setCategoryRecipe] = useState(categoryRecipeArray.map(i => ({ name: i, isChecked: false })))

    const setCategoryRecipeHandler = e => {
        setCategoryRecipe(prevState => {

            const currentArray = [...prevState]
            const currentIndex = currentArray.findIndex(i => i.name === e.target.value)
            currentArray[currentIndex] = { ...currentArray[currentIndex], isChecked: e.target.checked }
            return currentArray
        })
    }


    // PHOTOS----------------------------------------------------------------------------------------------------------------

    const [image, setImage] = useState([null, null, null, null, null, null, null, null, null, null]) // input image value
    const [imageURL, setImageURL] = useState([null, null, null, null, null, null, null, null, null, null]) // write URL from DB
    const [smallImageURL, setSmallImageURL] = useState("") // write URL from DB
    const [progress, setProgress] = useState(0) // progress bar
    const [showProgress, setShowProgress] = useState([false, false, false, false, false, false, false, false, false, false]) // set progress visibility

    // get photo from file/camera
    const getPhoto = (e, index) => {
        setImage(prevState => {
            let helpArray = [...prevState]
            helpArray[index] = e.target.files[0]
            return helpArray
        })
    }
    // add image 0 to DB and show to user
    useEffect(() => {
        addImgToDB(image[0], 0)
        addImgToDB(image[0], -1, 0.05, 160) //index -1 is for smallImageURL
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[0]])

    // add image 1 to DB and show to user
    useEffect(() => {
        addImgToDB(image[1], 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[1]])

    // add image 2 to DB and show to user
    useEffect(() => {
        addImgToDB(image[2], 2)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[2]])

    // add image 3 to DB and show to user
    useEffect(() => {
        addImgToDB(image[3], 3)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[3]])

    // add image 4 to DB and show to user
    useEffect(() => {
        addImgToDB(image[4], 4)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[4]])

    // add image 5 to DB and show to user
    useEffect(() => {
        addImgToDB(image[5], 5)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[5]])

    // add image 6 to DB and show to user
    useEffect(() => {
        addImgToDB(image[6], 6)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[6]])

    // add image 7 to DB and show to user
    useEffect(() => {
        addImgToDB(image[7], 7)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[7]])

    // add image 8 to DB and show to user
    useEffect(() => {
        addImgToDB(image[8], 8)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[8]])

    // add image 9 to DB and show to user
    useEffect(() => {
        addImgToDB(image[9], 9)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image[9]])


    // add image to DB and show to user, index -1 is for smallImageURL
    const addImgToDB = async (image, index, maxSizeMB = 0.5, maxWidthOrHeight = "1280") => {

        // if image is empty then return
        if (!image) { return }

        // if file is not image then return
        if (image.type.split("/")[0] !== 'image') {
            setIsAlertSmallShow({ alertIcon: 'info', description: 'To nie jest zdjęcie.', animationTime: '2', borderColor: 'orange' })
            return
        }

        // set progress bar visibile if index !== -1 => index -1 is for smallImageURL
        if (index !== -1) {
            setShowProgress(prevState => {
                let helpArray = [...prevState]
                helpArray[index] = true
                return helpArray
            })
        }

        // check image size, if more than 0.5MB or for smallImageURL then compress photo
        if (image.size >= 1048576 / 2 || (index === -1)) {

            // compression options
            const options = {
                maxSizeMB: maxSizeMB, // in MB
                maxWidthOrHeight: maxWidthOrHeight, // in px
                useWebWorker: true
            }

            // start compression
            try {
                image = await imageCompression(image, options)

            } catch (error) {

                // set progress bar invisibile
                console.log("compression error message: ", error.message)
                setIsAlertSmallShow({ alertIcon: 'error', description: 'Błąd. Kompresja nie powiodła się. Spróbuj ponownie później.', animationTime: '2', borderColor: 'red' })
                setProgress(0)
                setShowProgress(prevState => {
                    let helpArray = [...prevState]
                    helpArray[index] = false
                    return helpArray
                })

                // return to not save in DB
                return
            }
        }

        // send photo to DB
        const uploadTask = storage.ref(`images/${id}/${index}`).put(image)
        uploadTask.on('state_changed',
            snapshot => { setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)) },//progress bar
            err => { //show if error
                console.log('upload error: ', err)
                setIsAlertSmallShow({ alertIcon: 'error', description: 'Błąd. Spróbuj ponownie później.', animationTime: '2', borderColor: 'red' })
                setProgress(0)
                // set progress bar invisibile
                setShowProgress(prevState => {
                    let helpArray = [...prevState]
                    helpArray[index] = false
                    return helpArray
                })
            },
            () => {
                storage // get url
                    .ref(`images/${id}`)
                    .child(`${index}`)
                    .getDownloadURL() // get url
                    .then(url => {

                        // write url in state, index - 1 is for smallImageURL
                        if (index !== -1) {
                            setImageURL(prevState => {
                                let helpArray = [...prevState]
                                helpArray[index] = url
                                return helpArray
                            })
                        } else {
                            setSmallImageURL(url)
                        }

                        setProgress(0)
                        // set progress bar invisibile
                        setShowProgress(prevState => {
                            let helpArray = [...prevState]
                            helpArray[index] = false
                            return helpArray
                        })
                    })

                    .catch(errStorage => {
                        console.log('storage errStorage', errStorage)
                        setIsAlertSmallShow({ alertIcon: 'error', description: 'Błąd. Spróbuj ponownie później.', animationTime: '2', borderColor: 'red' })
                        setProgress(0)
                        // set progress bar invisibile
                        setShowProgress(prevState => {
                            let helpArray = [...prevState]
                            helpArray[index] = false
                            return helpArray
                        })
                    })
            })
    }


    // DESCRIPTIONS----------------------------------------------------------------------------------------------------------------

    const [titleRecipe, setTitleRecipe] = useState('')
    const [descriptionRecipe1, setDescriptionRecipe1] = useState('')
    const [descriptionRecipe2, setDescriptionRecipe2] = useState('')
    const [descriptionRecipe3, setDescriptionRecipe3] = useState('')
    const [descriptionRecipe4, setDescriptionRecipe4] = useState('')
    const [links, setLinks] = useState(Array.from(Array(10)).map(i => ({ desc: '', text: '', href: '' }))) // array of objects with empty values


    // IF AD IS EDITING ----------------------------------------------------------------------------------------------------------------


    useEffect(() => editData && addAllDataToInputsIfAdIsEdit(editData), [editData])

    const addAllDataToInputsIfAdIsEdit = editData => {

        // id
        setId(editData.id)

        // TYPE CATEGORY
        setCategoryRecipe(editData.categoryRecipe)

        // PHOTOS
        setImage([null, null, null, null, null, null, null, null, null, null])
        setImageURL(editData.imageURL)
        setSmallImageURL(editData.smallImageURL)
        setProgress(0)
        setShowProgress([false, false, false, false, false, false, false, false, false, false])

        // DESCRIPTIONS
        setTitleRecipe(editData.titleRecipe)
        setDescriptionRecipe1(editData.descriptionRecipe1)
        setDescriptionRecipe2(editData.descriptionRecipe2)
        setDescriptionRecipe3(editData.descriptionRecipe3)
        setDescriptionRecipe4(editData.descriptionRecipe4)

        //LINKS
        setLinks(editData.links)
    }


    // FUNCTIONS ----------------------------------------------------------------------------------------------------------------


    // after finish form, use form for: add or edit
    const handleReadyAd = () => {
        const obj = getDataObjectWithAllInputs()
        sendAddItemToDB(obj)
    }

    const getDataObjectWithAllInputs = () => {
        return {
            id,
            categoryRecipe,
            imageURL,
            smallImageURL,
            titleRecipe,
            descriptionRecipe1,
            descriptionRecipe2,
            descriptionRecipe3,
            descriptionRecipe4,
            links,
        }
    }


    const sendAddItemToDB = (obj) => {
        firestore.collection(mainColName).doc(id).set(obj)
            .then(() => {
                console.log('succes')
                setIsEditAdVisible(false)
            })
            .catch(err => console.log('err', err))

    }


    const cancelForm = () => {

        // delete all photo when cance - if is editing then no delete photos
        !editData && deleteImagesAndFolderFromDB()
        setIsEditAdVisible(false)
    }


    const deleteAd = () => {
        deleteImagesAndFolderFromDB()
        firestore.collection(mainColName).doc(id).delete() //delete document with id from collection
        setIsEditAdVisible(false)
    }


    const deleteImagesAndFolderFromDB = () => {
        const ref = storage.ref(`images/${id}`)
        ref.listAll()
            .then(resp => {
                resp.items.forEach(fileRef => {
                    storage.ref(fileRef.fullPath).getDownloadURL()
                        .then(url => {
                            storage.refFromURL(url).delete()
                                .then()
                                .catch(error => console.log("error deletion, error: ", error))
                        })
                })
            })
            .catch(error => console.log(error))
    }



    const setLinksHandler = (type, index, value) => {
        setLinks(prevState => {
            const prev = [...prevState]
            prev[index] = { ...prev[index], [type]: value }
            return prev
        })
    }



    return (
        <main className={style.ad}>

            {/* AlertSmall */}
            {isAlertSmallShow && <AlertSmall alertIcon={isAlertSmallShow.alertIcon} description={isAlertSmallShow.description} animationTime={isAlertSmallShow.animationTime} borderColor={isAlertSmallShow.borderColor} hide={() => setIsAlertSmallShow(false)} />}


            <div className={style.ad__section}>


                {/* category */}
                <div className={style.ad__container}>

                    <div className={style.ad__itemContainer}>
                        <p className={style.ad__itemDesc}>Kategoria:</p>
                        {categoryRecipe.map(item =>

                            <label className={style.ad__itemLabelCheckBox}>
                                <input
                                    key={item.name}
                                    className={style.ad__itemCheckBox}
                                    value={item.name}
                                    checked={item.isChecked}
                                    onChange={e => setCategoryRecipeHandler(e)}
                                    type='checkbox' />
                                {item.name}
                            </label>
                        )}
                    </div>
                </div>


                {/* Photos  */}
                <div className={style.ad__containerPhotos}>
                    <p className={style.ad__itemContainer}>Zdjęcia:</p>
                    <div className={style.ad__containerPhotos}>
                        {[...Array(10)].map((item, index) => {
                            return (
                                <div key={index} className={style.ad__itemContainer}>
                                    <input
                                        id={`file${index}`}
                                        // className=""
                                        style={{ display: "none" }}
                                        type='file'
                                        onChange={(e) => getPhoto(e, index)}
                                        accept='image/*' //image/* = .jpg, .jpeg, .bmp, .svg, .png
                                    />
                                    <label htmlFor={`file${index}`} className={` ${style.btn} ${style.ad__itemLabel}`}><img className={style.ad__itemImage} src={imageURL[index] || Photo} alt='podgląd zdjęcia.' /> </label>
                                    {showProgress[index] &&
                                        <div className={style.ad__progressContainer}>
                                            <progress className={style.ad__progressBar} value={progress} max='100' />
                                        </div>}
                                    {(index === 0 && !imageURL[0]) && <p className={style.ad__itemFirstPhotDesc}>Zdjęcie główne</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>


                {/* descriptions  */}
                <div className={`${style.ad__itemContainer} ${style.ad__itemContainerWide}`}>
                    <label className={style.ad__itemDesc}>Tytuł (max 50 znaków):</label>
                    <input onChange={event => setTitleRecipe(event.target.value)} value={titleRecipe} className={style.ad__itemList} placeholder='Tytuł' type='text' maxLength="50" />
                </div>

                <div className={`${style.ad__itemContainer} ${style.ad__itemContainerWide}`}>
                    <label className={style.ad__itemDesc}>Opis 1:</label>
                    <textarea onChange={event => setDescriptionRecipe1(event.target.value)} value={descriptionRecipe1} className={style.ad__itemList} type='textarea' rows='8' placeholder="Opis 1" />
                </div>

                <div className={`${style.ad__itemContainer} ${style.ad__itemContainerWide}`}>
                    <label className={style.ad__itemDesc}>Opis 2:</label>
                    <textarea onChange={event => setDescriptionRecipe2(event.target.value)} value={descriptionRecipe2} className={style.ad__itemList} type='textarea' rows='8' placeholder="Opis 2" />
                </div>

                <div className={`${style.ad__itemContainer} ${style.ad__itemContainerWide}`}>
                    <label className={style.ad__itemDesc}>Opis 3:</label>
                    <textarea onChange={event => setDescriptionRecipe3(event.target.value)} value={descriptionRecipe3} className={style.ad__itemList} type='textarea' rows='8' placeholder="Opis 3" />
                </div>

                <div className={`${style.ad__itemContainer} ${style.ad__itemContainerWide}`}>
                    <label className={style.ad__itemDesc}>Opis 4:</label>
                    <textarea onChange={event => setDescriptionRecipe4(event.target.value)} value={descriptionRecipe4} className={style.ad__itemList} type='textarea' rows='8' placeholder="Opis 4" />
                </div>

                {/* links */}
                {links.map((i, index) => {
                    return (
                        <div key={index} className={`${style.ad__itemContainer} ${style.ad__itemContainerWide}`}>
                            <label className={style.ad__itemDesc}>Link: {index + 1}</label>
                            <input onChange={event => setLinksHandler('desc', index, event.target.value)} value={links[index].desc} className={style.ad__itemList} placeholder={`Opis linka ${index + 1} np: Opis przepisów KetoZochy`} />
                            <input onChange={event => setLinksHandler('text', index, event.target.value)} value={links[index].text} className={style.ad__itemList} placeholder={`Tekst linka ${index + 1} np: przepisy KetoZochy`} />
                            <input onChange={event => setLinksHandler('href', index, event.target.value)} value={links[index].href} className={style.ad__itemList} placeholder={`Link ${index + 1} np: https://ketozocha.pl`} />
                        </div>
                    )
                })}


                {/* buttons */}
                <div className={style.btnContainer}>
                    <button className={`${style.btn} ${style.btnMmargin}`} onClick={cancelForm}>Anuluj</button>
                    <button className={style.btn} onClick={handleReadyAd}>Zapisz</button>
                </div>
                {editData &&
                    <div className={style.btnContainer}>
                        <button className={style.btn} onClick={deleteAd}>Usuń</button>
                    </div>}

            </div>
        </main >
    )
}

export default EditAd

