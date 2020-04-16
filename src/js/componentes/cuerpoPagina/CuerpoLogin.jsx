/*
*
*/
import React                        from 'react' ;
import { Row, Col }                 from 'antd'  ;
//
export class CuerpoLogin extends React.Component {
    constructor(props){
        super(props) ;
    }
    //
    render(){
        //
        let styleImg = this.props.configuracion.isMobile==true ?
                        {width:'130px',height:'130px',marginTop:'20px'} : {width:'180px',height:'160px',marginTop:'20px'} ;
        //
        return(
            <div style={{paddingTop:'70px',minHeight:'110vh'}}  className="bg-login" >
                <div style={{marginTop:'90px'}} >
                    <Row>
                        <Col xs={6} md={6}   lg={8} xl={8} xxl={8} ></Col>
                        <Col xs={18} md={18} lg={3} xl={3} xxl={3} >
                            <a href="/auth/facebook/login">
                                <img src="/img/login-facebook.jpg"
                                    className="img-login-oauth" alt="login-facebook"
                                />
                            </a>
                        </Col>
                        <Col xs={24} md={24} lg={0} xl={0} xxl={0} >
                            <div style={{height:'10px',marginTop:'20px'}}></div>
                        </Col>
                        <Col xs={6} md={6} lg={1} xl={1} xxl={1} ></Col>
                        <Col xs={18} md={17} lg={3} xl={3} xxl={3} >
                            <a href="/auth/google/login">
                                <img src="/img/login-gmail.jpg"
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