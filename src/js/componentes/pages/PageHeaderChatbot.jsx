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
        /*
<Title level={ this.props.configuracion.isMobile==true ? 3 : 2 } >
    {this.props.translate.homeHeader.title}
</Title>
        */
        return(
            <Row style={{backgroundColor:'inherit'}} >
                    <Row>
                        <Col xs={0}  md={0} lg={11} xl={11} xxl={11} >
                        </Col>
                        <Col xs={1}  md={1}  lg={0}  xl={0}  xxl={0} ></Col>
                        <Col xs={22} md={22} lg={12} xl={12} xxl={12} >
                            <Row>
                                <div key={"title"} >
                                    <span className={"chat-line-home title fadeIn"} >{this.props.translate.homeHeader.title}</span>
                                </div>
                                {
                                    this.props.translate.homeHeader.text.map((elemText,elemIdx)=>{
                                        // let tempClassN = elemIdx==0 ? "chat-line-home title fadeIn" : "chat-line-home sub-title fadeIn" ;
                                        return(
                                            <div key={elemIdx} >
                                                <span className={"chat-line-home sub-title fadeIn"} >{elemText}</span>
                                            </div>
                                        ) ;
                                    })
                                }
                            </Row>
                            <Row className="waiboc-home-row-actions" >
                                <Button type="primary" size="large" className="waiboc-btn-action"
                                        onClick={(argEV)=>{argEV.preventDefault();location.href="/account";}}
                                >
                                    {this.props.translate.login}
                                </Button>
                                <AnimacionLink texto={
                                                <Button type="primary" size="large" className="waiboc-btn-action" >
                                                    {this.props.translate.moreInfo}
                                                </Button>
                                            }
                                            offset={130}
                                            siguienteDiv={this.props.siguienteDiv}
                                />
                            </Row>
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