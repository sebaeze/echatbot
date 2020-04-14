/*
*
*/
import React                              from 'react' ;
import { Row, Col, Typography, Button }           from 'antd'  ;
import { withRouter }                     from "react-router-dom" ;
import { AnimacionLink }                  from '../animacion/AnimacionLink' ;
//
const { Title } = Typography ;
//
class PageHeaderChatbot  extends  React.Component {
    //
    constructor(props){
        super(props) ;
    } ;
    //
    render(){
        return(
            <Row style={{backgroundColor:'inherit'}} >
                <Row>
                        <Col xs={1} md={1} lg={2} xl={2} xxl={2} ></Col>
                        <Col xs={22} md={22} lg={20} xl={20} xxl={20} >
                            <Title level={ this.props.configuracion.isMobile==true ? 3 : 2 } >
                                {this.props.translate.homeHeader.title}
                            </Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={0}  md={0} lg={12} xl={12} xxl={12} >
                        </Col>
                        <Col xs={1}  md={1}  lg={0}  xl={0}  xxl={0} ></Col>
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
        )
    }
    //
} ;
//
export default withRouter(PageHeaderChatbot) ;
//