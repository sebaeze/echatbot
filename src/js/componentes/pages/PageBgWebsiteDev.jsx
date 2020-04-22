/*
*
*/
import React                                      from 'react' ;
import { withRouter }                             from "react-router-dom" ;
import { Row, Col   }                             from 'antd'  ;
import { ActionButtons }                          from './ActionButtons'  ;
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
                            <ActionButtons translate={this.props.translate} siguienteDiv={this.props.siguienteDiv} />
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