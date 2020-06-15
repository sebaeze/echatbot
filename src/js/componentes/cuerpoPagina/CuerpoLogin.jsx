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
                            emailUser={props.emailUser}
                            />
            </Row>
            : <UserLogged   userInfo={props.userInfo}  /> ;
    //
    if ( props.userInfo!=false ){
        setTimeout(() => {
            props.onLogin( props.userInfo )  ;
        }, 2000 );
    }
    //
    return( outLogging ) ;
}
//
export class CuerpoLogin extends React.Component {
    constructor(props){
        super(props) ;
        this.state  = {
            emailUser: false,
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
        let emailFromHome = new URLSearchParams(window.location.search).get('email') || false ;
        if ( emailFromHome ){
            this.setState({ emailUser: emailFromHome }) ;
        } else {
            api.account.getUserInfo( true )
                .then((userInfo)=>{
                    if ( userInfo!=false ){
                        this.setState({userInfo:userInfo}) ;
                    }
                })
                .catch((respErr)=>{
                    console.log('...respErr: ',respErr) ;
                })
        }
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
            <div className="waiboc-login" >
                <div >
                    <Row style={{paddingTop:'110px'}} >
                        <Col xs={24} md={24}   lg={12} xl={12} xxl={12} >
                            <LoginUserPassword emailUser={this.state.emailUser} userInfo={this.state.userInfo} onLogin={this.onFinishLogin} flagRegistrar={this.state.flagRegistrar} translate={this.props.translate} />
                        </Col>
                        <Col xs={0} md={0} lg={1} xl={1} xxl={1} ></Col>
                        <Col xs={24} md={24} lg={10} xl={10} xxl={10} className="panel-oauth" >
                            <a href="/auth/facebook/login" className="link-oauth" >
                                <img src="/img/login-facebook.jpg" alt="login-facebook"
                                />
                            </a>
                            <a href="/auth/google/login">
                                <img src="/img/login-gmail.jpg" alt="login-facebook"
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