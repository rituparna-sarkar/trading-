import React from 'react'
import { useEffect,useState } from 'react'
import Loader from './Loader'
import { Baseurl } from './baseUrl'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import './coinDetails.css'
import {BiSolidUpArrow, BiSolidDownArrow} from 'react-icons/bi'
import { IoIosPulse } from "react-icons/io";
import CoinChart from './CoinChart'

const CoinDetails=() =>{
  const [coin, setcoin]=useState([])
  const[loading, setLoading]=useState(true)
  const {id}=useParams()
  const [currency, setCurrency]=useState('usd')
  const currencySymbol=currency==='inr'?'₹':"$"
  const profit=coin.market_data?.market_cap_change_percentage_24h
  > 0
  useEffect(()=>{
    const getCoin= async ()=>{

   
    try{
      const {data}= await axios.get(`${Baseurl}/coins/${id}`)
      console.log(data);
      setcoin(data)
      setLoading(false)

    }catch(error){
      console.log(error);
      setLoading(false)

    }
  }
  getCoin()
  },[id])
  return (
    <>
      {
        loading ? <Loader/> :<>
        <div className='coin-detail' style={{display:'flex', justifyContent:'space-evenly'}}>
          <div className='coin-info'>
          <div className='btn'>
          <button onClick={()=>setCurrency('inr')}>inr</button>
          <button onClick={()=>setCurrency('usd')}>usd</button>
        </div>
          <div className="time">
            {coin.last_updated
}
          </div>
          <div className="coin-image">
            <img height={'150px'} src={coin.image.large}/>
          </div>

          <div className="coin-name">
            {coin.name}
          </div>

          <div className="coin-price">
           {currencySymbol} {coin.market_data.current_price[currency]}
          </div>

          <div className="coin-profit">
            {profit? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red'/>}
            {coin.market_data.market_cap_change_percentage_24h
}
          </div>

          <div className="market-rank">
          <IoIosPulse color='orange'/>
            #{coin.market_cap_rank
}
          </div>

          <div className="coin-description">
            <p>{coin.description['en'].split('.')[0]}</p>
          </div>

          </div>
          <CoinChart currency={currency}/>
        </div>
        </>
      }
    </>
  )
}

export default CoinDetails
