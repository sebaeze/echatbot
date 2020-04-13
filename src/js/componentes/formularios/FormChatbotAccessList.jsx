/*
*
*/
import React                                        from 'react' ;
import { FormDynamicInputText }                     from  './FormDynamicInputText' ;
import { Row, Col, Form, Button, Tooltip, Icon  }   from 'antd'  ;
//
class FormChatbotAccessListBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.state              = {flagSpinner:false, modalVisible: this.props.modalVisible, enviadoOk:false, accessList:{} } ;
        this.handleKeyboard     = this.handleKeyboard.bind(this)   ;
        this.submitFormChanges  = this.submitFormChanges.bind(this)  ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        return { modalVisible: newProps.modalVisible } ;
    }
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            language: value
        });
    };
    //
    handleKeyboard(event){
        try {
            //
            let charCode = String.fromCharCode(event.which).toLowerCase();
            if(event.ctrlKey && charCode === 's') {
                event.preventDefault();
                this.submitFormChanges() ;
            }
            // For MAC we can use metaKey to detect cmd key
            if(event.metaKey && charCode === 's') {
                event.preventDefault();
                this.submitFormChanges() ;
            }
        } catch(errHK){
            console.dir(errHK) ;
            throw errHK ;
        }
    } ;
    //
    submitFormChanges(){
        this.props.form.validateFields((err, values) => {
            if (!err) {
            this.props.onSubmitChanges( values ) ;
            }
        }) ;
    }
    //
    render(){
        //
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        return(
            //
            <div onKeyDown={this.handleKeyboard} >
            <Form className="waiboc-cl-form"
                  onSubmit={(argEV)=>{argEV.preventDefault()}}
                  style={ {...estiloForm} }
            >
                <Form.Item
                    labelCol={{ xs:24, md: 24, lg: 8, xl: 8, xxl: 8 }}
                    wrapperCol={{ xs:24, md: 24, lg: 11, xl: 11, xxl: 11 }}
                    label={ <span>{this.props.translate.form.accessList}
                                <Tooltip  placement="topRight" title={this.props.translate.tooltip.chatbotAccesslist}>
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                >
                    {
                        <FormDynamicInputText
                            form={this.props.form}
                            styleButton={{width:'30%'}}
                            textPlaceholder="email@mywebsite.com"
                            dataForm={this.props.accessList}
                            fieldName="accessList"
                            type="array"
                            defaultTypefield="email"
                            textAdd={this.props.translate.form.textAddEmail}
                            description={this.props.translate.form.nonValidAccessList}
                        />
                    }
                </Form.Item>
                <Form.Item
                    labelCol={{ xs:24, md: 24, lg: 8, xl: 8, xxl: 8 }}
                    wrapperCol={{ xs:24, md: 24, lg: 11, xl: 11, xxl: 11 }}
                    colon={false}
                    label={ <span>
                                {this.props.translate.form.websiteDomains}
                                <Tooltip  placement="topRight" title={this.props.translate.tooltip.websiteDomains}>
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                >
                    {
                        <FormDynamicInputText
                            form={this.props.form}
                            styleButton={{width:'30%'}}
                            textPlaceholder="www.mywebsite.com"
                            fieldName="websiteDomains"
                            type="array"
                            defaultTypefield="string"
                            textAdd={this.props.translate.form.textAddWebsite}
                            description={this.props.translate.form.nonValidwebsiteDomains}
                        />
                    }
                </Form.Item>
                <Form.Item>
                    {
                        this.state.enviadoOk==true    ? <Icon type="smile" style={{fontSize:'35px',marginLeft:'25px'}} theme="twoTone" twoToneColor="#52c41a" /> : null
                    }
                </Form.Item>
                <Row style={{marginTop:'10px'}}>
                    <Col xs={1} md={1} lg={8} xl={8} xxl={8}></Col>
                    <Col xs={18} md={18} lg={10} xl={8} xll={8} >
                        <Button type="primary" size={"large"} style={{marginLeft:'10%'}} className="btn-edit-menu"
                                onClick={ (argEEV)=>{
                                    argEEV.preventDefault() ;
                                    this.submitFormChanges() ;
                                } }
                        >
                            {this.props.translate.form.savechanges}
                        </Button>
                    </Col>
                </Row>
            </Form>
            </div>
            //
        ) ;
    }
    //
} ;
//
export const FormChatbotAccessList = Form.create({ name: '',
    mapPropsToFields(propsForm) {
        return {
            accessList:     Form.createFormField({ value: propsForm.chatbotConfig.accessList     }),
            websiteDomains: Form.createFormField({ value: propsForm.chatbotConfig.websiteDomains })
        };
    }
})(FormChatbotAccessListBase);
//