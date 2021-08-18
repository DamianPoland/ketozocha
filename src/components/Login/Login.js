import React, { useState } from 'react'
import style from './Login.module.css'


//firebase
import { auth } from '../../shared/fire'


const Login = ({ isLogIn }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const logIn = () => {

        // auth.createUserWithEmailAndPassword(email, password) // można użyć .then ale jest listener w App
        //     .catch(err => console.log(err))

        auth.signInWithEmailAndPassword(email, password) // można użyć .then ale jest listener w App
            .catch(err => console.log(err))

    }

    const logOut = () => {
        auth.signOut() // można użyć .then ale jest listener w App
    }


    return (
        <main className={style.background}>
            {!isLogIn &&
                <div className={style.login__container}>

                    <div className={style.login__itemContainer}>
                        <label className={style.login__itemDesc}>Email:</label>
                        <input onChange={event => setEmail(event.target.value)} value={email} className={style.login__itemList} type='text' placeholder="email" maxLength="30" />
                    </div>

                    <div className={style.login__itemContainer}>
                        <label className={style.login__itemDesc}>Hasło:</label>
                        <input onChange={event => setPassword(event.target.value)} value={password} className={style.login__itemList} type='password' placeholder="hasło" maxLength="30" />
                    </div>

                </div>}

            {/* buttons */}
            <div className={style.btnContainer}>
                {isLogIn
                    ? <button className='btn' onClick={logOut}>Wyloguj</button>
                    : <button className='btn' onClick={logIn}>Zaloguj</button>
                }
            </div>
        </main>
    )
}

export default Login
