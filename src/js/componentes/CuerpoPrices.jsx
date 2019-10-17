/*
*
*/
import React                            from 'react' ;
import { Typography, Row, Col, Icon }   from 'antd'  ;
//
import '../../css/estilosPrices.css' ;
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
            <div style={{paddingTop:'120px',minHeight:'110vh'}} className="bg-prices" >
                <Row>
                    <Col xs={2} md={2} lg={2} xl={2} xxl={2} ></Col>
                    <Col xs={16} md={16} lg={18} xl={18} xxl={18} >
                        <Title style={{width:'100%',textAlign:'center'}}><u>Planes</u></Title>
                    </Col>
                </Row>
                <Row style={{paddingTop:'50px'}}>
                    <Col xs={3}  md={3}  lg={3} xl={3} xxl={3} ></Col>
                    <Col xs={20} md={20} lg={8} xl={8} xxl={8} >
                        <div className="box-plan">
                            <div className="box-plan-item-important" >Beta</div>
                            <div className="box-plan-item-important" >
                                {this.props.translate.plan.free}
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text><b>600</b> {this.props.translate.plan.messagesXmonth}</Text>
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text>Dashboard</Text>
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text>{this.props.translate.plan.metrics}</Text>
                            </div>
                            <div className="box-plan-item-important" >
                                <a>{this.props.translate.plan.createAccount}</a>
                            </div>
                        </div>
                    </Col>
                    <Col xs={3}  md={3}  lg={3} xl={1} xxl={1} ></Col>
                    <Col xs={20} md={20} lg={8} xl={8} xxl={8} >
                        <div className="box-plan">
                            <div className="box-plan-item-important" >Custom</div>
                            <div className="box-plan-item-important" >
                                {this.props.translate.plan.customMsg}
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text><b>Custom</b></Text>
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text>Dashboard</Text>
                            </div>
                            <div>
                                <Icon type="check" />
                                <Text>{this.props.translate.plan.metrics}</Text>
                            </div>
                            <div className="box-plan-item-important" >
                                <a href="/contact">{this.props.translate.contactUs}</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{minHeight:'100px'}}>

                </Row>
            </div>
        )
    }
    //
} ;
//