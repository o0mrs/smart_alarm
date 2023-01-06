import { Logouta,Signupa,auth } from "../firebase";
import { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const NavBar = ()=>{
  const [a, seta] = useState(0);
  const [pfp, setpfp] = useState('./logo.png')
  let navigate = useNavigate();
  useEffect(()=>{

        onAuthStateChanged(auth, (user) => {
            if (user) {
              console.log(user)
              
              const pg = user.photoURL;
              setpfp(pg)
              seta(1)
            } else {
                // navigate("/auth", { replace: true });

            }
          });

    
},[])
    return(
      <div className="navbar text-white">
  <div className="navbar-start">
    <div className="dropdown  text-white">
    <label tabIndex={0} className="btn btn-ghost btn-circle">
    <i class="fa-solid fa-bars-staggered text-xl"></i>      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
        <li onClick={()=>{navigate('/',{replace:false})}}><a>Homepage</a></li>
        <li onClick={()=>{navigate('/',{replace:false})}}><a>About</a></li>
        <li onClick={()=>{navigate('/',{replace:false})}}><a>Projects</a></li>
        <li onClick={()=>{navigate('/',{replace:false})}}><a>contact</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-white b normal-case text-xl">OMAR</a>
  </div>
  <div className="navbar-end">
    {/* <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button> */}
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
      <img className="rounded-full h-8 w-8" src={pfp}></img>
        {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
      </div>
    </button>
  </div>
</div>
//         <header>
//     <div className=" pt-[1rem] pl-[1rem] sm:pt-[0.3rem] ">
//       {a == 1&& <div className="">
// <i className="fa-solid mt-5 mr-4 text-xl text-white float-right fa-bars"></i>
// </div>}
//  <div>
//     {/* logo */}


//     <div className="dropdown">
//     <img tabindex="0" className="md:h-[2.6rem] md:w-[2.6rem] md:mt-2 sm:h-[2.6rem] sm:mt-2 float-right  sm:w-[2.6rem] rounded-full" alt='logo' src={pfp}></img>

//   <ul tabindex="0" className="dropdown-content menu p-2 shadow bg-base-300 text-white rounded-box mt-16 ml-6 w-52">
//     <li onClick={()=>{navigate('/home',{replace:true})}}><a>home</a></li>
//     <li onClick={Logouta} className='text-red-600'><a>Log out</a></li>
//   </ul>
// </div>
//  </div>
//  <div >

// {a == 0 &&(
// <>
// <div className="md:hidden">
// <i className="fa-solid -mt-10 mr-4 text-xl text-white float-right fa-bars"></i>
// </div>
// <div className="md:flex	 -mt-12 float-right  sm:hidden">
// <div className="text-md p-3 mr-3 cursor-pointer text-white " onClick={()=>{navigate('/auth',{replace:true})}}>
//     Sign in
//     </div>
//     <div className=" border rounded-lg cursor-pointer p-3 mr-4 text-md text-white " onClick={()=>{navigate('/auth',{replace:true})}}>
//     Sign up
//     </div>

// </div>
// </>

// )}
//  </div>
//   </div>
// </header>
    )
}
export default NavBar;