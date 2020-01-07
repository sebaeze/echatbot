/*
*
*/
import React                                      from 'react' ;
import { Typography, Row, Col, Button }           from 'antd'  ;
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
        //  <Title level={1} style={{marginBottom:(this.props.configuracion.isMobile==true ? '0': false)}}>{this.props.configuracion.empresa.name}</Title>
        return(
            <div id={this.props.id} style={{minHeight:'90vh'}} className="bg-inicial" >
                <Row style={ this.props.configuracion.isMobile==true ? {} : {paddingTop:'90px'}}>
                    <Col xs={1} md={1} lg={2} xl={2} xxl={2} ></Col>
                    <Col xs={22} md={22} lg={10} xl={10} xxl={10} >
                        <Title level={2} >{this.props.translate.homeHeader.title}</Title>
                        {
                            this.props.translate.homeHeader.text.map((elemText,elemIdx)=>{
                                return(
                                    <div key={elemIdx} style={{marginTop:(this.props.configuracion.isMobile==true ? '1px' : '15px'),
                                                    paddingTop:(this.props.configuracion.isMobile==true ? '5px' : '10px'),
                                                    width:'95%'}}
                                    >
                                        <span className="chat-line-home fadeIn" >{elemText}</span>
                                    </div>
                                ) ;
                            })
                        }
                        <div style={{marginTop: '35px',width:'auto'}} >
                            <AnimacionLink texto={
                                            <Button type="primary" size="large" style={{backgroundColor:'#ADDF95'}}>
                                                {this.props.translate.moreInfo}
                                            </Button>
                                        }
                                        styleCss={{float: 'left', display: 'inline-block', position: 'relative' }}
                                        offset={130}
                                        siguienteDiv={this.props.siguienteDiv}
                            />
                            <Button type="primary" size="large"
                                    style={{backgroundColor:'#ADDF95', marginLeft:'7px'}}
                                    onClick={(argEV)=>{argEV.preventDefault();location.href="/account";}}
                            >
                                {this.props.translate.login}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    //
} ;
//