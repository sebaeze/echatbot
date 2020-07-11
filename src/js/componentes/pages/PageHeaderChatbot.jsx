/*
*
*/
import React                              from 'react' ;
import { Row, Col }                       from 'antd'  ;
import { withRouter }                     from "react-router-dom" ;
import { ActionButtons }                  from './ActionButtons'  ;
import { FormEmailHome }                  from '../formularios/FormEmailHome' ;
import { styleHomeTryUs }                 from '../style/styleHome' ;
//
class PageHeaderChatbot  extends  React.Component {
    //
    constructor(props){
        super(props) ;
        this.onEnterEmail = this.onEnterEmail.bind(this) ;
    } ;
    //
    onEnterEmail(argEE){
        try {
            console.log('...onEnterEmail') ;
        } catch(errOEE){
            console.log('...ERROR: ',errOEE) ;
        }
    }
    //
    render(){
        /* 
<Title level={ this.props.configuracion.isMobile==true ? 3 : 2 } >
    {this.props.translate.homeHeader.title}
</Title>
        */
       // className="waiboc-home-email-in"
       //  <Col xs={1}  md={1}  lg={0}  xl={0}  xxl={0} ></Col>
       //
        return(
            <Row style={{backgroundColor:'inherit'}}  >
                    <Row>
                        <Col xs={0}  md={0}  lg={5}  xl={5}  xxl={5} ></Col>
                        <Col xs={23} md={23} lg={18} xl={18} xxl={18}>
                            <Row className="box-home-bg" >
                                <Row >
                                    <div key={"title"} >
                                        <span className={"chat-line-home title fadeIn"} >{this.props.translate.homeHeader.title}</span>
                                    </div>
                                </Row>
                                <Row>
                                    <Col xs={0}  md={0}  lg={3} xl={3} xxl={3} ></Col>
                                    <Col xs={24} md={24} lg={10} xl={10} xxl={10} >
                                        {
                                            this.props.translate.homeHeader.text.map((elemText,elemIdx)=>{
                                                return(
                                                    <div key={elemIdx} >
                                                        <span className={"chat-line-home sub-title fadeIn"} >{elemText}</span>
                                                    </div>
                                                ) ;
                                            })
                                        }
                                    </Col>
                                </Row>
                            </Row>
                            <Row className="waiboc-home-email-us" >
                                <Col xs={0}  md={0}  lg={2}  xl={2}  xxl={2} ></Col>
                                <Col xs={24} md={24} lg={15} xl={15} xxl={15}>
                                    <FormEmailHome  onEnter={this.onEnterEmail} translate={this.props.translate}
                                                bottomBlock={true}
                                            />
                                </Col>
                            </Row>
                            <Row className="waiboc-home-tryus" >
                                <Col xs={0}  md={0}  lg={2}  xl={2}  xxl={2} ></Col>
                                <Col xs={24} md={24} lg={15} xl={15} xxl={15}>
                                    <ActionButtons showLoginButton={false} translate={this.props.translate} siguienteDiv={this.props.siguienteDiv} />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={1}  md={1}  lg={0}  xl={0}  xxl={0} ></Col>
                    </Row>
            </Row>
        )
    }
    //
} ;
//
export default withRouter(PageHeaderChatbot) ;
//