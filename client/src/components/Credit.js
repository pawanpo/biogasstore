import React, {useContext, useRef, useEffect, useState} from 'react'
import {useParams,Link, useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Select from "react-select";
import {ExportCSV} from './ExportCSV';

import NavBar from './nav';


import {UserContex} from '../App'

const Customer = ()=>{


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
  const[quantity,setQuantity]= useState()
  const[amount,setAmount]= useState()
  const[paid,setPaid]= useState()
  const[rate,setRate]= useState()

  const [options,setOptions] = useState({});
  const fileName = 'Bill'

var TotalCredit = 0
    
  const {customerid} =useParams()


  useEffect(  ()=>{

    fetch(`/customer/${customerid}`,{
      headers:{
        Authorization: "Bearer " +localStorage.getItem("jwt")
          
      }
  }).then(res=>res.json())
  .then(result=>{

      setData(result.customer)
      setSalesData(result.sales)
      setShow(true);
      
  })


    fetch(`/creditor/${customerid}`,{
      headers:{
        Authorization: "Bearer " +localStorage.getItem("jwt")
          
      }
  }).then(res=>res.json())
  .then(result=>{

      setCreditData(result.credits)
      
  })

    fetch(`/getStock`,{
      headers:{
        Authorization: "Bearer " +localStorage.getItem("jwt")
          
      }
  }).then(res=>res.json())
  .then(result=>{

    const options = result.stocks.map(d => (
      
      
      
      {

        value : d._id,
        label : d.name,
        rate: d.rate
      
      
      
    }))

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
        customer:customerid
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
  const postCredit = ()=>{

    fetch('/addCredit',{

      method:"post",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        id:stockName.value,
        item:stockName.label,
        quantity:quantity,
        price:stockName.rate,
        creditor:customerid })
      
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        console.log("Error")

      }

      else{
        
        window.location.reload(false);
    
        history.push(`customer/${data.customer._id}`)

      }
    })
    .catch(err=>{
      console.log(err)
    })

  }
  const deleteCredit = (postId)=>{

    fetch(`/deleteCredit/${postId}`,{
        method: "delete",
        headers:{
          "Content-Type":"application/json",
          Authorization: "Bearer " +localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
      window.location.reload(false);

    }).catch(err=>{
        console.log(err)
    })
}


  const updatePaid = ()=>{

    fetch('/updatePaid',{

      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")


      },
      body: JSON.stringify({
        
        id: customerid,
        paid:paid,
        TotalCredit
        
      })
      
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        console.log("Error")
      }

      else{
        window.location.reload(false);
      }
    })
   
  }





  const fetchPost=(query)=>{


    setSearch(query)

    fetch('/search-credit',{

      method:"post",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")

      },
      body:JSON.stringify({
        query
      })

    }).then(res=> res.json())
      .then(results=>{
        
        setCreditData(results.credit)
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
    <h3 className="text-gray-400 text-3xl font-medium">Customer Details</h3>


<div className="flex flex-row ...">

<div class="shadow-lg rounded-xl bg-gray-200 w-full md:w-64 p-6 bg-white dark:bg-gray-500 relative overflow-hidden">
    <p class="text-black text-xl">
        {data.name}
    </p>
    <div class="flex items-center my-4 text-blue-500 rounded justify-between">
        <span class="rounded-lg p-2 bg-white">
        <svg class="h-8 w-8 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" />  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>        </span>
        <div class="flex flex-col w-full ml-2 items-start justify-evenly">
            <p class="text-black text-lg">
            {data.phone}
            </p>
            <p class="text-gray-700 text-sm">
                {data.address}
            </p>
        </div>
    </div>

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



<div class="flex space-x-4">credits

  <ExportCSV   csvData={creditData} fileName={fileName} />



</div>



<br/>
<button type="button" class=" py-2 px-4 flex justify-center items-center  bg-green-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "

onClick={()=>setAddCredit(true)}
>
<svg class="h-8 w-8 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
</svg>

    Add Credit
</button>



<br/>

<div className="flex ">
      <div className="grid  grid-cols-2 md:grid-cols-6 space-x-1 space-y-1">

    


        { creditData?  creditData.map(item=>{


              TotalCredit += item.amount

            return(

  
              <div className="   bg-white w-full flex items-center p-2 rounded-xl shadow-md border transition duration-500 transform hover:-translate-y-1 hover:scale-111 ease-in-out">
              <div className="flex-grow p-5   ">
                
                   <div className="font-semibold text-gray-700">
                  {item.item}
                  
                </div>
            
            
                <div style={{cursor:"pointer"}} className="absolute top-1 right-1 text-red-600"
                  
                  onClick={()=>{if(window.confirm('Are you sure you want to delete?')) deleteCredit(item._id)}}
            
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            
                  ></path>  
                  </svg></div>
                <div className="text-sm text-gray-500">
                  quantity: {item.quantity}
                </div>
                <div className="text-sm text-gray-500">
                  rate : {item.price}
                </div>
            
                <div className="text-sm text-gray-500">
                  amount : {item.amount}
                </div>
            
              </div>
            </div>
            )

        }): <>Loading! </>


        }
      
    
        
          
   
   
          
        
      
      </div>

     
    </div>

<br/>
  

    <h2>Total Credit: Nu.  {TotalCredit}</h2>     

    <h2> Amount Paid : Nu. { data.paid ? data.paid : 0 }</h2>
    <h2> Payable Amount : Nu. { TotalCredit- data.paid }</h2>




    <br/>


    <div>
      
      

   

    <form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
    <div class=" relative ">
        <input type="number" id="&quot;form-subscribe-Subscribe" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Paid Amount"
      value= {paid}
      onChange = {(e)=>setPaid(e.target.value)}
        />
        </div>
        <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit"
        
        onClick={()=>{if(window.confirm('Are you it is paid?')) updatePaid()}}                           

        
        >
            Paid
        </button>
    </form>

       
        
    </div>




 
    {
addCredit? 
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
              onClick={() => setAddCredit(false)}
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
               
               {stockName !=null ?
              <>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Rate</label>

              <input type="number" 
              name="first_name"
               id="first_name" 
               autoComplete="given-name"
              className="rounded-lg w-full
              bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
              value={stockName.rate}
              onChange={(e)=>setRate(e.target.value)}  
                />
                </>:<></> 
              }
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
              onClick={() => setAddCredit(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => {setAddCredit(false); postCredit() }}
            >
              Add Credit 
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
                onChange={(e)=>setAmount(e.target.value)} 
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



export default Customer