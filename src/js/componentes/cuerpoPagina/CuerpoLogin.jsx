/*
*
*/
import React                        from 'react' ;
import { Row, Col }                 from 'antd'  ;
//
import '../../../css/estilosCuerpo.css' ;
//
export class CuerpoLogin extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        //
        let styleImg = this.props.configuracion.isMobile==true ? {maxWidth:'100px',marginTop:'20px'} : {} ;
        //
        return(
            <div style={{paddingTop:'100px',minHeight:'110vh'}}  className="bg-login" >
                <div style={{marginTop:'150px'}} >
                    <Row>
                        <Col xs={6} md={6}   lg={8} xl={8} xxl={8} ></Col>
                        <Col xs={18} md={18} lg={3} xl={3} xxl={3} >
                            <a href="/auth/facebook/login">
                                <img src="/img/login-facebook.jpg"
                                    style={styleImg}
                                    className="img-login-oauth" alt="login-facebook"
                                />
                            </a>
                        </Col>
                        <Col xs={6} md={6} lg={1} xl={1} xxl={1} ></Col>
                        <Col xs={18} md={17} lg={3} xl={3} xxl={3} >
                            <a href="/auth/google/login">
                                <img src="/img/login-gmail.jpg"
                                     style={styleImg}
                                     className="img-login-oauth" alt="login-facebook"
                                />
                            </a>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
    //
} ;
//