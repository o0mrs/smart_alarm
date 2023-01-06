import '../App.css'
import NavBar from './parts/navbar';
var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();

// Check whether AM or PM
var newformat = hours>= 12 ?'PM':'AM'; 

// Find current hour in AM-PM Format
hours = hours % 12; 

// To display"0"as"12"
hours = hours ? hours : 12; 
minutes = minutes <10 ?'0'+ minutes : minutes;

var d= hours +':'+ minutes 
const Home = ()=>{
    <style>
    {
      ` body{
            background-color: #171718;
            color: white;

        }`
    }
        </style>
        var alarm = [{time:'2022/3/3 11:11'},{time:'2022/3/3 11:11'},{time:'2022/3/3 11:11'}]
        // YYYY/MM/DD HH:MM
    return(
<div className="max-w-[100vw]  bga h-screen grid ">
<div className="w-full h-[30vh] grid place-items-center ">
<div className="text-[#8E98A1] -mt-3 text-xl Poppins font-bold">
ZUIS
</div>
    <div className="text-7xl text-[#8E98A1] Poppins font-bold mb-4 ">

        <div>
            {d}<span className="text-xs">    {newformat}</span>
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
        <i class="fa-solid fa-plus text-2xl cursor-pointer"></i>
        </div>
    </div>
{alarm.map((gf,i)=>(
<>
<div className='bg-[#0000001d] pt-6 px-6 h-20 mt-4 text-lg flex text-center rounded-lg justify-between'>
    <div className='-order-1 text-2xl'>11:15 AM</div>

<div>2025/12/01</div>
</div>

</>
))}
</div>
</div>
</div>
    )
}
export default Home;