import React, {useContext, useRef, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import {UserContex} from '../App'

import NavBar from './nav'

const Inventory = ()=>{


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


  const postStock = ()=>{

    fetch('/addStock',{

      method:"post",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        name:name,
        quantity:quantity,
        rate:rate
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
  const postStockUpdate = ()=>{

    fetch('/updateStock',{

      method:"put",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " +localStorage.getItem("jwt")

      },
      body: JSON.stringify({
        id:idEdit,
        name:nameEdit,
        quantity:quantityEdit,
        rate:rateEdit
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

    <div>


 <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

 <div  className="flex h-screen bg-white">

 <div className=" "></div>

        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />
  






        <div className="flex-1 flex flex-col overflow-hidden ">

            
          <NavBar/>


            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
  <div className="container mx-auto px-6 py-8">
    <h3 className="text-gray-400 text-3xl font-medium">Inventory</h3>


<div className="flex flex-row ...">


<div class="shadow-lg rounded-xl bg-gray-200 w-full md:w-64 p-6 bg-white dark:bg-gray-500 relative overflow-hidden">
    <p class="text-black text-xl">
        Items
    </p>
    <div class="flex items-center my-4 text-blue-500 rounded justify-between">
        <span class="rounded-lg p-2 bg-white">
        <svg class="h-8 w-8 text-gray-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />  <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />  <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />  <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />  <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />  <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />  <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />  <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" /></svg>        </span>
        <div class="flex flex-col w-full ml-2 items-start justify-evenly">
            <p class="text-black text-lg">
                {data.length ? data.length:0}
            </p>
            <p class="text-gray-700 text-sm">
                Total Item Types
            </p>
        </div>
    </div>
   
    <div class="mt-4">
        <button type="button" class="py-2 px-4  bg-black hover:bg-gray-400 focus:ring-gray-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md "
        
        onClick={()=>setAddStock(true)}
        >
            Add Stocks +
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
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">quantity</label>
               <input type="number"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                
                value={quantity}
                onChange={(e)=>setQuantity(e.target.value)} 
                ></input>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Rate</label>
               <input type="number"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={rate}
                onChange={(e)=>setRate(e.target.value)} 
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
              Add Stock 
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
editStock? 
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
              onClick={() => setEditStock(false)}
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
                value={nameEdit}
                onChange={(e)=>setNameEdit(e.target.value)}  
                  />
              </div>
              
         
             
          
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">quantity</label>
               <input type="number"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={quantityEdit}
                onChange={(e)=>setQuantityEdit(e.target.value)} 
                ></input>
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Rate</label>
               <input type="number"  className="rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" 
                value={rateEdit}
                onChange={(e)=>setRateEdit(e.target.value)} 
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
              onClick={() => setEditStock(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => {setEditStock(false); postStockUpdate()}}
            >
              Update Stock 
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

 


    <div className="mt-8">
    </div>
    <div className="flex flex-col mt-8">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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
            {data.map(item=>{
              return(

                
            
              <tr data-href="/profile" key={item._id} style={{cursor:"pointer"}}>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                  
                  onClick={()=>{setEditStock(true);singleStock(item._id)}}
                  >
                             
                  <div className="flex items-center">
                                    
                    <div className="ml-4">
                      <div className="text-sm leading-5 font-medium text-gray-900">{item.name}
                      </div>
                    </div>
                  </div>
                </td>


                
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                  onClick={()=>{setEditStock(true);singleStock(item._id)}}

                >
                  <div className="text-sm leading-5 text-gray-900">{item.rate}</div>
                </td>
               
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
               onClick={()=>{setEditStock(true);singleStock(item._id)}}

                >
                  <div className="text-sm leading-5 text-gray-900">{item.quantity}</div>
                </td>             
              </tr> 


              )
            })}
           
  
             
            </tbody>

          
          </table>
        </div>
      </div>
    </div>
  </div>
</main>
</div>

    </div>
  </div>  
);


  
}


export default Inventory