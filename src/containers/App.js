import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


// components
import Nav from '../components/Nav/Nav'
import Home from '../components/Home/Home'
import Recipe from '../components/Recipe/Recipe'
import Sweet from '../components/Sweet/Sweet'
import Salty from '../components/Salty/Salty'
import About from '../components/About/About'
import Footer from '../components/Footer/Footer'
import Login from '../components/Login/Login'
import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy'
import AlertPrivacy from '../UI/AlertPrivacy/AlertPrivacy'

//firebase
import { auth, firestore } from '../shared/fire'

// constans
import { UID, mainColName } from '../shared/constans'


const App = () => {


  // privacy policy permission
  const [permissionPrivacyPolicy, setPermissionPrivacyPolicy] = useState(true)

  useEffect(() => {
    const permissionForPrivacyPolicy = localStorage.getItem("PRIVACY_POLICY_PERMISSION")
    if (permissionForPrivacyPolicy !== "true") {
      setPermissionPrivacyPolicy(false)
    }
  }, [])

  const setPermission = () => {
    localStorage.setItem("PRIVACY_POLICY_PERMISSION", true)
    setPermissionPrivacyPolicy(true)
  }


  // login
  const [isLogIn, setisLogIn] = useState(localStorage.getItem(UID))
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? localStorage.setItem(UID, true) : localStorage.removeItem(UID)
      user ? setisLogIn(true) : setisLogIn(false)
    })
  }, [])


  // DB listeners
  const [dataFromDBHome, setDataFromDBHome] = useState([])
  const [dataFromDBSweet, setDataFromDBSweet] = useState([])
  const [dataFromDBSalty, setDataFromDBSalty] = useState([])

  useEffect(() => {
    firestore.collection(mainColName).onSnapshot(
      resp => {
        let helpArray = []
        resp.forEach(doc => helpArray.push(doc.data())) // get all data from DB

        console.log('helpArray: ', helpArray)
        setDataToHome(helpArray)
        setDataToSweet(helpArray)
        setDataToSalty(helpArray)
      },
      err => console.log(err.message))

  }, [])

  const setDataToHome = data => setDataFromDBHome(data)
  const setDataToSweet = data => setDataFromDBSweet(data.filter(i => i.categoryRecipe === 'Słodko'))
  const setDataToSalty = data => setDataFromDBSalty(data.filter(i => i.categoryRecipe === 'Słono'))



  return (
    <BrowserRouter>
      <Nav path='/' />
      <Switch>
        <Route path='/home' exact render={props => <Home {...props} isLogIn={isLogIn} dataFromDB={dataFromDBHome} />} />
        <Route path='/home/:key' render={props => <Recipe {...props} />} />
        <Route path='/sweet' exact render={props => <Sweet {...props} dataFromDB={dataFromDBSweet} />} />
        <Route path='/salty' exact render={props => <Salty {...props} dataFromDB={dataFromDBSalty} />} />
        <Route path='/about' render={props => <About {...props} />} />

        <Route path='/login' render={props => <Login {...props} isLogIn={isLogIn} />} />
        <Route path='/privacy-policy' component={PrivacyPolicy} />
        <Redirect to='/home' />
      </Switch>
      <Footer path='/' />
      {permissionPrivacyPolicy ? null : <Route path='/' render={props => <AlertPrivacy {...props} click={setPermission} />} />}
    </BrowserRouter>
  );
}

export default App;
