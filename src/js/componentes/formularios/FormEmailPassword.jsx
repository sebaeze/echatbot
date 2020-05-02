/*
*
*/
import React                                                 from 'react' ;
import { Form, Input, Icon, Row, Button, Spin, Col }         from 'antd'  ;
//
import { FormPhoneNumber }                                   from './FormPhoneNumber' ;
import { api }                                               from '../../api/api' ;
import { APP_GLOBALES }                                      from '../../../../server/config/variablesGlobales' ;

//
class FormEmailPasswordBase extends React.Component {
    constructor(props){
        super(props) ;
        let tempFlagRegistrar = this.props.flagRegistrar ? this.props.flagRegistrar : false ;
        this.state = {
            flagSpinner: this.props.flagSpinner ? this.props.flagSpinner : false ,
            flagRegistration: tempFlagRegistrar,
            /*
            buttonTypeNew: tempFlagRegistrar==true   ? "primary" : "dashed",
            buttonTypeLogin: tempFlagRegistrar==true ? "dashed"  : "primary",
            */
            fields:{}
        }
        this.refEmail      = false ;
        this.flagNewUser   = false ;
        this.inputEmailRef = false ;
        this.inputPswRef   = false ;
        this.onChangeEmail        = this.onChangeEmail.bind(this)  ;
        this.onChangePass         = this.onChangePass.bind(this)   ;
        this.onSubmitForm         = this.onSubmitForm.bind(this)   ;
        this.onChangeInput        = this.onChangeInput.bind(this)  ;
        this.onSubmitFormNewUser  = this.onSubmitFormNewUser.bind(this)  ;
        this.onSubmitGetPassword  = this.onSubmitGetPassword.bind(this)  ;
        // this.onFocus              = this.onFocus.bind(this) ;
        // this.refFocus             = false ;
    } ;
    /*
    static getDerivedStateFromProps(newProps, state) {
        if ( state.flagSpinner!=newProps.flagSpinner ){
            let newState          = {
                flagSpinner: newProps.flagSpinner
            } ;
            return newState ;
        } else {
            return false ;
        }
    }
    */
    //
    onChangeInput(argEC){
        try {
            if ( argEC && argEC.preventDefault ){ argEC.preventDefault(); }
            if ( argEC.target.name ){
                let tempField = this.state.fields ;
                tempField[ argEC.target.name ] = argEC.target.value ;
                this.setState({fields: tempField}) ;
            }
        } catch(errONI){
            console.log('...ERROR: ',errONI) ;
        }
    }
    //
    onChangeEmail(argEE){
        //
        //api.debug.display( 'onSubmitForm:: onChangeEmail: ',argEE.target.value ) ;
        if ( argEE.target.value.length && argEE.target.value.length>0 ){
            let { fields } = this.state ;
            fields['email']=argEE.target.value ;
            this.setState({fields:fields}) ;
        }
        /*
        this.props.form.validateFields( "email",{ force: true }, (error) => {
            console.log('....onChange_validateemail:  error: ',error) ;
            if (error) {
            }
        }) ;
        */
    } ;
    //
    onChangePass(argEE){
        //
        // api.debug.display( 'onSubmitForm:: onChangePass: ',argEE.target.value ) ;
        if ( argEE.target.value.length && argEE.target.value.length>0 ){
            let { fields } = this.state ;
            fields['password']=argEE.target.value ;
            this.setState({fields:fields}) ;
        }
        /*
        this.props.form.validateFields( "password",{ force: true }, (error) => {
            console.log('....onChange_validatepassword:  error: ',error) ;
            if (error) {
            }
        }) ;
        */
    } ;
    //
    onSubmitForm(e){
        try {
            if ( e && e.preventDefault ){
                e.preventDefault();
            }
            //
            let tempValores = this.props.form.getFieldsValue() ;
            this.setState({flagSpinner:true}) ;
            // api.debug.display( 'onSubmitForm:: tempValores: ',tempValores,' this.state.fields: ',this.state.fields ) ;
            //
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('...error: ',error) ,
                  // api.debug.display( 'onSubmitForm:: error: ',error ) ;
                  this.setState({flagSpinner:false}) ;
              } else {
                  api.account.loginUser( {...tempValores,flagNewUser: this.flagNewUser } )
                        .then((respCC)=>{
                            // api.debug.display( 'onSubmitForm::api.cuenta.loginUser: respCC: ',respCC ) ;
                            if ( respCC.resultCode==APP_GLOBALES.RESULT_CODES.USER_PASSWORD_INVALID ){
                                 this.props.form.setFields({
                                    password: { value: tempValores.password, errors: [new Error( respCC.result )], }
                                  });
                                  this.setState({flagSpinner:false}) ;
                            } else {
                                if ( respCC.resultCode==APP_GLOBALES.RESULT_CODES.USER_EMAIL_DO_NOT_EXIST ){
                                    this.props.form.setFields({
                                        email:    { value: tempValores.email   , errors: [new Error( respCC.result )], },
                                        password: { value: tempValores.password, errors: [new Error( respCC.result )], }
                                      });
                                      this.setState({flagSpinner:false}) ;
                                } else {
                                    this.setState({flagEnviada:true,flagSpinner:false}) ;
                                    this.props.onAccept( respCC.result ) ;
                                }
                            }
                        })
                        .catch((respErr) => {
                            console.dir(respErr) ;
                            this.props.form.setFields({
                                email:    { value: tempValores.email   , errors: [new Error( respErr )], },
                                password: { value: tempValores.password, errors: [new Error( respErr )], }
                              });
                            this.setState({flagSpinner:false}) ;
                        }) ;
                  //
              } ;
              //
            });
        } catch(errOSF){
            console.log('...errOSF: ',errOSF) ;
        }
    } ;
    //
    onSubmitFormNewUser(e){
        try {
            e.preventDefault() ;
            this.flagNewUser = true ;
            //
            let tempValores     = this.props.form.getFieldsValue() ;
            tempValores.celular = String(tempValores.celular) ;
            tempValores.prefix  = String(tempValores.prefix) ;
            //
            // console.log('....(A) tempValores.celular: ',tempValores.celular) ;
            if ( tempValores.prefix && tempValores.prefix.length>0 ){
                if ( tempValores.celular.indexOf(tempValores.prefix)==-1 ){
                    tempValores.celular = tempValores.prefix+tempValores.celular ;
                }
            }
            // console.log('....(B) tempValores.celular: ',tempValores.celular) ;
            this.props.form.setFields({
                celular:  { value: tempValores.celular }
            });
            //
            this.onSubmitForm() ;
        } catch(errNU){
            console.log('...errNU: ',errNU) ;
        }
    }
    //
    onSubmitGetPassword(e){
        try {
            e.preventDefault() ;
            //
            let tempValores = this.props.form.getFieldsValue() ;
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  this.setState({flagSpinner:false}) ;
              } else {
                  api.account.passwordReset( {...tempValores } )
                        .then((respCC)=>{
                            this.setState({resetUrl: respCC,flagSpinner:false}) ;
                            this.props.onFinishReset( resetUrl ) ;
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
    onFocus(argEF){
        try {
            console.log('....onfocus:: trget: ',argEF.target.id );
            this.refFocus = argEF.target ;
        } catch(errOF){
            console.dir(errOF) ;
        }
    }
    /*
    componentDidUpdate(){
        console.log('...componentDidUpdate: ') ;
        if ( this.refFocus!=false ){
            console.log('.....(B) componentDidUpdate: voy a hacer focus en ==> ',this.refFocus.id) ;
            this.refFocus.focus() ;
        }
    }
    */
    //
    render(){
        //
        const { getFieldDecorator }   = this.props.form ;
        // let formItemsProps = (window.innerWidth>796) ? {hasFeedback:true} : {} ;
        let formItemsProps = {hasFeedback:true} ;
        // api.debug.display( '........formEmailPassword:: render: fieldvalues: ',this.props.form.getFieldsValue() ) ;
        // api.debug.display( '........formEmailPassword:: render: state: ',this.state ) ;
        //
        return(
            <Row className="waiboc-form-login" >
                <Col xs={0}  md={0}  lg={4}  xl={4}  xxl={4} ></Col>
                <Col xs={24} md={24} lg={20} xl={20} xxl={20} >
                <Form>
                <Row>
                    <h2 style={{width:'100%',textAlign:'center'}} ><u>Ingresé email y password</u></h2>
                </Row>
                <Form.Item key="form-item-inp-email-p" {...formItemsProps} >
                    {
                        getFieldDecorator('email', {
                            suppressWarning: true,
                            trigger: 'onBlur',
                            valuePropName: 'defaultValue',
                            initialValue: this.state.fields.email ? this.state.fields.email : "",
                            rules: [ { required: true, suppressWarning: true,type: 'email', message: 'Email incorrecto.' } ]
                        })
                        (
                            <Input placeholder="Tu Email" size="large"
                                ref={(argReg)=>{ if ( argReg && this.refEmail==false ){argReg.focus(); this.refEmail=argReg;} }}
                                style={{height:'60px',boxShadow:'0 7px 6px -6px #999999'}}   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                onPressEnter={this.onSubmitForm}
                                onBlur={this.onChangeEmail}
                                />
                        )
                    }
                </Form.Item>
                <Form.Item key="form-item-inp-psw"  {...formItemsProps}  >
                    {
                        getFieldDecorator('password', {
                            valuePropName: 'defaultValue',
                            initialValue: this.state.fields.password ? this.state.fields.password : "",
                            suppressWarning: true,
                            trigger: 'onBlur',
                            rules: [
                                { required:true, suppressWarning: true, message: 'Por favor, ingrese la password.' }
                            ],
                        }
                        )
                        (
                            <Input.Password  placeholder="Password"  size="large"
                                             style={{height:'60px',boxShadow:'0 7px 6px -6px #999999'}} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                             onPressEnter={this.onSubmitForm}
                                             onBlur={this.onChangePass}
                            />
                        )
                    }
                </Form.Item>
                {
                    this.state.flagRegistration==false
                        ?   <Row key="row-forget-psw"  >
                                <div className="forget-password">
                                    <a onClick={this.props.forgetMyPassword} >{this.props.translate.form.forgetPassword}</a>
                                </div>
                            </Row>
                        :   <div>
                                <Form.Item key="form-item-inp-nombre-p" {...formItemsProps} >
                                    {
                                        getFieldDecorator('nombre', {
                                            suppressWarning: true,
                                            trigger: 'onBlur',
                                            valuePropName: 'defaultValue',
                                            initialValue: this.state.fields.nombre ? this.state.fields.nombre : "",
                                            rules: [ { required: true, suppressWarning: true,type: 'string', message: 'Por favor, complete con su nombre.' } ]
                                        })
                                        (
                                            <Input placeholder="Tu Nombre"  size="large" name="nombre" className="waiboc-ec-form-input"
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                onBlur={this.onChangeInput}
                                                />
                                        )
                                    }
                                </Form.Item>
                                <Form.Item key="form-item-inp-apellido-p" {...formItemsProps} >
                                    {
                                        getFieldDecorator('apellido', {
                                            suppressWarning: true,
                                            trigger: 'onBlur',
                                            valuePropName: 'defaultValue',
                                            initialValue: this.state.fields.apellido ? this.state.fields.apellido : "",
                                            rules: [ { required: true, suppressWarning: true,type: 'string', message: 'Por favor, complete con su apellido.' } ]
                                        })
                                        (
                                            <Input placeholder="Tu Apellido" size="large" name="apellido" className="waiboc-ec-form-input"
                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                onBlur={this.onChangeInput}
                                                />
                                        )
                                    }
                                </Form.Item>
                                <FormPhoneNumber key="form-item-inp-celular" {...formItemsProps} form={this.props.form} onChangeInput={this.onChangeInput} initialValue={this.state.fields.celular}  />
                                <Form.Item>
                                    <Button key="for-item-button-sign-up"  type="primary" onClick={this.onSubmitFormNewUser} style={{marginTop:'10px'}} >
                                        Registrarme
                                    </Button>
                                </Form.Item>
                            </div>
                }
                <Form.Item key="form-item-btn-sub"  >
                    {
                        this.state.flagSpinner==true
                            ?   <Spin size="large"   />
                            :   this.state.flagRegistration==false
                                ?   <Button.Group size="large" key="for-item-button-group" >
                                        <Button key="for-item-button-ing"      type={"primary"} onClick={this.onSubmitForm}   >
                                            Ingresar
                                        </Button>
                                        <Button key="for-item-button-sign-up"   onClick={()=>{this.setState({flagRegistration: true})}} >
                                            Soy Nuevo
                                        </Button>
                                    </Button.Group>
                                : null
                    }
                </Form.Item>
            </Form>
                </Col>
            </Row>
        )
    }
    //
} ;
//
export const FormEmailPassword = Form.create({name: 'FormEmailPassword'
    /*
    ,mapPropsToFields(props) {
        // api.debug.display( 'mapPropsToFields:: props: ',props ) ;
        // return false ;
        return {
            email:        Form.createFormField({ value: '' }),
            password:     Form.createFormField({ value: '' })
        };
    }
    */
})(FormEmailPasswordBase) ;
//