/*
*
*/
import React                                                  from 'react' ;
import { Row, Col, Typography, Form, Input, Button, Spin }    from 'antd'   ;
import { enviarSuscripcion }                                  from '../../api/api' ;
//
const { Search } = Input ;
//
export class FormSuscripcion extends React.Component {
    constructor(props){
        super(props) ;
        this.state = { flagSpinner: false, flagEnviado:false } ;
    }
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form;
        const EmailAdicional        = () => {
        return(
            <div>
                <span >Gracias por suscribirte !</span>
                <Button type="link" style={{paddingLeft: '0'}}  block onClick={(argEvent)=>{
                    argEvent.preventDefault() ;
                        this.setState({flagEnviado:false}) ;
                    }}
                >
                    Agregar otro email
                </Button>
            </div>
        )} ;
        //
        const onSubmitSuscripcion = (e) => {
            if ( e ){ e.preventDefault(); }
            //
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.dir(error) ;
                  console.log('.....valid:: error: ') ;
                  setTimeout(() => {
                    this.setState({flagSpinner:false}) ;
                  }, 700 );
              } else {
                enviarSuscripcion( this.props.form.getFieldsValue() )
                    .then((respCC)=>{
                        console.log('....suscripcion enviada ok') ;
                        setTimeout(() => {
                            this.setState({flagSpinner:false, flagEnviado:true}) ;
                        }, 700 );
                    })
                    .catch((respErr) => {
                        console.dir(respErr) ;
                        console.log('.....error al enviar suscripcion') ;
                        this.setState({flagSpinner:false}) ;
                    }) ;
              }
              //
            });
          };
        //
        return(
            <div id="waiboc-suscribe">
                {
                    this.state.flagSpinner ?
                        <Spin size="large" />
                        :
                        this.state.flagEnviado ?
                            <EmailAdicional />
                            :
                            <Form onSubmit={onSubmitSuscripcion} >
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                            rules: [
                                                {type: 'email' , message: this.props.translate.form.errorEmailInvalid },
                                                {required: true, message: this.props.translate.form.errorEmailInvalid }
                                            ],
                                        })
										(
											<Search
                                                placeholder="email@com.ar"
                                                enterButton={this.props.translate.form.newsletter}
                                                size="large"
                                                onSearch={(value)=>{console.log(value); onSubmitSuscripcion() ;}}
                                            />
										)}
                                </Form.Item>
                            </Form>
                }
            </div>
        ) ;
    }
    //
} ;
//
const WrappedFormSuscripcion = Form.create({ name: '' })(FormSuscripcion);
export default WrappedFormSuscripcion ;
//