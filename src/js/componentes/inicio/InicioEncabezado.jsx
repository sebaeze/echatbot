/*
*
*/
import React                              from 'react' ;
import { Typography, Row, Col }           from 'antd'  ;
import QueueAnim                          from 'rc-queue-anim' ;
import TweenOne                           from 'rc-tween-one'  ;
import { AnimacionLink }                  from '../animacion/AnimacionLink' ;
//
const { Text, Title } = Typography ;
//
export class InicioEncabezado extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        //
        let sumaY    = 190 ;
        let sumDelay = 600 ;
        //
        let Childs = this.props.children || false ;
        return(
            <div id={this.props.id ? this.props.id : "idDivInicioEncabezado" } style={{minHeight:'90vh'}} className="bg-inicial" >
                <TweenOne style={{marginLeft:(this.props.configuracion.isMobile==true ? '20px':'70px'),marginTop:(this.props.configuracion.isMobile==true ? '10px':'80px')}}
                            animation={{ x:450,y: sumaY, opacity: 0, type: 'from', delay: 300 }}
                            name="TweenOne"
                >
                    <Title level={1} style={{marginBottom:(this.props.configuracion.isMobile==true ? '0': false)}}>{this.props.configuracion.empresa.name}</Title>
                    <Title level={2} >{this.props.translate.homeHeader.title}</Title>
                </TweenOne>
                {
                    this.props.translate.homeHeader.text.map((elemText,elemIdx)=>{
                        // sumaY    += 600 ;
                        sumDelay += 900 ;
                        return(
                            <div key={elemIdx} style={{marginTop:'15px',paddingTop:'10px'}} >
                                <TweenOne key={elemIdx}
                                          style={{marginLeft:(this.props.configuracion.isMobile==true ? '20px':'70px')}}
                                          animation={{ x:450,y: sumaY, opacity: 0, type: 'from', delay: sumDelay, repeat: -1,repeatDelay: 15500 }}
                                          name="TweenOne"
                                >
                                    <span style={{fontSize:'22px',borderRadius:'25px',color:'white',fontWeight:'600',backgroundColor:'#49B6F9',padding:'10px 10px 10px 10px'}}>{elemText}</span>
                                </TweenOne>
                            </div>
                        ) ;
                    })
                }
                <TweenOne key={"btbNextTO"}  style={{marginLeft:(this.props.configuracion.isMobile==true ? '20px':'70px')}}
                            animation={{ x:450,y: sumaY, opacity: 0, type: 'from', delay: (sumDelay+=900), repeat: -1,repeatDelay: 15500 }} name="TweenOne">
                    <div className="btn-continuar" key={"btbNext"}
                         style={{marginTop: '35px',width:'auto'}}
                    >
                        <AnimacionLink texto={"Nuestras intenciones:"} siguienteDiv={this.props.siguienteDiv} />
                    </div>
                </TweenOne>
            </div>
        )
    }
    //
} ;
//