/*
*
*/
import React                                                    from 'react' ;
import { Row, Col  }                                            from 'antd'  ;
import { FormEmailPassword }                                    from './FormEmailPassword' ;
import { FormResetPassword }                                    from './FormResetPassword' ;
//
const LoginBody = (props) => {
    let outBody = <div></div>  ;
    try {
        if ( props.flagForgotPassword==true ){
            outBody = <FormResetPassword resetUrl={props.resetUrl} flagSpinner={props.flagSpinner} onAccept={props.onAccept} onSubmitGetPassword={props.onSubmitGetPassword} translate={props.translate} /> ;
        } else {
            outBody = <FormEmailPassword flagRegistrar={props.flagRegistrar} onFinishReset={props.onFinishReset} flagSpinner={props.flagSpinner} onAccept={props.onAccept} translate={props.translate} forgetMyPassword={props.forgetMyPassword} /> ;
        }
    } catch(errLB){
        console.log('...errLB: ',errLB) ;
    }
    return( outBody ) ;
}
//
export class FormLogin extends React.Component {
    constructor(props){
        super(props) ;
        this.state            = {
            flagForgotPassword: false,
            flagSpinner:false,
            resetUrl: false
        } ;
        this.forgetMyPassword = this.forgetMyPassword.bind(this) ;
        this.onAcceptUserPassword = this.onAcceptUserPassword.bind(this) ;
        this.onFinishReset        = this.onFinishReset.bind(this) ;
    }
    //
    onAcceptUserPassword(argOpt){
        try {
            // api.debug.display( '......FormLogin: onAcceptUserPassword: ', argOpt ) ;
            this.props.onLogin( argOpt ) ;
        } catch(errOAUP){
            console.log('....ERROR:: errOAUP: ',errOAUP) ;
        }
    }
    //
    forgetMyPassword(){
        try {
            this.setState({flagForgotPassword: true}) ;
        } catch(errFP){
            console.dir(errFP) ;
        }
    }
    //
    onFinishReset(argOpt){
        this.setState({resetUrl: argOpt}) ;
    }
    /*
    componentDidMount(){
        window.addEventListener('touchmove', ev => {
            if (weShouldStopDefaultScrollAndZoom) {
              ev.preventDefault();
              ev.stopImmediatePropagation();
            };
          }, { passive: false });
    }
    */
    //
    render(){
        //
        // api.debug.display( '....FormLogin: render: ', this.state ) ;
        //
        return(
            //
            <Row className="waiboc-cl-form" >
                <Col xs={1}  md={1}  lg={1}  xl={1} xxl={1} ></Col>
                <Col xs={22} md={22} lg={22} xl={22} xxl={22} >
                        <LoginBody flagSpinner={this.state.flagSpinner}
                                flagRegistrar={this.props.flagRegistrar}
                                onAccept={this.onAcceptUserPassword}
                                onSubmitGetPassword={this.onSubmitGetPassword}
                                translate={this.props.translate}
                                resetUrl={this.state.resetUrl}
                                forgetMyPassword={this.forgetMyPassword}
                                onFinishReset={this.onFinishReset}
                                flagForgotPassword={this.state.flagForgotPassword}
                        />
                </Col>
            </Row>
        ) ;
    }
} ;
//