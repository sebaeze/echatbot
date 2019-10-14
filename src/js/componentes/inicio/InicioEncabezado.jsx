/*
*
*/
import React                              from 'react' ;
import { AnimacionLink }                  from '../animacion/AnimacionLink' ;
//
export class InicioEncabezado extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        let Childs = this.props.children || false ;
        return(
            <div id={this.props.id ? this.props.id : "idDivInicioEncabezado" } style={{minHeight:'90vh'}} className="bg-inicial" >
                <div className="btn-continuar" style={{marginLeft: (this.props.configuracion.isMobile==true ? '7%' : '2%'),marginTop: (this.props.configuracion.isMobile==true ? '8vh' : '30vh' ),width:'auto'}} >
                    <AnimacionLink texto={"Portal de ayuda"} siguienteDiv={this.props.siguienteDiv} />
                </div>
            </div>
        )
    }
    //
} ;
//