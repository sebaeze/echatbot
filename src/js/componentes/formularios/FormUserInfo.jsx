/*
*
*/
/*
*
*/
import React                   from 'react' ;
import { FiltroPais }          from '../filtros/FiltroPais' ;
import { Row, Col, Spin, Form, Input, Button, Tooltip, Icon, Modal }   from 'antd'  ;
//
class FormUserInfo extends React.Component {
    constructor(props){
        super(props) ;
        this.state            = {flagSpinner:false, flagEnviada: false, userInfo: this.props.userInfo } ;
        this.onSubmitConsulta = this.onSubmitConsulta.bind(this) ;
        this.onClickOkModal   = this.onClickOkModal.bind(this)   ;
        this.onclickCancel    = this.onclickCancel.bind(this)    ;
    }
    //
    componentWillMount(){}
    //
    onSubmitConsulta(argEventCont){
        try {
            argEventCont.preventDefault() ;
            let arrayInputForm = argEventCont.target.querySelectorAll('input,textarea') ;
            let objForm        = {} ;
            arrayInputForm.forEach((elemInp)=>{
                objForm[ elemInp.id ] = elemInp.value || elemInp.textContent || elemInp.innerHTML || false ;
            }) ;
            //
        } catch(argEventCont){
            console.dir(argEventCont) ;
        }
    }
    //
    onClickOkModal(argClickOk){
        this.setState({flagEnviada:false}) ;
    } ;
    //
    onclickCancel(argClickCan){
        this.setState({flagEnviada:false}) ;
    } ;
    //
    render(){
        //
        const { getFieldDecorator, getFieldError } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        // console.dir(this.props.userInfo) ;
        const onSubmit = (e) => {
            e.preventDefault();
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....valid:: error: ') ;
                  console.dir(error) ;
                  //this.setState({flagSpinner:false}) ;
                  //return null;
              } else {
                //this.setState({flagSpinner:false}) ;
                console.dir(this.props.form.getFieldsValue()) ;
                console.log('.....valid:: parece que anda bien ***') ;
                enviarConsulta( this.props.form.getFieldsValue() )
                    .then((respCC)=>{
                        console.log('....consulta enviada ok') ;
                        this.setState({flagEnviada:true}) ;
                    })
                    .catch((respErr) => {
                        console.dir(respErr) ;
                        console.log('.....error al enviar consulta') ;
                    }) ;
              }
              //
              setTimeout(() => {
                this.setState({flagSpinner:false}) ;
              }, 700 );
              //
            });
        };
        //
        return(
            //
            <Row id="idFormContacto">
                <Col xs={3}  md={3}  lg={5} xl={5} xxl={5}></Col>
                <Col xs={16} md={16} lg={14} xl={14} xxl={14}>
                    <Modal
                        title=""
                        visible={this.state.flagEnviada}
                        onOk={this.onClickOkModal.bind(this)}
                        onCancel={()=>{this.setState({flagEnviada:false});}}
                        footer={[
                            <Button key="Enviar_otra_consulta" type="primary"
                                    onClick={ () => { this.props.form.resetFields(); this.setState({flagEnviada:false}); } }
                            >
                              Enviar otra consulta
                            </Button>
                          ]}
                    >
                        <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize:'32px'}} />
                        <span style={{fontSize:'32px'}} >Perfecto!</span>
                    </Modal>
                    <Form onSubmit={onSubmit} style={ {...estiloForm} } >
                        <Row style={{marginTop:'20px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item
                                    label={ <span>{this.props.translate.form.name}<Tooltip  placement="bottomRight" title="¿ Cuál es su nombre o cómo le gusta que lo llamen ?"> <Icon type="question-circle-o" /> </Tooltip> </span> }
                                >
                                    {getFieldDecorator('name', { rules: [{ required: true, message: 'Por favor, escriba su nombre', whitespace: true }], })(<Input size="large" />)}
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item
                                    label={ <span>{this.props.translate.form.lastName}</span> }
                                >
                                    {getFieldDecorator('lastName', { rules: [{ required: true, message: 'Por favor, escriba su apellido', whitespace: true }], })(<Input size="large" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={21} xl={21} xxl={21}>
                                <Form.Item label="E-mail">
                                    {getFieldDecorator('email', {
                                        rules: [
                                        {
                                            type: 'email',
                                            message: 'Email incorrecto.',
                                        },
                                        {
                                            required: true,
                                            message: 'Por favor, ponga un email correcto.',
                                        },
                                        ],
                                    }
                                    )(<Input size="large" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={21} xl={21} xxl={21}>
                                <Form.Item  label={ <span>{this.props.translate.form.address}</span> } >
                                    {getFieldDecorator('address', {})(<Input size="large" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  label={ <span>{this.props.translate.form.city}</span> } >
                                    {getFieldDecorator('city', { rules: [{ required: true, message: 'Por favor, escriba su apellido', whitespace: true }], })(<Input size="large" />)}
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  label={ <span>{this.props.translate.form.state}</span> } >
                                    {getFieldDecorator('state', { rules: [{ required: true, message: 'Por favor, escriba su apellido', whitespace: true }], })(<Input size="large" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  label={ <span className="ant-form-item-required">{this.props.translate.form.country}</span> } >
                                    <FiltroPais  id={"idFiltroPais"} style={{width:'100%'}}
                                                seleccion={(argSelPais)=>{
                                                    console.log('....') ;
                                                    console.dir(this.state.userInfo) ;
                                                    let tempForm = this.state.userInfo ;
                                                    tempForm.pais = argSelPais ;
                                                    this.setState({userInfo:tempForm})
                                                }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item  label={ <span>{this.props.translate.form.zipCode}</span> } >
                                    {getFieldDecorator('zipCode', { rules: [{ message: 'Por favor, escriba su apellido', whitespace: true }], })(<Input size="large" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item
                                    label={
                                        <span>{this.props.translate.form.phone}:
                                        <Tooltip  placement="bottomRight" title="Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                        </span>
                                    }
                                >
                                {getFieldDecorator('phone', {
                                    rules: [{ required: false, message: 'Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ' }],
                                })(<Input size="large" style={{ width: '100%' }} />)}
                                </Form.Item>
                            </Col>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={10} xl={10} xxl={10}>
                                <Form.Item
                                    label={<span>Whatsapp:
                                        <Tooltip  placement="bottomRight" title="Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('whatsapp', { rules: [{ required: false, message: 'Ingrese su número de Whatsapp si desea recibir respuesta por Whatsapp' }], })
                                    (<Input size="large" style={{ width: '100%' }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xs={1} md={1} lg={1} xl={1} xxl={1}></Col>
                            <Col xs={23} md={23} lg={21} xl={21} xxl={21}>
                                <Form.Item  label={ <span>{this.props.translate.form.description}</span> } >
                                    {getFieldDecorator('description', { rules: [{ required: false, message: 'Comentarios adicionales', whitespace: true }], })
                                    (<Input.TextArea />)}
                                </Form.Item>
                                <Form.Item>
                                    {
                                        this.state.flagSpinner==true ?
                                            <Spin size="large" />
                                            :
                                            <Button type="primary" size={"large"} htmlType="submit" style={{padding:'0',margin:'0',width:'200px'}} >
                                                {this.props.translate.form.savechanges}
                                            </Button>
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                </Form>
                </Col>
            </Row>
        ) ;
    }
    //
} ;
//
const WrappedFormUserInfo = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            email: Form.createFormField({ value: props.userInfo.email }),
            name: Form.createFormField({ value: props.userInfo.name }),
            lastName: Form.createFormField({ value: props.userInfo.lastName }),
            country: Form.createFormField({ value: props.userInfo.country }),
            state: Form.createFormField({ value: props.userInfo.state }),
            city: Form.createFormField({ value: props.userInfo.city }),
            zipCode: Form.createFormField({ value: props.userInfo.zipCode }),
            address: Form.createFormField({ value: props.userInfo.address }),
            phone: Form.createFormField({ value: props.userInfo.phone }),
            whatsapp: Form.createFormField({ value: props.userInfo.whatsapp }),
            description: Form.createFormField({ value: props.userInfo.description })
        };
    }
})(FormUserInfo);
//
export default WrappedFormUserInfo ;
//