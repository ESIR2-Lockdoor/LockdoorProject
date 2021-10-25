import React from 'react'
import "./Project.css"

const Project = () => {
  return (
    <div className="SmoothScrollContainer">
      <section id="title">
        <div className="fade-in-text">Covoitu'Rennes</div>
        <p class="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
      <section id="context1">
          <div className="fade-in-text">Ici un chiffre important sur la pollution</div>
          <p class="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
      <section id="context2">
          <div className="fade-in-text">Ici un chiffre important sur les embouteillages</div>
          <p class="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
      <section id="context3">
          <div className="fade-in-text">Notre projet</div>
          <p class="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
    </div>
  )
}
export default Project;