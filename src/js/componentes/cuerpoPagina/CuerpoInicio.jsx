/*
*
*/
import React, { Component }               from 'react'  ;
import { Carousel, Button }               from 'antd'   ;
import AnimacionInicial                   from '../animacion/AnimacionInicial' ;
import { AnimacionCarousel }              from '../animacion/AnimacionCarousel' ;
import AnimacionLogo                      from '../animacion/AnimacionLogo'    ;
import { InicioEncabezado }               from  '../inicio/InicioEncabezado'   ;
import { InicioPorque  }                  from  '../inicio/InicioPorque'       ;
//
class CuerpoInicio extends Component {
  constructor(props) {
    super(props)  ;
    this.state         = { isMobile: (window.innerWidth<797), showDivPorque:false, showDivEquipos: false } ;
    this.onFocusPorque = this.onFocusPorque.bind(this) ;
    this.idDivPorq     = "idWhyUs" ;
    this.idDivEquipos  = "idInicoEquipos" ;
    this.divPorque     ;
  }
  //
  componentDidMount(){
    try {
      document.addEventListener('scroll',function(argEvenSCroll){
        let scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 9999 ;
        if ( scrollPos>300 ){
          this.setState({showDivPorque:true})  ;
        } else {
          this.setState({showDivPorque:false})  ;
        }
        if ( scrollPos>700 ){
          this.setState({showDivEquipos:true})  ;
        } else {
          this.setState({showDivEquipos:false})  ;
        }
      }.bind(this)) ;
      //
    } catch(errHeader){
      console.dir(errHeader) ;
    }
  }
  //
  onFocusPorque(argEVV){
    try {
      console.dir(argEvent);console.log('..onfocus');this.setState({showDivPorque:true})
    } catch(errFP){
      console.dir(errFP) ;
    }
  }
  //
  render() {
    //
    return (
          <div id="main" style={{paddingTop:'120px',minHeight: '80vh'}} >
              <div style={{minHeight:'70vh'}}>
                <InicioEncabezado translate={this.props.translate} configuracion={this.props.configuracion} siguienteDiv={this.idDivPorq} />
              </div>
              <div id={this.idDivPorq} style={{minHeight: '80vh',backgroundColor:'white', zIndex:'999', border:'2px solid red'}}
                  onFocus={this.onFocusPorque.bind(this)}
              >
                <InicioPorque     translate={this.props.translate} configuracion={this.props.configuracion} siguienteDiv={"idInicioEquipos"} flagShowDiv={ this.state.showDivPorque } />
              </div>
          </div>
      )
      //
    }
  }
/* */
export default CuerpoInicio ;
/* */