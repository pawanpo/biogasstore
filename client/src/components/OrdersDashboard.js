import React, {useContext, useRef, useEffect, useState} from 'react'
import {useParams,Link, useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Select from "react-select";
import {ExportCSV} from './ExportCSV';
import NavBar from './nav';

import {UserContex} from '../App'

const OrdersDashboard = ()=>{


  const history = useHistory()
  const {state, dispatch}= useContext(UserContex)

  const  [data, setData]= useState([])
  const  [salesData, setSalesData]= useState([])
  const  [creditData, setCreditData]= useState([])
  
  const [search,setSearch] = useState("")

  const [addSales,setAddSales]= useState(false)
  const [addCredit,setAddCredit]= useState(false)
  const[show,setShow] = useState(false)

  const[name,setName]= useState("")
  const[stockName,setStockName]= useState([])
  const[Sumsales,setSumSales]= useState([])
  const[quantity,setQuantity]= useState()
  

  const [options,setOptions] = useState({});
  const fileName = 'Bill'


    
  const {customerid} =useParams()


  useEffect(  ()=>{

    fetch(`/getSales`,{
      headers:{
          Authorization: "Bearer " +localStorage.getItem("jwt")
          
      }
  }).then(res=>res.json())
  .then(result=>{

      setSalesData(result.sales)
      setShow(true);
      
  })


  fetch(`/RevinewSummary`,{
    headers:{
        Authorization: "Bearer " +localStorage.getItem("jwt")
        
    }
}).then(res=>res.json())
.then(result=>{

    setSumSales(result.SalesSum[0].TotalSalesAmount)
    
})

   

    fetch(`/allOrders`,{
      headers:{
          Authorization: "Bearer " +localStorage.getItem("jwt")
          
      }
  }).then(res=>res.json())
  .then(result=>{

    setData(result.orders)

  })






  },[])


  const postSales = ()=>{

    fetch('/addSales',{

      method:"post",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        id:stockName.value,
        name:stockName.label,
        quantity:quantity,
        amount:quantity*stockName.rate,
        
      })
      
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        console.log("Error")
      }
    

      else{

        //console.log(data.sold)
          // setSalesData(data.sold)  

          window.location.reload(false);


      }
    })
    .catch(err=>{
      console.log(err)
    })

  }
  


  




  const fetchPost=(query)=>{


    setSearch(query)

    fetch('/search-sales',{

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
        
        
        setSalesData(results.sale)
      })


  }

  
    


return(

    <div>


 <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

 <div  className="flex h-screen bg-white">

 <div className=" "></div>

        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
  






        <div className="flex-1 flex flex-col overflow-hidden ">

            <NavBar/>



            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
  <div className="container mx-auto px-6 py-8">
    <h3 className="text-gray-400 text-3xl font-medium">Sales</h3>


<div className="flex flex-row ...">


<div class="shadow-lg rounded-xl bg-gray-200 w-full md:w-64 p-6 bg-white dark:bg-gray-500 relative overflow-hidden">
   
    <div class="flex items-center my-4 text-blue-500 rounded justify-between">
        <span class="rounded-lg p-2 bg-white">


        <svg class="h-8 w-8 text-green-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="7" y="9" width="14" height="10" rx="2" />  <circle cx="14" cy="14" r="2" />  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" /></svg>
</span>
        <div class="flex flex-col w-full ml-2 items-start justify-evenly">
        <p class="text-black text-xl">
        Nu. {Sumsales}
    </p>
            <p class="text-black text-lg">
                Total Sales
            </p>
            <p class="text-gray-700 text-sm">
            </p>
        </div>
    </div>
{/*    
    <div class="mt-4">
        <button type="button" class="py-2 px-4  bg-black hover:bg-gray-400 focus:ring-gray-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md "
        
        onClick={()=>setAddStock(true)}
        >
            Add Customer +
        </button>
    </div> */}
</div>



  
</div>
    
   
    
    <br></br>








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

 
<br/>






<br/>


 
  
   




<br/>

<div>Sales</div>


<button type="button" class="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "

onClick={()=>setAddSales(true)}

>
<svg class="h-8 w-8 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
</svg>

    Add Sales
</button>

<br/>
<div className="flex ">
       
    <div className="grid  grid-cols-1 md:grid-cols-3 sm:space-x-0 md:space-x-6 space-y-4">

                    

{data.map(item=>{

  return(


        

<div class="shadow-lg rounded-2xl w-80 p-4 bg-white dark:bg-gray-800  ">
<div class="flex flex-row items-start gap-7">
  <img src={item.pic?window.location.origin+`/${item.pic}` :"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" }  class="w-28 h-28 pr-3 rounded-lg"/>
  <div class="h-28 w-full flex flex-col justify-between">
      <div>
          <p class="text-gray-800 dark:text-white text-xl font-medium">
              {item.name}
          </p>
      </div>
     
     <a href= {`tel:${item.phone}`} class="flex items-center pt-2 pb-2">
      <svg class="h-6 w-6 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>            
        <p class="text-md text-black dark:text-white ml-2">
      
      {item.phone}
  </p> </a>

      <div></div>
      <div class="rounded-lg  bg-blue-100 dark:bg-white p-1 w-full">
          <div class="flex items-center justify-between text-xs text-gray-400 dark:text-black">
              <p class="flex flex-col">
                  Address
                  <span class="text-black dark:text-indigo-500 font-bold">
                     {item.address}
                  </span>
              </p>
             
              <p class="flex flex-col">
                  Date
                  <span class="text-black dark:text-indigo-500 font-bold">
                      {item.date.substring(0, 10)}
                  </span>
              </p>
          </div>
      </div>
  </div>
</div>
<div class="flex items-center justify-between gap-4 mt-6">
  {/* <button type="button" class="w-1/2 px-4 py-2 text-base border rounded-lg text-white bg-red-500 hover:bg-red-700 "
  
 onClick={()=>{if(window.confirm('Are you sure you want to delete?')) deleteEmployee(item._id)}}

  >
      Remove
  </button>
  <button type="button" class="w-1/2 px-4 py-2 text-base border rounded-lg text-white bg-indigo-500 hover:bg-indigo-700 "
                    >
      Update
  </button> */}
</div>
</div>



       



  
)

})}
</div>


     
    </div>
 
 
   
  </div>
</main>
</div>

    </div>
  </div>  
);


  
}



export default OrdersDashboard