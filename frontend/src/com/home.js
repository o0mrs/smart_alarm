import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css'

const Home = ()=>{
    const [aa, setaa] = useState('')
    useEffect(()=>{
        function updateClock() {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            // document.getElementById('clock').innerHTML = hours + ':' + minutes + ' ' + ampm;
            setaa( hours + ':' + minutes+ ":" + seconds )
            seta(ampm)
          }
          setInterval(updateClock, 1000);
    },[])

    const [cycles, setCycles] = useState([]);
    const [ctime, setctime] = useState(90);
    useEffect(() => {

        const currentTime = new Date();
        const newCycles = [];
  
        for (let i = 1; i <= 5; i++) {
          const time = new Date(currentTime.getTime() + i * ctime * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
          newCycles.push({ name: `${i} cycle`, time });
        }
  
        setCycles(newCycles);

  

    }, [aa,ctime]);

    useEffect(()=>{
axios.get('http://192.168.43.79:3000/alarms').then((gf,i)=>{
    console.log(gf.data.sort((a, b) => b.id - a.id))
    setalarm(gf.data.sort((a, b) => b.id - a.id))
})
    },[])


    const [answer, setAnswer] = useState('');
    const [result, setResult] = useState('');
  
    const num1 = 12
    const num2 = 20
  




    const [hasPassed, setHasPassed] = useState(false);
    const [passedAlarmId, setPassedAlarmId] = useState(null);
    const [a, seta] = useState('')

    const [time, settime] = useState('')
    const [date, setdate] = useState('')
    const [alarm, setalarm] = useState([])
      
    const handleSubmit = (event) => {
        event.preventDefault();
        if (parseInt(answer) === num1 + num2) {
          setResult('Correct!');
          axios.post("http://192.168.43.79:3000/delete",{id:passedAlarmId})
        } else {
          setResult('Incorrect. Please try again.');
        }
      };
  
    useEffect(() => {
        const intervalId = setInterval(() => {
          const now = new Date();
    
          for (let i = 0; i < alarm.length; i++) {
            const alarmTime = new Date(alarm[i].time);
            if (now >= alarmTime) {
              setHasPassed(true);
              setPassedAlarmId(alarm[i].id);
              break;
            }
          }
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [alarm]);
    
    
        // YYYY/MM/DD HH:MM
        if(!hasPassed){

        
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
    <a onClick={()=>{axios.post('http://192.168.43.79:3000/add',{time:date + " " + time}).then((gf,i)=>{window.location.reload();
})}} className="btn">Add!</a>
     <a href="#" className="btn">Ok!</a>
    </div>
  </div>
</div>
{/* 4 */}
<div className="modal text-white " id="my-modal-4">
  <div className="modal-box bg-base-300">
    <h3 className="font-bold text-xl">Sleep cycle</h3>
    <div className='text-lg mt-2'>
        <input className="input w-full mb-5 mt-5" value={ctime} onChange={(e)=>{
            if(!e.target.value){
                setctime(0)
            }else{
                setctime(parseInt(e.target.value))
            }

            
            }}></input>
      {cycles.map((cycle) => (
        <div key={cycle.name}>{cycle.name} - {cycle.time}</div>
      ))}
    </div>
    <div className="modal-action">

     <a href="#" className="btn">Ok !</a>
    </div>
  </div>
</div>
<div>

    </div>
    <div className="navbar text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
      <i className="fa-solid fa-bars"></i>      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Homepage</a></li>
        <li><a>Portfolio</a></li>
        <li><a>About</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost normal-case text-xl">ZUIS</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
    <a href="#my-modal-4" > 
    <button className="btn btn-ghost btn-circle">

      <div className="indicator">
      <i className="fa-solid fa-bed"></i>
              <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
    </a>
  </div>
</div>
<div className="w-full -mt-5 h-[30vh] grid place-items-center ">

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
        <a href="#my-modal-2" > <i className="fa-solid fa-plus text-2xl cursor-pointer"></i></a>
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
    )}else{
        return(
<div className="max-w-[100vw]  bga h-screen  text-white text-center text-xl">
<div className="w-full h-[30vh] grid place-items-center ">
<div className="text-[#8E98A1] -mt-10 text-xl Poppins font-bold">
ZUIS
</div>
    <div className="text-7xl text-[#8E98A1] Poppins font-bold mb-4 ">

        <div>
            {/* {aa}<span className="text-xs">    {a}</span> */}
        </div>
    <div className='text-xl mt-1 -mr-5 float-right '>

    </div>
    </div>
</div>
<div className='-mt-32'>
<p>What is the sum of {num1} and {num2}?</p>
            <form className='grid  place-items-center' onSubmit={handleSubmit}>
              <input type="text" className='input max-w-[50vw] mt-12' value={answer} onChange={(event)=>{setAnswer(event.target.value);}} />
              <button className=' mt-4' type="submit">Submit</button>
            </form>
            <p className='mt-5'>{result}</p>
</div>
          </div>
        )
    }
}
export default Home;