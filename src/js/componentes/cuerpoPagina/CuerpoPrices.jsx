/*
*
*/
import React                            from 'react' ;
import { Typography, Row, Col, Icon }   from 'antd'  ;
import { Button }                       from 'antd'  ;
import Fade                             from 'react-reveal/Fade'  ;
import { AnimacionLink }                from '../animacion/AnimacionLink' ;
//
const { Title, Text }   = Typography ;
//
export class CuerpoPrices extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        return(
            <Row className="waiboc-home-prices" id="prices" >
                <Row>
                    <Col xs={2} md={2} lg={2} xl={2} xxl={2} ></Col>
                    <Col xs={16} md={16} lg={18} xl={18} xxl={18} >
                        <Title style={{width:'100%',textAlign:'center'}}><u>Planes</u></Title>
                    </Col>
                </Row>
                <Row style={{paddingTop:'5px'}}>
                    <Col xs={3}  md={3}  lg={3} xl={3} xxl={3} ></Col>
                    <Col xs={20} md={20} lg={8} xl={8} xxl={8} >
                        <Fade right >
                            <div className="box-plan">
                                <Row className="box-plan-item-important" >Basic</Row>
                                <Row className="box-plan-item-important" >
                                    <div className="plan-price" >
                                        $ 0,0025 USD
                                    </div>
                                </Row>
                                <Row>
                                    <div className="plan-wrapper-description" >
                                        <Icon type="check" className="waiboc-icon-plan" />
                                        <span className="waiboc-plan-description" >Dashboard</span>
                                    </div>
                                </Row>
                                <Row>
                                    <Icon type="check" className="waiboc-icon-plan" />
                                    <span className="waiboc-plan-description" >{this.props.translate.plan.metrics}</span>
                                </Row>
                                <Row>
                                    <Icon type="close" className="waiboc-icon-plan no-support" />
                                    <span className="waiboc-plan-description" >{this.props.translate.plan.chatbotTrainingSupport}</span>
                                </Row>
                                <Row className="box-plan-item-important" >
                                    <a>{this.props.translate.plan.createAccount}</a>
                                </Row>
                            </div>
                        </Fade>
                    </Col>
                    <Col xs={3}  md={3}  lg={3} xl={1} xxl={1} ></Col>
                    <Col xs={20} md={20} lg={8} xl={8} xxl={8} >
                        <Fade right >
                            <div className="box-plan">
                                <Row className="box-plan-item-important" >Basic</Row>
                                <Row className="box-plan-item-important" >
                                    <div className="plan-price" >
                                        CUSTOM
                                    </div>
                                </Row>
                                <Row>
                                    <div className="plan-wrapper-description" >
                                        <Icon type="check" className="waiboc-icon-plan" />
                                        <span className="waiboc-plan-description" >Dashboard</span>
                                    </div>
                                </Row>
                                <Row>
                                    <Icon type="check" className="waiboc-icon-plan" />
                                    <span className="waiboc-plan-description" >{this.props.translate.plan.metrics}</span>
                                </Row>
                                <Row>
                                    <Icon type="check" className="waiboc-icon-plan" />
                                    <span className="waiboc-plan-description" >{this.props.translate.plan.chatbotTrainingSupport}</span>
                                </Row>
                                <Row className="box-plan-item-important" >
                                    <a href="/contact">{this.props.translate.contactUs}</a>
                                </Row>
                            </div>
                        </Fade>
                    </Col>
                </Row>
                <Row style={{minHeight:'20px'}} ></Row>
            </Row>
        )
    }
    //
} ;
//