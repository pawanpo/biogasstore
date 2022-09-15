
import React, { useState,createContext,useContext,useEffect,useReducer } from 'react';
import {BrowserRouter,Link,Route, Switch, useHistory} from 'react-router-dom';
import {UserContex} from '../App'
import NavBar from './nav'
import Header from './Header';

const Shop = ()=>{


    const history = useHistory()
  
    const  [salesData, setSalesData]= useState([])
    const  [stockData, setStockData]= useState([])
    const  [creditData, setCreditData]= useState([])
    const  [ExpenseData, setExpenseData]= useState([])
    const  [data, setData]= useState([])
    const [search,setSearch] = useState("")

  
    const {state, dispatch}= useContext(UserContex)

  



    
  
    useEffect(  ()=>{
  
 
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
            
<>




<Header></Header>
<div class="bg-indigo-900 relative overflow-hidden h-screen">
    <img src="bgimg.jpg" class="absolute h-full w-full object-cover"/>
    <div class="inset-0 bg-black opacity-25 absolute">
    </div>
   
    <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div class="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
            <span class="font-bold uppercase text-yellow-400 animate-bounce repeat-1 duration-1000">
                ____________________
            </span>
            <h1 class=" font-bold text-6xl sm:text-7xl text-white leading-tight mt-4 ">
                Let us turn waste into green energy
                <br/>
            </h1>
            <a href="/placeorder" class="block bg-white  hover:ring-4 border-black  py-3 px-4 rounded-lg  text-lg text-gray-800 font-bold uppercase mt-10">
                Order Now
            </a>
        </div>
    </div>
</div>


{/* Features */}


<div class="pt-4 pb-6">

<h1 class="text-center font-bold text-4xl sm:text-6xl text-black leading-tight mt-4  ">Why Biogas?</h1>

<div class="sm:flex flex-wrap justify-center items-center text-center gap-8">
    <div class="transition duration-500 ease-in-out 
                       bg-white hover:bg-gray-200 transform 
                       hover:-translate-y-1 hover:scale-110 
                       rounded-lg p-4  w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" class="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            Reduce Airpollution
        </h3>
        <p class="text-md  text-gray-500 dark:text-gray-300 py-4">
        Less emission of the greenhouse gasses methane, CO2 and nitrous oxide.
        </p>
    </div>
    <div class="transition duration-500 ease-in-out 
                       bg-white hover:bg-gray-200 transform 
                       hover:-translate-y-1 hover:scale-110 
                       rounded-lg p-4  w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" class="h-6 w-6 " viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            Waste Management 
        </h3>
        <p class="text-md text-gray-500 dark:text-gray-300 py-4">
        Environmentally friendly recirculation of organic waste from industry and households.
        </p>
    </div>
    <div class="transition duration-500 ease-in-out 
                       bg-white hover:bg-gray-200 transform 
                       hover:-translate-y-1 hover:scale-110 
                       rounded-lg p-4  w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" class="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            Cost Effective
        </h3>
        <p class="text-md  text-gray-500 dark:text-gray-300 py-4">
        Biogas is a green energy source in form of electricity and heat for the local grid. Also reduces costs for artifical fertilizer.
        </p>
    </div>
</div>


</div>



<a href="tel:+97517654708">


<button class="fixed z-90 bottom-10 right-8 bg-green-600 w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-green-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"> 
<svg class="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
</button>
</a>


<footer class="px-3 py-8 bg-gray-100 dark:bg-gray-800 text-2 text-gray-500 dark:text-gray-200 transition-colors duration-200">
    <div class="flex flex-col">
        <div class="md:hidden mt-7 mx-auto w-11 h-px rounded-full">
        </div>
        <div class="mt-4 md:mt-0 flex flex-col md:flex-row">
            <nav class="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-gray-100 md:pr-5">
                <a aria-current="page" href="#" class="hover:text-gray-700 dark:hover:text-white">
                    Components
                </a>
                <a aria-current="page" href="#" class="hover:text-gray-700 dark:hover:text-white">
                    Contacts
                </a>
                <a aria-current="page" href="#" class="hover:text-gray-700 dark:hover:text-white">
                    Customization
                </a>
            </nav>
            <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full">
            </div>
            <div class="mt-4 md:mt-0 flex-1 flex items-center justify-center md:border-r border-gray-100">
                <a class="hover:text-primary-gray-20" href="">
                    <span class="sr-only">
                        View on 
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200" viewBox="0 0 1792 1792">
                        <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                        </path>
                    </svg>
                </a>
                <a class="ml-4 hover:text-primary-gray-20" href="#">
                    <span class="sr-only">
                        Settings
                    </span>
                    <svg width="30" height="30" fill="currentColor" class="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M960 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm768 512q0-52-38-90t-90-38-90 38-38 90q0 53 37.5 90.5t90.5 37.5 90.5-37.5 37.5-90.5zm0-1024q0-52-38-90t-90-38-90 38-38 90q0 53 37.5 90.5t90.5 37.5 90.5-37.5 37.5-90.5zm-384 421v185q0 10-7 19.5t-16 10.5l-155 24q-11 35-32 76 34 48 90 115 7 11 7 20 0 12-7 19-23 30-82.5 89.5t-78.5 59.5q-11 0-21-7l-115-90q-37 19-77 31-11 108-23 155-7 24-30 24h-186q-11 0-20-7.5t-10-17.5l-23-153q-34-10-75-31l-118 89q-7 7-20 7-11 0-21-8-144-133-144-160 0-9 7-19 10-14 41-53t47-61q-23-44-35-82l-152-24q-10-1-17-9.5t-7-19.5v-185q0-10 7-19.5t16-10.5l155-24q11-35 32-76-34-48-90-115-7-11-7-20 0-12 7-20 22-30 82-89t79-59q11 0 21 7l115 90q34-18 77-32 11-108 23-154 7-24 30-24h186q11 0 20 7.5t10 17.5l23 153q34 10 75 31l118-89q8-7 20-7 11 0 21 8 144 133 144 160 0 8-7 19-12 16-42 54t-45 60q23 48 34 82l152 23q10 2 17 10.5t7 19.5zm640 533v140q0 16-149 31-12 27-30 52 51 113 51 138 0 4-4 7-122 71-124 71-8 0-46-47t-52-68q-20 2-30 2t-30-2q-14 21-52 68t-46 47q-2 0-124-71-4-3-4-7 0-25 51-138-18-25-30-52-149-15-149-31v-140q0-16 149-31 13-29 30-52-51-113-51-138 0-4 4-7 4-2 35-20t59-34 30-16q8 0 46 46.5t52 67.5q20-2 30-2t30 2q51-71 92-112l6-2q4 0 124 70 4 3 4 7 0 25-51 138 17 23 30 52 149 15 149 31zm0-1024v140q0 16-149 31-12 27-30 52 51 113 51 138 0 4-4 7-122 71-124 71-8 0-46-47t-52-68q-20 2-30 2t-30-2q-14 21-52 68t-46 47q-2 0-124-71-4-3-4-7 0-25 51-138-18-25-30-52-149-15-149-31v-140q0-16 149-31 13-29 30-52-51-113-51-138 0-4 4-7 4-2 35-20t59-34 30-16q8 0 46 46.5t52 67.5q20-2 30-2t30 2q51-71 92-112l6-2q4 0 124 70 4 3 4 7 0 25-51 138 17 23 30 52 149 15 149 31z">
                        </path>
                    </svg>
                </a>
            </div>
            <div class="md:hidden mt-4 mx-auto w-11 h-px rounded-full ">
            </div>
            <div class="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
                <span class="">
                    © 2022
                </span>
                <span class="mt-7 md:mt-1">
                    Created by :
                    <a class=" hover:text-primary-gray-20" href="https://www.linkedin.com/in/crabiller/">
                        Bhutan Biogas Store
                    </a>
                </span>
            </div>
        </div>
    </div>
</footer>



</>
        
    )
}


export default Shop








{/* <main class="bg-white dark:bg-gray-800 h-screen overflow-hidden relative">
    <div class="flex items-start justify-between">
       
        <div class="flex flex-col w-full ">

            

            <Header></Header>

     */}


            {/* <div class=" h-50 sm:h-96  w-full   bg-cover bg-center bg-no-repeat" style={{ 
      backgroundImage: `url("/bgimg.jpg")` 
    }}>

                <div class=" mx-8 sm:mx-20 my-24 sm:my-40 ">

            <div className="w-full  object-center  h-10 p-3 bg-gray-100 border-gray-50 rounded-full  outline-none  border-none flex focus:outline-none justify-between items-center relative">
 <input type="text" name="search" id="search" placeholder="Search" 
        className=" w-full bg-gray-100 border-none rounded-full    focus:outline-none focus:border-white active:outline-none"
        
         value= {search} onChange={(e)=>setSearch(e.target.value) }

        />
 <button type="submit" className="ml-1 outline-none border-none focus:border-none  active:outline-none">
   <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        viewBox="0 0 24 24" className="w-6 h-6">
     <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
   </svg>
 </button>
</div>
            </div>
            </div>
 */}

{/* 

<div class=" h-50 sm:h-96  w-full   bg-cover bg-center bg-no-repeat" style={{ 
      backgroundImage: `url("/bgimg.jpg")` 
    }}>

    

</div>

















        </div>
    </div>
</main> */}