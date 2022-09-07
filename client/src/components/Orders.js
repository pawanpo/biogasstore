import React, {useContext, useRef, useEffect, useState} from 'react'

import {Link, useHistory} from 'react-router-dom'
import {UserContex} from '../App'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setServers } from 'dns'
import Header from './Header';

const Home=()=>{
  const history = useHistory()
  const {state, dispatch}= useContext(UserContex)

  const  [data, setData]= useState([])

  const [search,setSearch] = useState("")

  const [flightService,setFlightService]= useState(false)
  const [generalService,setGeneralService]= useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [description, setDescription] = useState("")
  const [destination,setDestination] = useState("")
  const [address,setAddress] = useState("")
  const [serviceType,setserviceType] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const[url,setUrl]= useState()
  const[attachment,setAttachment]= useState()
  const[progress,setProgress]= useState(false)



  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const d = new Date();


const order=()=>{

   fetch("/addOrder",{
      method:"post",
      headers:{
          "Content-Type":"application/json",

      },
      body: JSON.stringify({
        
       
         name,
         email,
         phone,
         address,
         url,
         attachment
        
      })
      
  }).then(res=>res.json())
  .then(data=> {

    //console.log(data.flight)
     
      if(data.error){
        toast.error(data.error)      
      }
      else{

        toast.success("Ordered Successfully") 


        console.log(data)
        
          //  history.push(`/home`)
      }
  })
  .catch(err=>{
      console.log(err)
  })


  


   }


   const serviceBook=()=>{


    
    fetch("/addService",{
      method:"post",
      headers:{
          "Content-Type":"application/json",

      },
      body: JSON.stringify({
        
       
        name, phone, email,date:startDate ,address,description,serviceType
        
      })
      
  }).then(res=>res.json())
  .then(data=> {

    console.log(data.service)
     
      if(data.error){
        toast.error(data.error)      
      }
      else{

        toast.success("Delivered Successfully")      

        // console.log(data.result)
        
           history.push(`/home`)
      }
  })
  .catch(err=>{
      console.log(err)
  })

   }

   const upload=({target:{files}})=>{

   setProgress(true)
    let data = new FormData()

    for(const file of files){

   data.append('uploadfile', file)
   data.append('name',file.name)
}
       fetch("/uploadfile", {

         method:"post",
         body: data
     })
     .then(res=>res.json())
     .then(data=>{

          setUrl(data.url)
          setAttachment(data.attachment)

          setProgress(false)
          

       
     })
     .catch(err=>{
         console.log(err)
     })

}




 
  // const images = [
  //   { url: "/logo.png" },
  //   { url: "/Aer.png" },
  //   { url: "http://www.drukings.com/wp-content/uploads/2021/07/Aeroplane-08-1.png" },
    
  // ];

  




return(

 <>
 <Header></Header>



<div class="flex flex-wrap w-full overflow-auto ">
    <div class="flex flex-col w-full md:w-1/2">
       
        <div class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p class="text-3xl text-center">
                Place Order.
            </p>
            <form class="flex flex-col pt-3 md:pt-8">
                <div class="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <svg class="h-6 w-6 text-gray-500"  viewBox="0 0 24 24"  fill="currentColor"   stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                        </span>
                        <input type="text" id="design-login-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"
                        
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                        </div>
                    </div>
                <div class="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <svg class="h-6 w-6 text-gray-500"  width="15" height="15" fill="none"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"  stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                        </span>
                        <input type="number" id="design-login-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Phone"
                        
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        
                        />
                        </div>
                    </div>
                <div class="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                </path>
                            </svg>
                        </span>
                        <input type="text" id="design-login-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"
                        
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        </div>
                    </div>
                    <div class="flex flex-col pt-4 mb-12">
                        <div class="flex relative ">
                            <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg class="h-6 w-6 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>

                            </span>
                            <input type="text" id="design-login-password" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Address"
                            
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}

                            />
                            </div>
                        </div>
                    
                    
                    <div class="flex flex-col  mb-12">
                    <label className="flex flex-col items-center  bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-300 hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        {progress?         <span className=" text-base leading-normal"> Uploading...</span>:   <span className=" text-base leading-normal"> Upload Supply Order</span>
 }
        <input type='file' className="hidden" 
           onChange={upload}
        />
        
    </label>



    {progress?
        <svg class="h-12 w-12 text-blue-500 animate-spin"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />  <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" stroke-dasharray=".001 4.13" /></svg>
    :<></>}

{url?<img className=" pt-4 pb-2  h-24 w-24 flex items-center " src={window.location.origin+`/${attachment}`} ></img>:null
}
    
                        </div>


             


                        <button type="submit" class="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
                        
                        onClick={order}
                        >
                            <span class="w-full">
                                Order Now
                            </span>
                        </button>
                    </form>
                    <ToastContainer/>         

                </div>
            </div>
            <div class="w-1/2 shadow-2xl">
                <img class="hidden  w-full h-screen md:block" src="logo.png"/>
            </div>
        </div>


 
 
 
 </>


);


}


export default Home