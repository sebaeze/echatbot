/*
*
*/
import React, { Component       } from 'react' ;
import $                          from 'jquery' ;
import animate                    from 'animate.css' ;
import Nav                        from 'react-bootstrap/Nav' ;
import counterup                  from 'jquery.counterup/jquery.counterup.min.js' ;
//
import '../../../css/estilosHeader.css' ;
import 'animate.css/animate.min.css'    ;
//
class EncabezadoLink extends Component {
  constructor(props) {
    super(props);
    this.onClickRef = this.onClickRef.bind(this) ;
    let currentPath = String(window.location.pathname) +  (window.location.hash.length>0 ? window.location.hash : '') ; //   window.location.hash.length
    currentPath     = currentPath.toUpperCase() ;
    this.state      = {flagCurrentPath:( currentPath==String(this.props.link).toUpperCase() )} ;
  }
  //
  componentDidMount(){
    try {
    } catch(errDidM){ console.dir(errDidM); }
  }
  //
  onClickRef(argEventLink){
    try {
      if ( this.state.flagCurrentPath==true ){
        argEventLink.preventDefault() ;
      } else {
        //
        let destino = new URL(argEventLink.target.href) ;
        if (location.pathname.replace(/^\//, '')==destino.pathname.replace(/^\//, '') && location.hostname==destino.hostname) {
          var top_space = 70;
          /*
          if ($('#headerNegocio').length) {
              top_space = $('#headerNegocio').outerHeight();
              if ($('#headerNegocio').hasClass('header-fijo')) {
                console.log('.....voy a restart por mobile::(A): '+top_space) ;
                top_space = top_space - 20;
                console.log('.....voy a restart por mobile::(B): '+top_space) ;
              }
          }
          */
          var target = $(destino.hash) ;
          if (target.length) {
            console.log('....voy a hacer animate ') ;
            $('html, body').animate({
                scrollTop: target.offset().top - top_space
            }, 1500, 'easeInOutExpo');
            return false;
          }
          //
          //this.setState({flagCurrentPath:false}) ;
          //
        }
        //
      }
    } catch(errClick){
      console.dir(errClick) ;
    }
  }
  //
  render() {
    //
    /*
    <li className={(this.state.flagCurrentPath ? 'menu-active': '')}>
        <a href={this.props.link} onClick={this.onClickRef} >{this.props.nombre}</a>
      </li>
    */
    return (
          <Nav.Link href={this.props.link}
                    onClick={this.onClickRef}
                    className={(this.state.flagCurrentPath ? 'menu-active': '')}
          >{this.props.nombre}</Nav.Link>
        ) ;
      //
    }
  }
/* */
export default EncabezadoLink ;
/* */