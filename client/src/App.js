

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
import OrderPage from './components/Orders'
import {reducer,initialState} from './reducers/userReducer'
import Shop from './components/Shop';
import Products from './components/Products';
import OrdersDashboard from './components/OrdersDashboard';



export const UserContex = createContext()

const Routing = ()=>{

  
  const {state, dispatch} = useContext(UserContex)
  const history = useHistory()

  useEffect(()=>{

    const user = JSON.parse( localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER",payload:user})
     
    }else{

   
      if(history.location.pathname.startsWith('/login')) { history.push('/login') }
      else 
      if(history.location.pathname.startsWith('/products')) { history.push('/products') }
      else if(history.location.pathname.startsWith('/placeorder')) { history.push('/placeorder') }

    else{
      history.push('/home')

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
        {/* <Route path='/order'>
          <Orders />
        </Route> */}
        <Route path='/allSales'>
          <AllSales />
        </Route>
        <Route path='/expenses'>
          <Expense />
        </Route>
        <Route path='/ordersdashboard'>
          <OrdersDashboard />
        </Route>
        <Route path='/singlerecord/:customerid'>
          <Customer />
        </Route>

        {/* <Route exact path="/products">
            <Products />
          </Route>
         
          <Route exact path="/placeorder">
            <OrderPage />
          </Route> */}
         

    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer,initialState)

  return (


    <UserContex.Provider value={{state,dispatch}}>

        <BrowserRouter>
        
          <Route exact path="/home">
            <Shop />
          </Route>
         
        
          <Route exact path="/products">
            <Products />
          </Route>
         
          <Route exact path="/placeorder">
            <OrderPage />
          </Route>
         
          
        <Routing/>

        </BrowserRouter>
    </UserContex.Provider>

  );
}

export default App;
