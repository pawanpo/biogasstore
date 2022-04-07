import React, { useState,createContext,useContext,useEffect,useReducer } from 'react';
import {BrowserRouter,Link,Route, Switch, useHistory} from 'react-router-dom';
import {UserContex} from '../App'


const NavBar = ()=>{

    const {state, dispatch}= useContext(UserContex)


    const history = useHistory()


    const Logout = ()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/login')
    }

    return(

        <div>
        <nav class=" bg-gray-100 shadow ">
            <div class="max-w-7xl mx-auto px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="w-full justify-between flex items-center">
                        <a class="flex-shrink-0" href="/dashboard">
                        <svg class="h-8 w-8 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                        </a>
                        
                    </div>
                    <div class="block">
                        
                    </div>
                    <div class="-mr-2 flex ">
                      
                    <button class="flex p-2 items-center rounded-full bg-white  shadow text-gray-400 hover:text-gray-700 "
                            
                            onClick={()=>{if(window.confirm('Are you sure you want to delete?')) Logout()}}                           
                    
                        >
                   <svg class="h-6 w-6 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"
                        
                        
                        />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>       
                     </button>
                  
    
                    </div>
                </div>
            </div>
           
        </nav>
    </div>
        )


}

export default NavBar