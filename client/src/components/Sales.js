import React, {useContext, useRef, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import {UserContex} from '../App'

import NavBar from './nav'

const Sales = ()=>{


  const history = useHistory()
  const {state, dispatch}= useContext(UserContex)

  const  [data, setData]= useState([])

  const [search,setSearch] = useState("")

  const [addStock,setAddStock]= useState(false)
  const[id,setId] = useState("")  
  const[name,setName]= useState("")
  const[phone,setPhone]= useState("")
  const[address,setAddress]= useState("")
  const[email,setEmail]= useState("")
    



  useEffect(  ()=>{

    fetch('/getCustomer',{
      headers:{
          Authorization: "Bearer " +localStorage.getItem("jwt")
          
      }
  }).then(res=>res.json())
  .then(result=>{
      setData(result.customers)
      
  })

  },[])


  const postStock = ()=>{

    fetch('/addCustomer',{

      method:"post",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        name:name,
        phone:phone,
        email:email,
        address:address
      })
      
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        console.log("Error")
      }

      else{
        
            history.push(`singlerecord/${data.customer._id}`)

      }
    })
    .catch(err=>{
      console.log(err)
    })

  }


  const postStockUpdate = ()=>{

    fetch('/updateStock',{

      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        
        name:name,
        
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
    .catch(err=>{
      console.log(err)
    })
    history.push('/inventory')

  }





  const fetchPost=(query)=>{


    setSearch(query)

    fetch('/search-customer',{

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
    <h3 className="text-gray-400 text-3xl font-medium">Customer</h3>


<div className="flex flex-row ...">


<div class="shadow-lg rounded-xl bg-gray-200 w-full md:w-64 p-6 bg-white dark:bg-gray-500 relative overflow-hidden">
    <p class="text-black text-xl">
        Customers
    </p>
    <div class="flex items-center my-4 text-blue-500 rounded justify-between">
        <span class="rounded-lg p-2 bg-white">
        <svg class="h-8 w-8 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" />  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>        </span>
        <div class="flex flex-col w-full ml-2 items-start justify-evenly">
            <p class="text-black text-lg">
                {data.length}
            </p>
            <p class="text-gray-700 text-sm">
                Total Customers
            </p>
        </div>
    </div>
   
    <div class="mt-4">
        <button type="button" class="py-2 px-4  bg-black hover:bg-gray-400 focus:ring-gray-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md "
        
        onClick={()=>setAddStock(true)}
        >
            Add Customer +
        </button>
    </div>
</div>



  
</div>
    
   
    
    <br></br>

    {
addStock? 
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
              onClick={() => setAddStock(false)}
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
                <input type="text" 
                name="first_name"
                 id="first_name" 
                 autoComplete="given-name"
                className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={name}
                onChange={(e)=>setName(e.target.value)}  
                  />
              </div>
              
          
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Phone</label>
               <input type="number"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                
                value={phone}
                onChange={(e)=>setPhone(e.target.value)} 
                ></input>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email</label>
               <input type="text"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                ></input>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Address</label>
               <input type="text"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={address}
                onChange={(e)=>setAddress(e.target.value)} 
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
              onClick={() => setAddStock(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => {setAddStock(false);postStock()}}
            >
              Add Customer 
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

 
<div class="container flex flex-col mx-auto w-full items-center justify-center  ">
    <ul class="flex flex-col ">
       
       { data.map(item=>{
                      
                      
                      console.log(item._id);


            return(


                <Link to={`/singlerecord/${item._id}`}>
                <li class="border-gray-400 flex flex-row mb-2">
                <div class="shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
                   
                    <div class="flex-1 pl-1 md:mr-16">
                        <div class="font-medium dark:text-white">
                            {item.name}
                        </div>
                        <div class="text-gray-600 dark:text-gray-200 text-sm">
                            {item.address}
                        </div>
                    </div>
                    <div class="flex md:space-x-8 space-x-6 w-14 h-10 justify-center items-center mr-4">
                            {item.phone}                     
                    </div>
                                   
                </div>
            </li>
                </Link>
                
         
            )

       })
        


       }

       
       
    </ul>
</div>

   
  </div>
</main>
</div>

    </div>
  </div>  
);


  
}


export default Sales