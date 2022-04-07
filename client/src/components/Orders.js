import React, {useContext, useRef, useEffect, useState} from 'react'

import {Link, useHistory} from 'react-router-dom'
import {UserContex} from '../App'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setServers } from 'dns'


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



  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const d = new Date();


const bookFlight=()=>{

 if(url){  fetch("/addOrder",{
      method:"post",
      headers:{
          "Content-Type":"application/json",

      },
      body: JSON.stringify({
        
       
         name,
         email,
         phone,
         address:destination,
         url
        
      })
      
  }).then(res=>res.json())
  .then(data=> {

    console.log(data.flight)
     
      if(data.error){
        toast.error(data.error)      
      }
      else{

        toast.success("Delivered Successfully")      

        // console.log(data.result)
        
          //  history.push(`/home`)
      }
  })
  .catch(err=>{
      console.log(err)
  })
}

  else{

    toast.error("File Not Uploaded")

  }



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

   const uploadimg=({target:{files}})=>{

   
    let data = new FormData()

    for(const file of files){

   data.append('pdf', file)
   data.append('name',file.name)
}
       fetch("/pdf", {

         method:"post",
         body: data
     })
     .then(res=>res.json())
     .then(data=>{

          setUrl(data.path)
          

       
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

  <main class="bg-gray-50 dark:bg-gray-800 h-screen overflow-hidden relative ">
    <div class="flex items-start justify-between">
       
        <div class="flex flex-col w-full md:space-y-4">

    



{/* 
<Slider/> */}



           {/* <SimpleImageSlider
        width="100%"
        height="35%"
        images={images}
        showBullets={true}
        showNavs={true}
        slideDuration={1}
        loop={true}
        autoPlay={true}
        
      />  */}
            <ToastContainer/>

           


               
            <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
                
          
      <br/>
      <br/>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
                   
                   
                   
                   
                   
   
     


                    
                   
                   
                   
                   




                

    
                   
            
                </div>




<br/>

{/* <h3 class="text-2xl font-semibold text-black">
                    Products
                </h3>

                
                
                <div className="w-full h-10 pl-3 pr-2 bg-gray-100 border-gray-50 rounded-full  outline-none  border-none flex focus:outline-none justify-between items-center relative">
  <input type="text" name="search" id="search" placeholder="Search" 
         className=" w-full bg-gray-100 border-none rounded-full    focus:outline-none focus:border-white active:outline-none"
         
         />
  <button type="submit" className="ml-1 outline-none border-none focus:border-none  active:outline-none">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
         viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </button>
</div> */}








            </div>




















        </div>
    </div>


    
  <>
    <div
      className="justify-cente rounded-lg w-auto border-rounded shadow  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative border-rounded  rounded-lg  my-6 mx-auto ">
        {/*content*/}
          {/*header*/}
         
          {/*body*/}
           
          

          


          <form class="flex w-full max-w-sm space-x-3 content-center items-center ">
            
    <div class="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
        <div class="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
            Book a Flight
        </div>
       
       
       
        <div className="py-1">
          <span className="px-1 text-sm text-gray-600">Name</span>
            <input  type="text" className="space-y-6 text-md block px-3 py-2 rounded-lg w-full
          bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-500 focus:bg-white focus:border-indigo-300  focus:outline-none" 
          
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            >

            </input>
          </div>
        <div className="py-1">
          <span className="px-1 text-sm text-gray-600">Email</span>
            <input  type="text" className="space-y-6 text-md block px-3 py-2 rounded-lg w-full
          bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-500 focus:bg-white focus:border-indigo-300  focus:outline-none" 
          
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            >

            </input>
          </div>
        <div className="py-1">
          <span className="px-1 text-sm text-gray-600">Phone</span>
            <input  type="text" className="space-y-6 text-md block px-3 py-2 rounded-lg w-full
          bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-500 focus:bg-white focus:border-indigo-300  focus:outline-none" 
          
            placeholder="Phone No."
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            >

            </input>
          </div>
        <div className="py-1">
          <span className="px-1 text-sm text-gray-600">Destination</span>
            <input  type="text" className="space-y-6 text-md block px-3 py-2 rounded-lg w-full
          bg-white border-2 border-gray-300 placeholder-gray-400  focus:placeholder-gray-500 focus:bg-white focus:border-indigo-300  focus:outline-none" 
          
            placeholder="Destination"
            value={destination}
            onChange={(e)=>setDestination(e.target.value)}
            >

            </input>
          </div>

          <br/>



            <div className="col-span-6 sm:col-span-4">
    <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-300 hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal"> CID / Student ID PDF file </span>
        <input type='file' className="hidden"  required
        onChange={uploadimg}
        />
        
    </label>

{url?<img className="  h-40 w-40 flex items-center  p-4" src={url} ></img>:null
}
    


</div>

<br/>
     
      
         
          <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Date</label>
                <DatePicker className="rounded-lg w-full
          bg-white border-2 border-gray-300 placeholder-gray-400 focus:placeholder-gray-200 focus:bg-white focus:border-indigo-300  focus:outline-none" selected={startDate} onChange={date => setStartDate(date)} />

              </div>

              <br/>
                
{/*                
                    <div class="col-span-2 text-right">
                        <button type="submit" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        
                        onClick={()=>{setFlightService(false); bookFlight()}}
                        >
                            Send
                        </button>
                     
                    </div>
 */}



                </div>
        </form> 
         
        <div className="flex items-center  justify-end p-6 rounded-b">
            <button
              className="bg-red-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease"  }}
              onClick={() =>setFlightService(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => {setFlightService(false); bookFlight()}}
            >
              Book 
            </button>

            
          </div>







          
          
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>

    
    
    
    
   
</main>



);


}


export default Home