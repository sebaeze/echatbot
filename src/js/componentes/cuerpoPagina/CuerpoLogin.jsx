/*
*
*/
import React                        from 'react' ;
import { Row, Col, Icon }           from 'antd'  ;
import { FormLogin }                from '../formularios/FormLogin' ;
import { api }                      from '../../api/api' ;
//
export const UserLogged = (props) => {
    //
    return(
      <div style={{width:'100%',textAlign:'center',fontWeight:'600',fontSize:'28px',paddingTop:'30px'}} >
        <Icon type="check-circle" style={{fontSize:'55px',color:'green'}} />
        <div style={{marginLeft:'5px'}} >{props.userInfo==false ? "" : props.userInfo.email}</div>
      </div>
    ) ;
}
//
const LoginUserPassword = (props) => {
    let outLogging = props.userInfo==false
            ? <Row>
                <FormLogin  flagRegistrar={props.flagRegistrar}
                            onLogin={props.onLogin}
                            translate={props.translate}
                            />
            </Row>
            : <UserLogged   userInfo={props.userInfo}  /> ;
    return( outLogging ) ;
}
//
export class CuerpoLogin extends React.Component {
    constructor(props){
        super(props) ;
        this.state  = {
            userInfo: false,
            flagLoginAlone: this.props.flagLoginAlone ? this.props.flagLoginAlone : false,
            flagRegistrar: this.props.flagRegistrar ? this.props.flagRegistrar : false,
        } ;
        this.onFinishLogin = this.onFinishLogin.bind(this) ;
        console.log('...onconstructos') ;
    }
    //
    componentDidMount(){
        //
        api.account.getUserInfo()
            .then((userInfo)=>{
                if ( userInfo!=false ){
                    this.setState({userInfo:userInfo}) ;
                }
            })
            .catch((respErr)=>{
                console.log('...respErr: ',respErr) ;
            })
        //
    }
    //
    onFinishLogin(argOPT){
        try {
        // api.debug.display( '....CuerpoAuth: onFinishLogin: ', argOPT ) ;
        // console.log( '....CuerpoAuth: onFinishLogin: ', argOPT ) ;
        //
        if ( argOPT && argOPT!=false ){
            this.setState({userInfo: argOPT}) ;
            if ( this.props.onLogin ){
                this.props.onLogin(argOPT)
            } else {
            let urlRedirect   = new URLSearchParams(window.location.search).get('urlRedirect') || false ;
            console.log('...urlRedirect: ',urlRedirect,' search: ',window.location.search) ;
            if ( urlRedirect!=false ){
                // this.props.history.push( urlRedirect ) ; <--- En la practica es preferible que redireccione y cargue todo de nuevo
                window.location.href = urlRedirect ;
            }
            }
        }
        //
        } catch(errOFL){
        console.log('....ERROR: ',errOFL) ;
        }
    }
    //
    render(){
        //
        return(
            <div style={{paddingTop:'70px',minHeight:'110vh'}}  className="bg-inicial" >
                <div >
                    <Row style={{paddingTop:'110px'}} >
                        <Col xs={24} md={24}   lg={12} xl={12} xxl={12} >
                            <LoginUserPassword userInfo={this.state.userInfo}  onLogin={this.onFinishLogin} flagRegistrar={this.state.flagRegistrar} translate={this.props.translate} />
                        </Col>
                        <Col xs={0} md={0} lg={1} xl={1} xxl={1} ></Col>
                        <Col xs={18} md={18} lg={2} xl={2} xxl={2} >
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
                        <Col xs={18} md={17} lg={2} xl={2} xxl={2} >
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