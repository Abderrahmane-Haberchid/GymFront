import React, { useState, useEffect } from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';
import { redirect } from "react-router-dom";


function Sidebar() {

    const [menuIcon, setMenuIcon] = useState("fa-solid fa-bars fa-xl burger")

    const displayMenu = () => {
        const sidebar = document.getElementById('sidebarid')
        if (sidebar.style.transform == 'translateX(0px)') {
            sidebar.style.transform = 'translateX(-230px)'    
            setMenuIcon('fa-solid fa-bars fa-xl burger')
            
        }
        else {
            sidebar.style.transform = 'translateX(0px)'
            setMenuIcon('fa-solid fa-xmark fa-xl burger')
            }
        }

    const [click, setClick] = useState(false);
    function hidesidebar(){
        
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('hide');
        if (click === false) {
            setClick(true);
        }
        else setClick(false);
    }   

    const [check, setCheckMode] = useState(false)   

    const body = document.querySelector('body')
  
    function switchMode () {        
  
      if (check === false) {
        body.classList.toggle("dark")
        setCheckMode(true)
        localStorage.setItem("mode", "dark")
      }
      if (check === true) {
        body.classList.remove("dark")
        setCheckMode(false)
       localStorage.setItem("mode", "light")
      } 
    }
  
    useEffect(() => {
      let mode = localStorage.getItem('mode')
    
      return () => {
        if (mode === 'dark') {
          body.classList.toggle("dark")
          setCheckMode(true)
        }
        if (mode === 'light') {
          body.classList.remove("dark")
          setCheckMode(false)
        }
      }
    }, [])

    const logout = () => {
        localStorage.setItem("token", "")
        if (localStorage.getItem("token") === "") {
            return redirect("/auth")
        }        
    }

  return (
    <>
    <div className="sidebar" id="sidebarid">

        <div className='header'>
            <div className='logo'>
                <i className='bx bx-dumbbell bx-md logo-img'></i>
                <span className='logo-text'>GYM ROYAL</span>
            </div>    
            <div className='burger-menu'>
              <i className={(menuIcon)} onClick={displayMenu}></i>
            </div>
               {click === false && <i className='bx bx-chevron-left bx-sm toggle' onClick={hidesidebar}></i>}
               {click === true && <i className='bx bx-chevron-right bx-sm toggle' onClick={hidesidebar}></i>}
        </div>
        <div className='sidebar-list'>
            <ul>
                <li>
                    <Link to='/home' className='links'>
                        <i className='bx bx-home-alt bx-sm icon' ></i> 
                        <span className='text'>Acceuil</span>
                    </Link>
                </li>
                <li>
                
                    <Link to='/statistiques' className='links'>
                        <i className='bx bx-pie-chart bx-sm icon'></i>
                        <span className='text'>Statistique</span>
                    </Link>
                </li>
                <li>
                    <Link to='/membres' className='links'>        
                        <i className='bx bx-user-pin bx-sm icon'></i>    
                        <span className='text'>Membres</span>
                    </Link>
                </li>
                <li>
                    <Link to='/supplements' className='links'>
                        <i className='bx bx-baguette bx-sm icon'></i>    
                        <span className='text'>Suppléments</span>
                    </Link>
                </li>
                <li>
                    <Link className='links'>
                        <i className='bx bx-lock-alt  bx-sm icon'></i>    
                        <span className='text'>Admin</span>
                    </Link>
                </li>
                <br />
                <li>
                    <Link to="/auth" className='links' onClick={logout}>
                        <i className='bx bx-log-out  bx-sm icon'></i>    
                        <span className='text'>Log out</span>
                    </Link>
                </li>
                
            </ul>
        </div>

        <div className='switcher'>
                      <input type="checkbox" 
                            className="checkbox" 
                            id="checkbox" 
                            onChange={switchMode}                             
                            defaultChecked={localStorage.getItem('mode') === 'dark' && true} 
                      />
                      <label htmlFor="checkbox" className="checkbox-label">
                          <i className="fas fa-sun"></i>
                          <i className="fas fa-moon"></i>                    
                          <span className="ball"></span>
                      </label>
        </div>
        
       <div className='footer'> 
            
            
            <span className='footer-text'>Dvelopped by Abderrahmane HABERCHID. 2023.</span>
              
       </div>
    
	</div>
</>    
  );
}

export default Sidebar;