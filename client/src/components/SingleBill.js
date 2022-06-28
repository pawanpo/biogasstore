import React, {useContext, useRef, useEffect, useState} from 'react'
import {useParams,Link, useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Select from "react-select";
import {ExportCSV} from './ExportCSV';
import NavBar from './nav';

import {UserContex} from '../App'

const SingleSales = ()=>{


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

   

    fetch(`/getStock`,{
      headers:{
          Authorization: "Bearer " +localStorage.getItem("jwt")
          
      }
  }).then(res=>res.json())
  .then(result=>{

    const options = result.stocks.map(d => (
      
      d.quantity!=0 ?
      
      {
            
        value : d._id,
        label : d.name,
        rate: d.rate
      }
      :<> </>
    
    
      ))

      setOptions(options)
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
    <h3 className="text-gray-400 text-3xl font-medium">Single Bill</h3>


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



<div class="flex space-x-4">

  <ExportCSV   csvData={salesData} fileName={fileName} />



</div>



<br/>


 
  
    {
addSales? 
(
  <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6  relative w-auto my-6 mx-auto ">
        {/*content*/}
        <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex rounded-full items-start  p-5 ">
            
            <button
              className="p-1 ml-auto rounded-full bg-red-500 text-white text-3 "
              onClick={() => setAddSales(false)}
            >
<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
           
          <form >



            
        <div className=" overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Name</label>

                <Select 
            options={options}
            value={stockName}
            onChange={setStockName}
            />
                {/* <input type="text" 
                name="first_name"
                 id="first_name" 
                 autoComplete="given-name"
                className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={name}
                onChange={(e)=>setName(e.target.value)}  
                  /> */}
              </div>
              
         
             
          
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">quantity</label>
               <input type="number"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)} 
                ></input>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Amount</label>
               <input type="number"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={quantity*stockName.rate}
                ></input>
              </div>



          
              
            </div>
              
       
          </div>
          
          
        </div>


      </form>
          </div>
          
          <div className="flex items-center  justify-end p-6 ">
            <button
              className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease"  }}
              onClick={() => setAddSales(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => {setAddSales(false); postSales() }}
            >
              Add Sales
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
)


:null

}
    





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
      <div className="grid  grid-cols-2 md:grid-cols-6 space-x-1 space-y-1">

    
      
            { salesData? salesData.map(item=>{

              return(
                <div className="   bg-white w-full flex items-center p-2 rounded-xl shadow-md border transition duration-500 transform hover:-translate-y-1 hover:scale-111 ease-in-out">
                <div className="flex-grow p-5   ">
                  
                     <div className="font-semibold text-gray-700">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-500">
                    Amount: {item.amount}
                  </div>
                </div>
              </div>

              )

            }):<>No Sales</>


            }
            
           
   
   
   
     
          
        
      
      </div>
     
    </div>
 
 
   
  </div>
</main>
</div>

    </div>
  </div>  
);


  
}



export default SingleSales