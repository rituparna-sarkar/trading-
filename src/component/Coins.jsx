import React from 'react'
import { useState,useEffect } from 'react'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
import { Link } from 'react-router-dom'



const  Coins=()=> {
  const [loading ,setLoading]=useState(true)
  const [coins, setCoins]=useState([])
  const [currency, setCurrency]=useState('inr')
  const currencySymbol=currency==='inr'?'₹':"$"

  const [search, setSearch]=useState("")
  
  useEffect(()=>{
    const getCoinsData=async()=>{
      // const res= await axios.get(url) 
      // console.log(res.data);

      // or we can write in shortcut

      const{data}= await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`)
      console.log(data);
      setCoins(data)
      setLoading(false)
    }
    getCoinsData()
  })

  return (
    <>
      {
        loading? <Loader/> : <>
        <Header/>
        <div className="search-bar">
          <input type='text'
          placeholder='search your coin'
          style={{height:'2rem', width:'20rem' , position:'absolute', top:'1%', left:'35%', paddingLeft:'5px'}}
          onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div className='btns'>
          <button onClick={()=>setCurrency('inr')}>inr</button>
          <button onClick={()=>setCurrency('usd')}>usd</button>
        </div>
        {
          coins.filter((data)=>{
            if(data==''){
              return data
            }else if(data.name.toLowerCase().includes(search.toLowerCase())){
              return data
            }
          }).map((coindata, i)=>{
            return(
              <CoinCard key={i} coindata={coindata} id={coindata.id} i={i} currencySymbol={currencySymbol}/>
            
            )
          })
        }
         </>
      }
    </>
  )
}
const CoinCard=({coindata, i, currencySymbol, id})=>{

  const profit=coindata.price_change_percentage_24h>0
  return(
    <Link to={`/coins/${id}`} style={{color:'white',  textDecoration:'none'}}>

<div key={i} className='ex-cards'>
    <div className='image'>
      <img height={"80px"} src={coindata.image} alt=''/>

    </div>
    <div className='name'>
       {coindata.name}
    </div>
    <div className="price">
         {currencySymbol} {coindata.current_price.toFixed(0)}

    </div>
    <div style={profit ? {color:'green'} :{color:'red'}} className="rank">
      {profit ? '+' + coindata.price_change_percentage_24h.toFixed(2) :coindata.price_change_percentage_24h.toFixed(2)
}

    </div>
  </div>
    </Link>
  )
}

export default Coins
