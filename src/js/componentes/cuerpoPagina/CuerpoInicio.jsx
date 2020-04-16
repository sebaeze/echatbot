/*
*
*/
import React                              from 'react'  ;
import Fade                               from 'react-reveal/Fade'  ;
import { Row, Col }                       from 'antd'   ;
import { Carousel, Button }               from 'antd'   ;
import AnimacionInicial                   from '../animacion/AnimacionInicial' ;
import { AnimacionCarousel }              from '../animacion/AnimacionCarousel' ;
import AnimacionLogo                      from '../animacion/AnimacionLogo'    ;
import { CuerpoPrices }                   from "../cuerpoPagina/CuerpoPrices"  ;
import { CuerpoAbout  }                   from "../cuerpoPagina/CuerpoAbout"   ;
import FormContacto                       from "../formularios/FormContacto"   ;
import { InicioEncabezado }               from  '../inicio/InicioEncabezado'   ;
import { InicioPorque  }                  from  '../inicio/InicioPorque'       ;
//
export class CuerpoInicio extends React.Component {
  constructor(props) {
    super(props)  ;
    this.idDivWhyUs    = "waiboc-header-whyus" ;
    this.divPorque     ;
  }
  //
  render() {
    //
    return (
          <div id="main" style={{paddingTop:'70px',minHeight: '100vh'}} >
              <InicioEncabezado translate={this.props.translate}
                                id="waiboc-header-ini"
                                configuracion={this.props.configuracion}
                                siguienteDiv={this.idDivWhyUs}
              />
              <InicioPorque  translate={this.props.translate}
                            configuracion={this.props.configuracion}
                            id={this.idDivWhyUs}
                            siguienteDiv={"contact"}
              />
              <CuerpoAbout   translate={this.props.translate} configuracion={this.props.configuracion} />
              <CuerpoPrices  translate={this.props.translate} configuracion={this.props.configuracion} />}
              <FormContacto translate={this.props.translate} configuracion={this.props.configuracion} customStyle={{marginTop:'110px'}} />
          </div>
      )
      //
    }
  }
//