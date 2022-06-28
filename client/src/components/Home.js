
import React, { useState,createContext,useContext,useEffect,useReducer } from 'react';
import {BrowserRouter,Link,Route, Switch, useHistory} from 'react-router-dom';
import {UserContex} from '../App'
import NavBar from './nav'

const Home = ()=>{


    const history = useHistory()
  
    const  [salesData, setSalesData]= useState([])
    const  [stockData, setStockData]= useState([])
    const  [creditData, setCreditData]= useState([])
    const  [ExpenseData, setExpenseData]= useState([])
    const  [data, setData]= useState([])
    const [search,setSearch] = useState("")

  
    const {state, dispatch}= useContext(UserContex)

  
    useEffect(  ()=>{
  
      fetch(`/RevinewSummary`,{
        headers:{
            Authorization: "Bearer " +localStorage.getItem("jwt")
            
        }
    }).then(res=>res.json())
    .then(result=>{

        if(result.CreditSum[0]) setCreditData(result.CreditSum[0].TotalCreditAmount)
    

        if(result.StockSum[0]) setStockData(result.StockSum[0].TotalStockAmount)

        

        if(result.SalesSum[0]) setSalesData(result.SalesSum[0].TotalSalesAmount)

        

        if(result.ExpenseSum[0]) setExpenseData(result.ExpenseSum[0].TotalExpenseAmount)
        
    })
  
  
     
    fetch('/getStock',{
        headers:{
            Authorization: "Bearer " +localStorage.getItem("jwt")
            
        }
    }).then(res=>res.json())
    .then(result=>{
        setData(result.stocks)
    
        
    })
  
  
  
  
    },[])


    const fetchPost=(query)=>{


        setSearch(query)
    
        fetch('/search-stock',{
    
          method:"post",
          headers:{

            Authorization: "Bearer " +localStorage.getItem("jwt"),
    
            "Content-Type":"application/json"
    
          },
          body:JSON.stringify({
            query
          })
    
        }).then(res=> res.json())
          .then(results=>{
            
            setData(results.stock)
            console.log(results)

          })
    
    
      }
  



    return(
            
<main class="bg-white dark:bg-gray-800 h-screen overflow-hidden relative">
    <div class="flex items-start justify-between">
       
        <div class="flex flex-col w-full md:space-y-4">

            
            <NavBar> </NavBar>


    
            <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
                <h1 class="text-4xl font-semibold text-black">
                    Home!!
                </h1>
                <h2 class="text-md text-gray-400">
                    Welcome, Happy Managing!
                </h2>
                <div class="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                    <div class="w-full md:w-6/12">
                        <div class="shadow-lg w-full bg-white dark:bg-gray-700 relative overflow-hidden">
                            <a href="#" class="w-full h-full block">
                                <div class="flex items-center justify-between px-4 py-6 space-x-4">
                                    <div class="flex items-center">
                                        <span class="rounded-full relative p-5 bg-yellow-100">
                                            <svg width="40" fill="currentColor" height="40" class="text-yellow-500 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
                                                </path>
                                            </svg>
                                        </span>
                                        <p class="text-sm text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                                            Total Sales 
                                        </p>
                                    </div>
                                    <div class="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                                        Nu. {salesData}
                                       
                                    </div>
                                </div>
                                <div class="w-full h-3 bg-gray-100">
                                    <div class="w-2/5 h-full text-center text-xs text-white bg-green-400">
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="flex items-center w-full md:w-1/2 space-x-4">
                        <div class="w-1/2">
                            <div class="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                                <p class="text-2xl text-black dark:text-white font-bold">
                               Nu. {creditData?  creditData : <></> }   
                                </p>
                                <p class="text-gray-400 text-sm">
                                   Total Credit Amount
                                </p>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <div class="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                                <p class="text-2xl text-black dark:text-white font-bold">
                                  Nu  {stockData}
                                </p>
                                <p class="text-gray-400 text-sm">
                                     Total Stock Amount
                                </p>
                                <span class="rounded-full absolute p-4 bg-purple-500 top-2 right-4">
                                    <svg width="40" fill="currentColor" height="40" class="text-white h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                   
                   
                   
                   
                   
                   
                   <Link to="/inventory">
                   
                   
<div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
    <div class="flex items-center">
    <svg class="h-8 w-8 text-purple-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polygon points="12 2 2 7 12 12 22 7 12 2" />  <polyline points="2 17 12 22 22 17" />  <polyline points="2 12 12 17 22 12" /></svg>        <p class="text-md text-black dark:text-white ml-2">
            Inventory
        </p>
    </div>
    <div class="flex flex-col justify-start">
        <p class="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
            Nu. {stockData}
           
        </p>
        <div class="flex items-center text-green-500 text-sm">
        <svg class="h-8 w-8 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>

            <span>
                Add and Update Inventory
            </span>
            
        </div>
    </div>
</div>



                   </Link>
                    
                   
                   
                   
                   
                   <Link to="/expenses">
                   
                   <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
    <div class="flex items-center">
        <svg class="h-8 w-8 text-purple-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="7" y="9" width="14" height="10" rx="2" />  <circle cx="14" cy="14" r="2" />  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" /></svg>
        <p class="text-md text-black dark:text-white ml-2">
            Expenses
        </p>
    </div>
    <div class="flex flex-col justify-start">
        <p class="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
            Nu. {ExpenseData}
           
        </p>
        <div class="flex items-center text-green-500 text-sm">
        <svg class="h-8 w-8 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>

            <span>
                Add Expenses 
            </span>
            
        </div>
    </div>
</div>


                   </Link>
                    




                    <Link to="/sales"> 
                    
                    <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
    <div class="flex items-center">
    <svg class="h-8 w-8 text-purple-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M16 11h6m-3 -3v6" /></svg>
        <p class="text-md text-black dark:text-white ml-2">
            Credits
        </p>
    </div>
    <div class="flex flex-col justify-start">
        <p class="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
            Nu. {creditData}
            
        </p>
        <div class="flex items-center text-green-500 text-sm">
        <svg class="h-8 w-8 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>

            <span>
            Add Credit or Sales of customer

            </span>
            
        </div>
    </div>
</div>

                    </Link>

    
                    {/* <Link to="/singlebill">
                    <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
    <div class="flex items-center">
    <svg class="h-8 w-8 text-purple-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />  <rect x="9" y="3" width="6" height="4" rx="2" />  <line x1="9" y1="12" x2="9.01" y2="12" />  <line x1="13" y1="12" x2="15" y2="12" />  <line x1="9" y1="16" x2="9.01" y2="16" />  <line x1="13" y1="16" x2="15" y2="16" /></svg>
        <p class="text-md text-black dark:text-white ml-2">
            Single Sale
        </p>
    </div>
    <div class="flex flex-col justify-start">
        <p class="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
            Nu. {salesData}
           
        </p>
        <div class="flex items-center text-green-500 text-sm">
        <svg class="h-8 w-8 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>

            <span>
                Add Sales without customer
            </span>
            
        </div>
    </div>
</div>


                    </Link> */}
                    <Link to="/allSales">
                    <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
    <div class="flex items-center">
    <svg class="h-8 w-8 text-purple-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2" />  <rect x="9" y="3" width="6" height="4" rx="2" />  <line x1="9" y1="12" x2="9.01" y2="12" />  <line x1="13" y1="12" x2="15" y2="12" />  <line x1="9" y1="16" x2="9.01" y2="16" />  <line x1="13" y1="16" x2="15" y2="16" /></svg>
        <p class="text-md text-black dark:text-white ml-2">
            All Sales
        </p>
    </div>
    <div class="flex flex-col justify-start">
        <p class="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
            Nu. {salesData}
           
        </p>
        <div class="flex items-center text-green-500 text-sm">
        <svg class="h-8 w-8 text-green-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>

            <span>
                Add Sales without customer
            </span>
            
        </div>
    </div>
</div>


                    </Link>
            
                </div>




<br/>

<h3 class="text-2xl font-semibold text-black">
                    Stocks
                </h3>

                
                
                <div className="w-full h-10 pl-3 pr-2 bg-gray-100 border-gray-50 rounded-full  outline-none  border-none flex focus:outline-none justify-between items-center relative">
  <input type="text" name="search" id="search" placeholder="Search" 
         className=" w-full bg-gray-100 border-none rounded-full    focus:outline-none focus:border-white active:outline-none"
         value= {search} onChange={(e)=>fetchPost(e.target.value)}
         />
  <button type="submit" className="ml-1 outline-none border-none focus:border-none  active:outline-none">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
         viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </button>
</div>


<div className="flex flex-col mt-8 ">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                Name
                  </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                Price                   
                   </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider">
                  
                Qnty
                  
                  </th>
                
              </tr>
            </thead>




 <tbody className="bg-white">
            {data ? data.map(item=>{
              return(
          
              <tr data-href="/profile" key={item._id} style={{cursor:"pointer"}}>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                  
                  >
                             
                  <div className="flex items-center">
                                    
                    <div className="ml-4">
                      <div className="text-sm leading-5 font-medium text-gray-900">{item.name}
                      </div>
                    </div>
                  </div>
                </td>


                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{item.rate}</div>
                </td>
               
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">{item.quantity}</div>
                </td>             
              </tr> 


              )
            }):<></>}
           
  
             
            </tbody>

          
          </table>
        </div>
      </div>
    </div>






            </div>




















        </div>
    </div>
</main>


        
    )
}


export default Home