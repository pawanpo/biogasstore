import React, {useContext, useRef, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import {UserContex} from '../App'

import NavBar from './nav'
import Header from './Header'


const Products = ()=>{


  const history = useHistory()
  const {state, dispatch}= useContext(UserContex)

  const  [data, setData]= useState([])

  const [search,setSearch] = useState("")

  const [addStock,setAddStock]= useState(false)
  const [editStock,setEditStock]= useState(false)

  const[name,setName]= useState("")
  const[nameEdit,setNameEdit]= useState("")
  const[idEdit,setidEdit]= useState("")
  const[quantity,setQuantity]= useState()
  const[quantityEdit,setQuantityEdit]= useState()
  const[rate,setRate]= useState()
  const[rateEdit,setRateEdit]= useState()
    

//     const [startDate, setStartDate] = useState(new Date());


//   const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"];

// var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const d = new Date();




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
      })


  }

  const singleStock = (Itemid)=>{

      console.log(Itemid)
    fetch('/getSingleStock',{
      method:"post",
      headers:{
        Authorization: "Bearer " +localStorage.getItem("jwt"),
        "Content-Type":"application/json"

      },
      body:JSON.stringify({
        id:Itemid
      })
  }).then(res=>res.json())
  .then(result=>{


    // setDataEdit(result.stock)
    console.log(result)
    setidEdit(result.stock._id)
    setNameEdit(result.stock.name)
    setQuantityEdit(result.stock.quantity)
    setRateEdit(result.stock.rate)
            
  })

  }
    


return(
<main class="bg-white dark:bg-gray-800 h-screen overflow-auto relative">
    <div class="flex items-start justify-between">
       
        <div class="flex flex-col w-full ">

            

            <Header></Header>

     


         <div class=" h-50 sm:h-96  w-full   bg-cover bg-center bg-no-repeat" style={{ 
      backgroundImage: `url("/bgimg.jpg")` 
    }}>

                <div class=" mx-8 sm:mx-20 my-24 sm:my-40 ">

            <div className="w-full  object-center  h-10 p-3 bg-gray-100 border-gray-50 rounded-full  outline-none  border-none flex focus:outline-none justify-between items-center relative">
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
            </div>
            </div>




















        </div>
     

    </div>



       
        
        <div className="grid  grid-cols-1 md:grid-cols-4 sm:space-x-0 ">



            {data.map(Item=>{

              return(

        <div class="w-80 flex justify-center pl-6 md:pl-8 items-center">
    <div class="w-full p-4">
        <div class="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
            <div class="prod-title">
                <p class="text-2xl uppercase text-gray-900 font-bold">
                    {Item.name}
                </p>
                <p class="uppercase text-sm text-gray-400">
                    The best shoes in the marketplace
                </p>
            </div>
            <div class="prod-img">
                <img src="/images/object/4.jpg" class="w-full object-cover object-center"/>
            </div>
            <div class="prod-info grid gap-10">
                <div>
                    <ul class="flex flex-row justify-center items-center">
                        <li class="mr-4 last:mr-0">
                            <span class="block p-1 border-2 border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#blue" class="block w-6 h-6 bg-blue-900 rounded-full">
                                </a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#yellow" class="block w-6 h-6 bg-yellow-500 rounded-full">
                                </a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#red" class="block w-6 h-6 bg-red-500 rounded-full">
                                </a>
                            </span>
                        </li>
                        <li class="mr-4 last:mr-0">
                            <span class="block p-1 border-2 border-white hover:border-gray-500 rounded-full transition ease-in duration-300">
                                <a href="#green" class="block w-6 h-6 bg-green-500 rounded-full">
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col md:flex-row justify-between items-center text-gray-900">
                    <p class="font-bold text-xl">
                        Nu. {Item.rate}
                    </p>
                  
                </div>
            </div>
        </div>
    </div>
</div>

              )
            })}






</div>








    









</main>
);


  
}


export default Products