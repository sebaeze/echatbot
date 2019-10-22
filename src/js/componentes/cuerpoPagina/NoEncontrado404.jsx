/*
*
*/
import React, { Component }               from 'react'  ;
//
import '../../../css/estilos.css' ;
//
class NoEncontrado404 extends Component {
  constructor(props) {
    super(props);
  }
  //
  componentDidMount(){}
  //
  render() {
    //
    return (
          <main id="main" style={{color: 'black', backgroundColor: '#272723'}} >
              <div className="container-fluid" id="idContainer404">
                <img alt="gmail Login" src="/img/404impresoras.jpg" />
                <span className="mensaje">
                  Lo siento, no hemos podido encontrar lo que buscas<br/><a className="link-empresa" style={{color:'black'}} href="/#contact">Envianos tu consulta</a>
                </span>
              </div>
          </main>
      )
      //
    }
  }
/* */
export default NoEncontrado404 ;
/* */