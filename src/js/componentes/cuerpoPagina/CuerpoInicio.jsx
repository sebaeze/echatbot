/*
*
*/
import React                              from 'react'  ;
import { CuerpoPrices }                   from "../cuerpoPagina/CuerpoPrices"  ;
import { CuerpoAbout  }                   from "../cuerpoPagina/CuerpoAbout"   ;
import FormContacto                       from "../formularios/FormContacto"   ;
import { InicioEncabezado }               from  '../inicio/InicioEncabezado'   ;
import { InicioPorque  }                  from  '../inicio/InicioPorque'       ;
// 
class CuerpoInicio extends React.Component {
  constructor(props) {
    super(props)  ;
    this.idDivWhyUs    = "waiboc-header-whyus" ;
    this.divPorque     ;
  }
  //
  render() {
    //
    return (
          <div id="main" style={{paddingTop:'70px',minHeight: '100vh'}}  >
              <InicioEncabezado translate={this.props.translate}
                                id="waiboc-header-ini"
                                configuracion={this.props.configuracion}
                                siguienteDiv={this.idDivWhyUs}
              />
              <InicioPorque  translate={this.props.translate}
                            configuracion={this.props.configuracion}
                            id={this.idDivWhyUs}
                            siguienteDiv={"prices"}
              />
              <CuerpoPrices  translate={this.props.translate} configuracion={this.props.configuracion} siguienteDiv={"contact"} />
              <FormContacto  translate={this.props.translate} configuracion={this.props.configuracion} />
          </div>
      )
      //
    }
  }
//
export default CuerpoInicio ;
//