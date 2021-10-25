import React from 'react'
import HorizontalScroll from "react-scroll-horizontal"
import "./Fonctionnement.css"

const Fonctionnement = () => {
  const child = { width: `100vw`, height: `100%`}
  return (
    <div className="fonctionning">
      <HorizontalScroll reverseScroll={true}>
        <div style={child} className="ScrollingItem"> 
          <h1> Hello World ! </h1>
        </div>

        <div style={child} className="ScrollingItem"> 
          <h1> Bonjour Monde ! </h1>
        </div>

        <div style={child} className="ScrollingItem"> 
          <h1> HOLA MUNDO ! </h1>
        </div>

        <div style={child} className="ScrollingItem"> 
          <h1> JE M'AMUSE BIEN ! </h1>
        </div>
      </HorizontalScroll>
    </div>
  )
}
export default Fonctionnement;