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
            <div id={this.props.id} style={{minHeight:'80vh'}} className="bg-inicial" >
                <Row style={ this.props.configuracion.isMobile==true ? {} : {paddingTop:'10px'}}>
                    <Row>
                        <Col xs={1} md={1} lg={2} xl={2} xxl={2} ></Col>
                        <Col xs={22} md={22} lg={20} xl={20} xxl={20} >
                            <Title level={ this.props.configuracion.isMobile==true ? 3 : 2 } >
                                {this.props.translate.homeHeader.title}
                            </Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} md={1} lg={2} xl={2} xxl={2} ></Col>
                        <Col xs={22} md={22} lg={11} xl={11} xxl={11} >
                            {
                                this.props.translate.homeHeader.text.map((elemText,elemIdx)=>{
                                    return(
                                        <div key={elemIdx}
                                            style={{marginTop:(this.props.configuracion.isMobile==true ? '1px' : '15px'),
                                            paddingTop: '1px', width:'95%'}}
                                        >
                                            <span className="chat-line-home fadeIn" >{elemText}</span>
                                        </div>
                                    ) ;
                                })
                            }
                            <div style={{marginTop: '15px',width:'auto'}} >
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
                </Row>
            </div>
        )
    }
    //
} ;
//