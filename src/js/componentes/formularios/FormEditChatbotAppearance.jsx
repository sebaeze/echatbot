/*
* FormEditChatbotAppearance
*/
import React                                from 'react' ;
import { Row, Col, Form, Input, Button  }   from 'antd'  ;
import { Icon, Tooltip  }                   from 'antd'  ;
import { SketchPicker }                     from 'react-color' ;
import { ChatbotScreen }                    from '../chat/ChatbotScreen' ;
//
class FormEditChatbotAppearanceBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.state              = {
            flagSpinner:false,
            modalVisible: this.props.modalVisible,
            enviadoOk:false,
            accessList:{},
            customStyleChat: {},
            botInfo: {}
        } ;
        this.onChangeInp        = this.onChangeInp.bind(this) ;
        this.handleKeyboard     = this.handleKeyboard.bind(this)   ;
        this.submitFormChanges  = this.submitFormChanges.bind(this)  ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.handleChangeComplete = this.handleChangeComplete.bind(this) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        return { modalVisible: newProps.modalVisible } ;
    }
    //
    componentDidMount(){
        this.setState({
            botInfo: this.props.form.getFieldsValue()
        }) ;
    }
    //
    onChangeInp(argEE){
        try{
            if ( argEE.target && argEE.target.value  && argEE.target.name ){
                let newBotInfo = this.state.botInfo ;
                newBotInfo[ argEE.target.name ] = argEE.target.value ;
                this.setState({ botInfo: newBotInfo }) ;
            }
        } catch(errOCI){
            console.log('...error: ',errOCI) ;
        }
    }
    //
    handleChangeComplete(argColor){
        try {
            if ( argColor ){
                let newBotInfo = this.state.botInfo ;
                if ( !newBotInfo.cssStyle ){ newBotInfo.cssStyle = { header } ; }
                if ( !newBotInfo.cssStyle.header ){ newBotInfo.cssStyle.header={}; }
                newBotInfo.cssStyle.header = {backgroundColor: argColor.hex } ;
                this.setState({ botInfo: newBotInfo }) ;
            }
        } catch(errHCC){
            console.log('....ERROR: ',errHCC) ;
            throw errHCC ;
        }
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
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'80px'} : {} ;
        //
        return(
            //
            <Row onKeyDown={this.handleKeyboard} >
                <Col xs={24} md={24} lg={14} xl={14} xxl={14} style={{minHeight:'100px'}} >
                    <Form className="waiboc-cl-form"  onSubmit={(argEV)=>{argEV.preventDefault()}} style={ {...estiloForm} } >
                        <Form.Item >
                            {getFieldDecorator('cssStyle')
                            (<Input allowClear size="large" style={{display:'none'}} />)}
                        </Form.Item>
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
                            (<Input allowClear size="large" className="waiboc-cl-names" name="nameToDisplay" onChange={this.onChangeInp} ref={(argRef)=>{ argRef.focus(); }} />)}
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
                            (<Input allowClear size="large" className="waiboc-cl-names" name="botSubtitle" onChange={this.onChangeInp} ref={(argRef)=>{ argRef.focus(); }} />)}
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}
                            hasFeedback
                            label={ <span>{this.props.translate.form.senderPlaceholder}</span> }
                        >
                            {getFieldDecorator('senderPlaceholder',
                                                { rules: [{ required: true, message: this.props.translate.form.senderPlaceholder, whitespace: true }], })
                            (<Input allowClear size="large" className="waiboc-cl-names" name="senderPlaceholder" onChange={this.onChangeInp}  ref={(argRef)=>{ argRef.focus(); }} />)}
                        </Form.Item>
                        <Row>
                            <SketchPicker
                                // color={ '#fff' }
                                onChange={ this.handleChangeComplete }
                                onChangeComplete={ this.handleChangeComplete }
                            />
                        </Row>
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
                </Col>
                <Col xs={24} md={24} lg={10} xl={10} xxl={10} >
                    <ChatbotScreen style={this.state.customStyleChat} data={this.state.botInfo} />
                </Col>
            </Row>
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
            senderPlaceholder: Form.createFormField({ value: propsForm.chatbotConfig.options.senderPlaceholder || "" }) ,
            cssStyle:          Form.createFormField({ value: propsForm.chatbotConfig.options.cssStyle       || {header:{}} })
        };
    }
})(FormEditChatbotAppearanceBase);
//