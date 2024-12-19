import React from "react";
import Layouts from "./layouts/Layouts";
import Adminlayouts from "./layouts/Adminlayouts";
import { Home, Collection, Products, Checkoutpage,Adminpage,Adminsummarypage, Pagenotfound} from "./pages"
import { ScrollToTop} from "./components";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState,useEffect  } from "react";
import supabase from "./config/supabaseClient";

function App() {
  const [userData, setUserData] = useState(null)
  const [RealData, setRealData] = useState(null)
  const [fetchError, setFetchError] = useState( null)
  const[adminData , setadminData] = useState(null)
  const[load , setLoad] = useState(true)
  useEffect(()=>{
    const  fetchRealData  = async () =>
    {
        const {data, error} = await supabase 
        .from('brandname')
        .select('*')

        if (error) {
            setFetchError('Could not Connect to database')
            setRealData(null)
        }
        if(data)
        {  
          setRealData(data)
           setFetchError(null)
      }
      }
      fetchRealData()
},[])

  const collectionData ={
    "categories":[
      {
        categorie:"summer"
    },
    {
      categorie:"spring"
  },
  {
    categorie:"fall"
},
{
  categorie:"winter"
},
  ]}

  const navlinks = collectionData.categories

  function handleAddCart(productQun,Productid,discountSum,placeProduct)
  { 
  if(productQun > 0)
  {
    let validate = userData.findIndex(todo =>{
    return todo.id === Productid
     })
     const Product = RealData && RealData.find((item)=>{ return item.id === Productid})
  if(validate === -1)
  {
    if(placeProduct===true)
    {
      const newTask={...Product,"quantity":productQun,"discountPrice":discountSum||0}
      setUserData([...userData,newTask])
    }
    
  }
   else{
  setUserData(userData.map((task)=>{ return  task.id === Productid ?{...task, quantity:productQun} :task }))
   }
}

// remove shopping cart item if user reduces it to zero
if(productQun === 0 && Productid)
{
  setUserData(userData.filter((task)=>{return task.id !== Productid}))
}
}

useEffect(()=>{
if(userData)
{
localStorage.setItem('userData',JSON.stringify(userData))
}
},[userData])

useEffect(()=>{
  let localdata = JSON.parse(localStorage.getItem("userData"))
  if(localdata)
  {
   setUserData(JSON.parse(localStorage.getItem("userData")))
  }
  else{
    localStorage.setItem('userData',JSON.stringify([]))
    setUserData([])
  }
},[])

const handleCheckout = async  (e) =>{
 const name = e.name
 const email = e.email
 const phone = e.phone
 const address = e.address
 const city = e.city
 const country = e.country
 const userdata = [...e.userData]

 const { data , error} =  await supabase
 
   .from('brandname_orders')
   .insert([{name , email, phone, address, city,  country, userdata}])
   .select()

   if(error)
   {
    console.log(error)
   }
   if(data)
   {
    console.log(data)
    setUserData([])
   }
 
}

useEffect(()=>{
  const  fetchAdminData  = async () =>
  {
      const {data, error} = await supabase 
      .from('brandname_orders')
      .select('*')

      if (error) {
          setFetchError('Could not Connect to database')
          setadminData(null)
      }
      if(data)
      {  
        setadminData(data) 
         setFetchError(null)
    }
    }
    fetchAdminData()
},[])

const handleLoad = () =>{
  setLoad(false)

}

  return (
<div className="App" >

<BrowserRouter>
<ScrollToTop>
 <Routes>
 <Route path="/" element={<Layouts userData={userData} handleAddCart={handleAddCart} navlinks={navlinks} load={load} />}>
 <Route index element={<Home collectionData={collectionData} RealData={RealData} handleLoad={handleLoad} />}></Route>
 <Route path="/collection/:id" element={<Collection RealData={RealData} handleLoad={handleLoad} />}></Route>
 <Route path="/products/:coll/:ids" element={<Products handleAddCart={handleAddCart}
  userData={userData} RealData={RealData} handleLoad={handleLoad} />}></Route>
 </Route>
 
 <Route path="/" element={<Adminlayouts adminData={adminData} />}>
 <Route path="/admin" element={<Adminpage adminData={adminData}/>} ></Route>
 <Route path="/admin/:orderid" element={<Adminsummarypage adminData={adminData}/>} ></Route>
 </Route>

 <Route path="/checkout" element={<Checkoutpage  userData={userData} handleCheckout={handleCheckout}/>} />
 <Route path="*"  element={<Pagenotfound />}   />
 </Routes>
 </ScrollToTop>

 </BrowserRouter> 

</div>

  );
}

export default App;