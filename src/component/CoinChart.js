import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Baseurl} from './baseUrl'
import { useParams } from 'react-router-dom'
import Loader from './Loader'



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import {faker} from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function App() {
  return <Line options={options} data={data} />;
}








const CoinChart=({currency})=> {
    const[chartData, setChartData]=useState([])
    const {id}=useParams()
    const [days,setDays]=useState(1)
    const CoinChartData= async()=>{
       try{
        const {data}=await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        setChartData(data.prices)
          console.log(data.prices);
       }catch(error){
        console.log(error);
       }
    }

    useEffect(()=>{
        CoinChartData()
        
    },[CoinChartData,id, days])
    const myData={
        labels:chartData.map((value)=>{
            const date=new Date(value[0])
            const time=date.getHours()>12
            ?`${date.getHours()-12}:${date.getMinutes()}PM `
            :`${date.getHours()}:${date.getMinutes()}AM`
            return days===1? time:date.toLocaleDateString()
            console.log(date);
            console.log(value);
        }),
        datasets:[
            { 
                labels:`price in past Days ${days} in ${currency}`,
                data:chartData.map((value)=>value[1]),
                borderColor:'orange',
                borderWidth:'3'
            }
           


        ]
    }
  return (
  <>
  {
    chartData.length===0? (<Loader/>):(
      <div>
      <Line data={myData} options={{
        elements:{
            point:{
                radius:1,
            }
        }
      }} style={{margin:'5rem', width:'60rem'}} />

<div className='btn' style={{margin:"5rem", width:"60rem"}}>
          <button onClick={()=>setDays(1)}>24 hours</button>
          <button onClick={()=>setDays(30)}>1 month</button>
          <button onClick={()=>setDays(365)}>1 year</button>
        </div>
    </div>
    )
  }
  </>
  )
}

export default CoinChart
