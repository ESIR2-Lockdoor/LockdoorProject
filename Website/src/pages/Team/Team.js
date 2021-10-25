import React from 'react'
import "./Team.css"

const Team = () => {
  return (
    <div className="SmoothScrollContainer">
      <section id="title">
        <h1>3 Membres</h1>
        <p class="lead">Descriptif général et photo de groupe</p>
      </section>
      <section id="context1">
          <h1>Mathis CERTENAIS</h1>
          <p class="lead">Descriptif personnel et photo</p>
      </section>
      <section id="context2">
          <h1>Christophe PEROUMAL</h1>
          <p class="lead">Descriptif personnel et photo</p>
      </section>
      <section id="context3">
          <h1>Yann GENY</h1>
          <p class="lead">Descriptif personnel et photo</p>
      </section>
    </div>
  )
}
export default Team;