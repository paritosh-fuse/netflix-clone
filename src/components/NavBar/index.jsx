import React from 'react'
import './style.css'
function NavBar() {

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector(".navbar")
        if(window.scrollY > 100){
            navbar.classList.add('active')
        } else {
            navbar.classList.remove('active')
        }
    })

    return (
        <div className="navbar">
            <img 
                className = "navbar__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" 
                alt="Logo" />
            <img 
                className = "navbar__avatar"
                src="https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png" 
                alt="Avatar" />            
        </div>
    )
}

export default NavBar
