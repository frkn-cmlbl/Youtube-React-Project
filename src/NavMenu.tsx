import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import logo from "./youtube_icon.svg"

export default function NavMenu() {
    return (
        <>
           
               <Menu>
               <Menu.Item><Link to={"/"}>
        
        <img src={logo}/> 
        </Link>
        </Menu.Item>
               </Menu>

           
        </>
    )
}
