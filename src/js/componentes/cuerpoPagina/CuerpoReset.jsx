/*
*
*/
import React                              from 'react' ;
import { Row, Col, Icon, Spin}            from 'antd'  ;
import { Form, Input, Button }            from 'antd'  ;
import { api }                            from '../../api/api' ;
//
import { APP_GLOBALES }                         from '../../../../server/config/variablesGlobales' ;
//
class CuerpoResetBase extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            flagResetOk: false,
            flagSpinner: false,
            resetUrl: false
        } ;
        this.onchangeEmail        = this.onchangeEmail.bind(this) ;
        this.onSubmitNewtPassword = this.onSubmitNewtPassword.bind(this) ;
    } ;
    //
    onSubmitNewtPassword(argEE){
        try {
            argEE.preventDefault() ;
            let tempValores = this.props.form.getFieldsValue() ;
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  this.setState({flagSpinner:false}) ;
              } else {
                  api.account.passwordChange( {...tempValores, token: this.props.match.params.token } )
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
        } catch(errSNP){
            console.log(errSNP) ;
        }
    }
    //
    onchangeEmail(argEE){
        
    }
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        //
        return(
            <div style={{paddingTop:'100px',minHeight:'90vh',marginTop:'150px'}} >
             {
               this.state.flagResetOk==false
                ? <Row>
                    <Col xs={2}  md={2}  lg={7} xl={7} xxl={7} ></Col>
                    <Col xs={20} md={20} lg={7} xl={7} xxl={7} >
                        {
                            this.state.resetUrl==false
                                ?   <Form >
                                        <Form.Item hasFeedback >
                                            {
                                                getFieldDecorator('email', {
                                                    suppressWarning: true,
                                                    trigger: 'onBlur',
                                                    valuePropName: 'defaultValue',
                                                    initialValue: this.props.match.params.email,
                                                    rules: [
                                                        { required: true, suppressWarning: true,type: 'email', message: 'Email incorrecto.' }
                                                    ],
                                                }
                                                )
                                                (
                                                    <Input placeholder="Tu Email" onChange={this.onchangeEmail} style={{height:'60px',boxShadow:'0 7px 6px -6px #999999'}} disabled  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                                )
                                            }
                                        </Form.Item>
                                        <Form.Item hasFeedback >
                                            {
                                                getFieldDecorator('password', {
                                                    suppressWarning: true,
                                                    trigger: 'onBlur',
                                                    valuePropName: 'defaultValue',
                                                    initialValue: '',
                                                    rules: [
                                                        { required: true, suppressWarning: true, message: 'Por favor, ingrese la password.' }
                                                    ],
                                                }
                                                )
                                                (
                                                    <Input.Password placeholder="Password" style={{height:'60px',boxShadow:'0 7px 6px -6px #999999'}} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                                )
                                            }
                                        </Form.Item>
                                        <Form.Item>
                                            {
                                                this.state.flagSpinner==true
                                                    ?   <Spin size="large" />
                                                    :   <Button type="primary" onClick={this.onSubmitNewtPassword}   >
                                                            {this.props.translate.form.buttonChangePassword}
                                                        </Button>
                                            }
                                        </Form.Item>
                                    </Form>
                                :   <div style={{width:'100%',height:'100%'}} >
                                        {
                                            this.state.resetUrl.resultCode==APP_GLOBALES.RESULT_CODES.OK
                                                ?   <div>
                                                        <Icon type="check-circle" style={{fontSize:'55px',color:'green'}} />
                                                        <h2>Perfecto !</h2>
                                                        <h4>Su usuario / password puede ser usado.</h4>
                                                    </div>
                                                :   <div>
                                                        <Icon type="stop" style={{fontSize:'55px',color:'red'}} />
                                                        <h2>{this.state.resetUrl.result.error}</h2>
                                                        <h4>Intente restaurar la password nuevamente </h4>
                                                    </div>
                                        }
                                    </div>
                        }

                    </Col>
                  </Row>
                : <div style={{}} >
                    Gracias {this.state.userInfo.email}
                  </div>
             }
          </div>
        )
    }
    //
} ;
//
export const CuerpoReset = Form.create({name: '',
    mapPropsToFields(props) {
        return {
            email:        Form.createFormField({ value: props.match.params.email }),
            password:     Form.createFormField({ value: '' }),
            token:        Form.createFormField({ value: '' }),
        };
    }
})(CuerpoResetBase) ;
//