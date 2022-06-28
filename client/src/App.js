

import React, { useState,createContext,useContext,useEffect,useReducer } from 'react';
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import Inventory from './components/Inventory';
import Credit from './components/Credit';
import Sales from './components/Sales';
import AllSales from './components/AllSales';
import Customer from './components/Customer';
import Expense from './components/Expense';
import Orders from './components/Orders'
import SingleSales from './components/SingleBill';
import {reducer,initialState} from './reducers/userReducer'



export const UserContex = createContext()

const Routing = ()=>{

  
  const {state, dispatch} = useContext(UserContex)
  const history = useHistory()

  useEffect(()=>{

    const user = JSON.parse( localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user})
     
    }else{

      if(history.location.pathname.startsWith('/order')) { history.push('/order')
    }
    else{
      history.push('/login')

    }
    }

  },[])

  return(

    <Switch>
     
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/dashboard'>
          <Home />
        </Route>
        <Route path='/inventory'>
          <Inventory />
        </Route>
        <Route path='/credit'>
          <Credit />
        </Route>
        <Route path='/sales'>
          <Sales />
        </Route>
        <Route path='/orders'>
          <Orders />
        </Route>
        <Route path='/allSales'>
          <AllSales />
        </Route>
        <Route path='/singlebill'>
          <SingleSales />
        </Route>
        <Route path='/expenses'>
          <Expense />
        </Route>
        <Route path='/singlerecord/:customerid'>
          <Customer />
        </Route>

        

    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer,initialState)

  return (


    <UserContex.Provider value={{state,dispatch}}>

        <BrowserRouter>
        
          <Route exact path="/">
            <Login />
          </Route>
         
          
        <Routing/>

        </BrowserRouter>
    </UserContex.Provider>

  );
}

export default App;
