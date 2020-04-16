/*
*
*/
import React                                                    from 'react' ;
import { Row, Col, Spin, Form, Input, Button, Tooltip, Icon, Modal }   from 'antd'  ;
import { enviarConsulta }                                       from '../../api/api' ;
//
class FormContacto extends React.Component {
    constructor(props){
        super(props) ;
        this.state            = {flagSpinner:false, flagEnviada: false, flagPantContacto:((this.props.match && this.props.match.isExact) ? true : false )} ;
        this.onSubForm        = this.onSubForm.bind(this)        ;
        this.onClickOkModal   = this.onClickOkModal.bind(this)   ;
        this.onclickCancel    = this.onclickCancel.bind(this)    ;
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
    onSubForm(argEE) {
        try {
            //
            if ( argEE && argEE.preventDefault ){ argEE.preventDefault(); }
            //
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....valid:: error: ') ;
                  console.dir(error) ;
                  //this.setState({flagSpinner:false}) ;
                  //return null;
              } else {
                //this.setState({flagSpinner:false}) ;
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
            }) ;
            //
        } catch(errSF){
            console.dir(errSF) ;
        }
    } ;
    //
    render(){
        //
        const { getFieldDecorator, getFieldError } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'80px'} : {} ;
        if ( this.props.customStyle ){
            estiloForm = {
                ...estiloForm,
                ...this.props.customStyle
            }
        }
        //
        return(
            //
            <Row className="waiboc-home-contact" id="contact" >
                <Row>
                    <h2>{this.props.translate.contactUsTitle}</h2>
                </Row>
                <Row  className="waiboc-cl-form" >
                    <Col xs={3}  md={3}  lg={6} xl={6}></Col>
                    <Col xs={16} md={16} lg={12} xl={12}>
                        <Modal
                            title=""
                            maskClosable={false}
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
                        <Form onSubmit={this.onSubForm} style={ {...estiloForm} }
                        >
                        <Form.Item
                            label={
                                <span>
                                Nombre
                                <Tooltip  placement="bottomRight" title="¿ Cuál es su nombre o cómo le gusta que lo llamen ?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                                </span>
                            }
                        >
                            {getFieldDecorator('nombre', {
                                rules: [{ required: true, message: 'Por favor, escriba su nombre', whitespace: true }],
                            })(<Input size="large"  />)}
                        </Form.Item>
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
                        <Form.Item
                            label={
                                <span>
                                Whatsapp / Teléfono:
                                <Tooltip  placement="bottomRight" title="Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                                </span>
                            }
                        >
                        {getFieldDecorator('telefono', {
                            rules: [{ required: false, message: 'Ingrese su número de Whatsapp / teléfono si desea recibir respuesta por Whatsapp / Teléfono ' }],
                        })(<Input size="large" style={{ width: '100%' }} />)}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                Consulta / Comentario / Propuesta:
                                <Tooltip  placement="bottomRight" title="¿ Cuál es su consulta o propuesta ? ">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                                </span>
                            }
                        >
                            {getFieldDecorator('mensaje', {
                                rules: [{ required: true, message: 'Por favor, escriba su mensaje', whitespace: true }],
                            })(<Input.TextArea size="large" />)}
                        </Form.Item>
                        <Form.Item>
                            {
                                this.state.flagSpinner==true ?
                                    <Spin size="large" />
                                    :
                                    <Button type="primary" size="large" htmlType="submit" >
                                        {this.props.translate.contactUs}
                                    </Button>
                            }
                        </Form.Item>
                    </Form>
                    </Col>
                </Row>
            </Row>
        ) ;
    }
    //
} ;
//
const WrappedFormContacto = Form.create({ name: '' })(FormContacto);
export default WrappedFormContacto ;
//