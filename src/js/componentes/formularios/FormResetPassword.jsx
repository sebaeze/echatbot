/*
*
*/
import React                                        from 'react' ;
import { Icon, Input, Button, Form, Spin }          from 'antd'  ;
import { Row, Col }                                 from 'antd'  ;
import { api }                                      from '../../api/api' ;
//
const PasswordResetConfirmation = (props) => {
    return(
        <div style={{width:'100%',height:'100%'}} >
            <Icon type="check-circle" style={{fontSize:'55px',color:'green'}} />
            <h2>En minutos le llegara un email con instrucciones para el reseteo de la password.</h2>
        </div>
    ) ;
}
/*
const onChange = (argEE) => {
    console.log('....onChange:: targer: ',argEE.target.value) ;
} ;
*/
class FormResetPasswordBase extends React.Component {
    //
    constructor(props){
        super(props) ;
        this.state = {
            flagSpinner: false,
            resetUrl: this.props.resetUrl ? this.props.resetUrl : false
        } ;
        this.onPressEnterEmail   = this.onPressEnterEmail.bind(this)   ;
        this.onSubmitGetPassword = this.onSubmitGetPassword.bind(this) ;
    } ;
    /*
    static getDerivedStateFromProps(newProps, state) {
        if ( state.resetUrl!=newProps.resetUrl ){
            let newState          = {
                resetUrl: newProps.resetUrl
            } ;
            return newState ;
        } else {
            return false ;
        }
    }
    */
    //
    onPressEnterEmail(argEE){
        //
        if ( argEE && argEE.preventDefault ){
            argEE.preventDefault();
        }
        //
        this.props.form.setFields({  emailReset: { value: argEE.target.value  }  }) ;
        this.onSubmitGetPassword() ;
        //
    }
    //
    onSubmitGetPassword(argEE){
        try {
            //
            if ( argEE && argEE.preventDefault ){ argEE.preventDefault() ; }
            //
            let tempValores = this.props.form.getFieldsValue() ;
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFieldsAndScroll({ force: true }, (error) => {
              if (error) {
                  this.setState({flagSpinner:false}) ;
              } else {
                  api.account.passwordReset( {...tempValores } )
                        .then((respCC)=>{
                            this.setState({resetUrl: respCC,flagSpinner:false}) ;
                        })
                        .catch((respErr) => {
                            console.dir(respErr) ;
                            this.setState({flagSpinner:false}) ;
                        }) ;
                  //
              } ;
            }) ;
            //
        } catch(errNU){
            console.log('...errNU: ',errNU) ;
        }
    }
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        let formItemsProps = (window.innerWidth>796) ? {hasFeedback:true} : {} ;
        let inputProps     = this.state.resetUrl==false ? {} : {disabled: true} ;
        let labelCol   = {xs:0,md:0,lg:4,xl:4,xxl:4} ;
        let wrapperCol = {xs:24,md:24,lg:18,xl:18,xxl:18} ;
        //
        return(
            <Row>
                <Col {...labelCol} ></Col>
                <Col {...wrapperCol} >
                <Form>
                    <Form.Item  key="form-item-inp-email-reset" {...formItemsProps}
                        >
                            {
                                getFieldDecorator('emailReset', {
                                    suppressWarning: true,
                                    trigger: 'onBlur',
                                    valuePropName: 'defaultValue',
                                    initialValue: '',
                                    rules: [ { required: true, suppressWarning: true,type: 'email', message: 'Email incorrecto.' } ]
                                })
                                (
                                    <Input placeholder="Tu Email" name="emailReset" size="large" {...inputProps}
                                        style={{height:'60px',boxShadow:'0 7px 6px -6px #999999'}}   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        onPressEnter={this.onPressEnterEmail}
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item key="form-item-inp-password" {...formItemsProps}  >
                            {
                                this.state.flagSpinner==true
                                    ?   <Spin size="large" />
                                    :   <Button key="getPsw" type="primary" size="large" onClick={this.onSubmitGetPassword}  {...inputProps}  >
                                            {this.props.translate.form.buttonGetPassword}
                                        </Button>
                            }
                        </Form.Item>
                        {
                            this.state.resetUrl==false
                                ?   null
                                :   <PasswordResetConfirmation key="key-psw-reset-flag" flagSpinner={this.state.flagSpinner} />
                        }
                    </Form>
                </Col>
            </Row>
        )
    }
    //
} ;
//
export const FormResetPassword = Form.create({name: 'FormPasswordReset',
    mapPropsToFields(props) {
        return {
            emailReset:   Form.createFormField({ value: '' })
        };
    }
})(FormResetPasswordBase) ;
//