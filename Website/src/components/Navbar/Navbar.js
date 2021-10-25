import React , {useEffect} from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import Logo from "../../res/LogoTransparentName.png";

const Navbar = () => {

  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">

      <NavLink to="/" onClick={ function(){ setTimeout(function(){ animation(); });}} exact>
        <a href="/" className="navbar-brand navbar-logo">
          <img src={Logo} alt="Logo" className="LogoNavBarImg"/>
        </a>
      </NavLink>

      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
 
      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
              <NavLink className="nav-link" to="/" exact>
                <i className="fas fa-car"/>
                Le projet
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/team" exact>
                <i 
                className="fas fa-users">
                </i>Notre équipe
              </NavLink> 
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/functioning" exact>
                <i 
                className="fas fa-cogs">
                </i>Comment ça marche ?
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard" exact>
                <i 
                className="fas fa-tachometer-alt">
                </i>Tableau de bord
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" exact>
                <i 
                className="fas fa-envelope">
                </i>Nous contacter
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/lockdoor" exact>
                <i 
                className="fas fa-lock">
                </i>LockDoor
              </NavLink>
            </li>

        </ul>
      </div>
  </nav>
  )
}
export default Navbar;