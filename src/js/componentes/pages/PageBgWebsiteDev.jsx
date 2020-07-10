/*
*
*/
import React                                      from 'react' ;
import { withRouter }                             from "react-router-dom" ;
import { Row, Col   }                             from 'antd'  ;
import { ActionButtons }                          from './ActionButtons'  ;
import { styleHomeMoreInfo }                      from '../style/styleHome' ;
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
                <Col xs={0}  md={0}  lg={2}  xl={2}  xxl={2} ></Col>
                    <Col xs={23} md={23} lg={22} xl={22} xxl={22}>
                    <Row>
                        <div key={"title"} >
                            <span className={"chat-line-home title fadeIn"} >{homeWebsitDev.title}</span>
                        </div>
                    </Row>
                    <Row >
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
                        </Col>
                    </Row>
                    <Row className="waiboc-home-row-moreinfo"  >
                        <Col xs={1}  md={1}  lg={5}  xl={5}  xxl={5} ></Col>
                        <Col xs={22} md={22} lg={14} xl={14} xxl={14} >
                            <ActionButtons showLoginButton={true} translate={this.props.translate} siguienteDiv={this.props.siguienteDiv} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
    //
} ;
//
export default withRouter(PageBgWebsiteDev) ;
//