import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css'

const Home = ()=>{
    useEffect(()=>{
        function updateClock() {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            // document.getElementById('clock').innerHTML = hours + ':' + minutes + ' ' + ampm;
            setaa( hours + ':' + minutes )
            seta(ampm)
          }
          
          setInterval(updateClock, 1000);
    },[])
    useEffect(()=>{
axios.get('http://192.168.43.79:3000/alarms').then((gf,i)=>{
    console.log(gf.data.sort((a, b) => b.id - a.id))
    setalarm(gf.data.sort((a, b) => b.id - a.id))
})
    },[])
    const [a, seta] = useState('')
    const [aa, setaa] = useState('')
    const [time, settime] = useState('')
    const [date, setdate] = useState('')
    const [alarm, setalarm] = useState([])
   
        // YYYY/MM/DD HH:MM
    return(   
<div className="max-w-[100vw]  bga h-screen grid ">
<div className="modal text-white " id="my-modal-2">
  <div className="modal-box bg-base-300">
    <h3 className="font-bold text-lg">Add alarm</h3>
    <div className="grid mt-6">
  <label for="appointment-date">Date:</label>
  <input onChange={(e)=>{setdate(e.target.value)}} type="date" className='input mt-4' name="appointment-date" min="2022-01-01" max="2025-12-31" />
</div>
<div className="grid mt-6">
  <label for="appointment-date">Time:</label>
  <input onChange={(e)=>{settime(e.target.value)}} type="time" className='input mt-4' name="appointment-time" step="300" min="09:00" max="17:00" />

  </div>
    <div className="modal-action">
    <a onClick={()=>{axios.post('http://192.168.43.79:3000/add',{time:date + " " + time})}} className="btn">Add!</a>
     <a href="#" className="btn">Yay!</a>
    </div>
  </div>
</div>
<div className="w-full h-[30vh] grid place-items-center ">
<div className="text-[#8E98A1] -mt-3 text-xl Poppins font-bold">
ZUIS
</div>
    <div className="text-7xl text-[#8E98A1] Poppins font-bold mb-4 ">

        <div>
            {aa}<span className="text-xs">    {a}</span>
        </div>
    <div className='text-xl mt-1 -mr-5 float-right '>

    </div>
    </div>
</div>
<div className='h-[70vh] w-screen  text-[#8E98A1] border-t border-[#8E98A1] pt-4 rounded-md '>
<div className='grid Poppins px-3'>
    <div className='flex px-4 justify-between'>
        <div className='-order-2 text-xl font-medium
'>
            Alarms
        </div>
        <div className='flex-end -mt-1'>
        <a href="#my-modal-2" > <i class="fa-solid fa-plus text-2xl cursor-pointer"></i></a>
        </div>
    </div>
{alarm.map((gf,i)=>{
    let dateArray = gf.time.split(" ");
    let date = dateArray[0];
    let time = dateArray[1];
return(
<>
<div className='bg-[#0000001d] pt-6 px-6 h-20 mt-4 text-lg flex text-center rounded-lg justify-between'>
    <div className='-order-1 text-2xl'>{time}</div>

<div>{date}</div>
</div>

</>
)

})}
</div>
</div>
</div>
    )
}
export default Home;