/*
*
*/
import React                              from 'react' ;
import { Row, Col }                       from 'antd'  ;
import { withRouter }                     from "react-router-dom" ;
import { ActionButtons }                  from './ActionButtons'  ;
import { FormEmailHome }                  from '../formularios/FormEmailHome' ;
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
        return(
            <Row style={{backgroundColor:'inherit'}}  >
                    <Row>
                        <Col xs={0}  md={0} lg={11} xl={11} xxl={11}  >
                            <FormEmailHome onEnter={this.onEnterEmail} translate={this.props.translate} />
                        </Col>
                        <Col xs={1}  md={1}  lg={0}  xl={0}  xxl={0} ></Col>
                        <Col xs={22} md={22} lg={12} xl={12} xxl={12} >
                            <Row >
                                <div key={"title"} >
                                    <span className={"chat-line-home title fadeIn"} >{this.props.translate.homeHeader.title}</span>
                                </div>
                                {
                                    this.props.translate.homeHeader.text.map((elemText,elemIdx)=>{
                                        return(
                                            <div key={elemIdx} >
                                                <span className={"chat-line-home sub-title fadeIn"} >{elemText}</span>
                                            </div>
                                        ) ;
                                    })
                                }
                            </Row>
                            <ActionButtons showLoginButton={false} translate={this.props.translate} siguienteDiv={this.props.siguienteDiv} />
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