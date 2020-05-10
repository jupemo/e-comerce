import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/hearder/header.component';
import SignInAndSingUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';


  
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    
      if(userAuth){
        
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id : snapShot.id,
              ...snapShot.data()
            });
        });
      }else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSingUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps =  dispacth => ({
  setCurrentUser: user => dispacth(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
