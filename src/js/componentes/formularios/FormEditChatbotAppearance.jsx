/*
* FormEditChatbotAppearance
*/
import React                     from 'react' ;
import { FormDynamicInputText }  from  './FormDynamicInputText' ;
import { Row, Col, Tag , Form, Input, Button, Tooltip, Icon, Select, Typography  }   from 'antd'  ;
//
const { Title } = Typography ;
//
class FormEditChatbotAppearanceBase extends React.Component {
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
                console.log('...voy a guardar cambiossss:: values: ',values) ;
                this.props.onSubmitChanges( {options: values} ) ;
            }
        }) ;
    }
    //
    render(){
        //
        const { getFieldDecorator, resetFields, getFieldsError, getFieldError } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        return(
            //
            <div onKeyDown={this.handleKeyboard} >
            <Form className="waiboc-cl-form"  onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                <Form.Item
                    labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}
                    hasFeedback
                    label={ <span>
                                {this.props.translate.form.nameToDisplay}
                                <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.chatbotName} ><Icon type="question-circle-o" /> </Tooltip>
                            </span>}
                >
                    {getFieldDecorator('nameToDisplay',
                                      { rules: [{ required: true, message: this.props.translate.tooltip.chatbotName, whitespace: true }], })
                    (<Input allowClear size="large" className="waiboc-cl-names" ref={(argRef)=>{ argRef.focus(); }} />)}
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}
                    hasFeedback
                    label={ <span>
                                {this.props.translate.form.subtitleBot}
                                <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.subtitleBot} ><Icon type="question-circle-o" /> </Tooltip>
                            </span>}
                >
                    {getFieldDecorator('botSubtitle', { rules: [{ required: true, message: this.props.translate.tooltip.subtitleBot, whitespace: true }], })
                    (<Input allowClear size="large" className="waiboc-cl-names" ref={(argRef)=>{ argRef.focus(); }} />)}
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}
                    hasFeedback
                    label={ <span>{this.props.translate.form.senderPlaceholder}</span> }
                >
                    {getFieldDecorator('senderPlaceholder',
                                        { rules: [{ required: true, message: this.props.translate.form.senderPlaceholder, whitespace: true }], })
                    (<Input allowClear size="large" className="waiboc-cl-names" ref={(argRef)=>{ argRef.focus(); }} />)}
                </Form.Item>
                <Row style={{marginTop:'5px'}}>
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
export const FormEditChatbotAppearance = Form.create({ name: '',
    mapPropsToFields(propsForm) {
        if ( !propsForm.chatbotConfig.options ){ propsForm.chatbotConfig.options={}; }
        return {
            nameToDisplay:     Form.createFormField({ value: propsForm.chatbotConfig.options.nameToDisplay || ""     }) ,
            botSubtitle:       Form.createFormField({ value: propsForm.chatbotConfig.options.botSubtitle   || ""     }) ,
            botIcon:           Form.createFormField({ value: propsForm.chatbotConfig.options.botIcon       || ""     }) ,
            cssStyle:          Form.createFormField({ value: propsForm.chatbotConfig.options.cssStyle      || {}     }) ,
            senderPlaceholder: Form.createFormField({ value: propsForm.chatbotConfig.options.senderPlaceholder || "" })
        };
    }
})(FormEditChatbotAppearanceBase);
//