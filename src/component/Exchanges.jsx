import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import ethereum from '../ethereum.png'
import './Exchanges.css'



const Exchanges=()=> {
  const [loading ,setLoading]=useState(true)
  const [exchanges, setExchanges]=useState([])
  
  useEffect(()=>{
    const getExchangeData=async()=>{
      // const res= await axios.get(url) 
      // console.log(res.data);

      // or we can write in shortcut

      const{data}= await axios.get(`${Baseurl}/exchanges`)
      console.log(data);
      setExchanges(data)
      setLoading(false)
    }
    getExchangeData()
  },[])
  return (
    <>
    {
      loading ? <Loader/> :<>
      <Header/> 
      
      
      {
        exchanges.map((item, i)=>{
          return(
            
        <div key={i} className='ex-cards'>
          <div className='image'>
            <img height={"80px"} src={item.image} alt=''/>

          </div>
          <div className='name'>
             {item.name}
          </div>
          <div className="price">
                {item.trade_volume_24h_btc.toFixed(0)}

          </div>
          <div className="rank">
            {item.trust_score_rank}

          </div>
        </div>
      
          )
        })
      }
      </>
      
    }
    
    
  
    </>
  )
}

export default Exchanges
