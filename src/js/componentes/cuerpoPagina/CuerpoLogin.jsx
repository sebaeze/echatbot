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
        return(
            <div style={{paddingTop:'100px',minHeight:'110vh'}}  className="bg-login" >
                <div style={{marginTop:'100px'}} >
                    <Row>
                        <Col xs={2} md={2} lg={6} xl={6} xxl={6} ></Col>
                        <Col xs={5} md={5} lg={3} xl={3} xxl={3} >
                            <a href="/auth/facebook/login">
                                <img src="/img/login-facebook.jpg" className="img-login-oauth" alt="login-facebook" />
                            </a>
                        </Col>
                        <Col xs={5} md={5} lg={3} xl={3} xxl={1} style={{marginLeft:'10px'}}>
                            <a href="/auth/google/login">
                                <img src="/img/login-gmail.jpg" className="img-login-oauth" alt="login-facebook" />
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