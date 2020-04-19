/*
*
*/
import React                                      from 'react' ;
import { withRouter }                             from "react-router-dom" ;
import { Row, Col, Typography, Button }           from 'antd'  ;
import { AnimacionLink }                          from '../animacion/AnimacionLink' ;
//
class PageBgWebsiteDev  extends  React.Component {
    //
    constructor(props){
        super(props) ;
    } ;
    //
    render(){
        //
        let { homeWebsitDev } = this.props.translate ;
        //
        return(
            <Row style={{backgroundColor:'inherit'}}  >
                    <Row>
                        <div key={"title"} >
                            <span className={"chat-line-home title fadeIn"} >{homeWebsitDev.title}</span>
                        </div>
                    </Row>
                    <Row>
                        <Col xs={1}  md={1}  lg={2}  xl={2}  xxl={2} ></Col>
                        <Col xs={22} md={22} lg={14} xl={14} xxl={14} >
                            <Row className="waiboc-home-web-dev">
                                {
                                    homeWebsitDev.text.map((elemText,elemIdx)=>{
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
                        <Col xs={0}  md={0} lg={11} xl={11} xxl={11} >
                        </Col>
                    </Row>
            </Row>
        )
    }
    //
} ;
//
export default withRouter(PageBgWebsiteDev) ;
//