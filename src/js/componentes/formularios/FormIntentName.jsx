/*
*
*/
import React                   from 'react' ;
import { Select, Form, Input, Button, Tooltip, Icon }   from 'antd'  ;
//
class FormIntentNameBase extends React.Component {
    constructor(props){
        super(props) ;
        this.state                = {flagSpinner:false} ;
        this.validateIntentName   = this.validateIntentName.bind(this)   ;
        this.handleSelectChange   = this.handleSelectChange.bind(this)   ;
        this.onSubmitForm         = this.onSubmitForm.bind(this) ;
    }
    //
    componentDidMount(){}
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            intentLanguage: value
        });
    };
    //
    onSubmitForm(){
        try {
            //
            this.setState({flagSpinner:true,enviadoOk:false,errorMsg:[]}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false }) ;
                    }, 700 ) ;
              } else {
                this.props.onSubmitOk( this.props.form.getFieldsValue() ) ;
              }
            });
        } catch(errFS){
            console.dir(errFS) ;
        }
    }
    //
    validateIntentName(rule, value, callback){
        try {
            /*
            const { form } = this.props;
            if (value && this.state.confirmDirty) {
              form.validateFields(['confirm'], { force: true });
            }
            */
            // let flagValid = new RegExp('^([a-zA-Z0-9]+[_-])*[a-zA-Z0-9]+\.[a-zA-Z0-9]+$').test( value ) ;
            //let flagValid = new RegExp('^([a-zA-Z0-9][_-])+$').test( value ) ;
            let flagValid = new RegExp('^[-_a-zA-Z0-9]+$').test( value ) ;
            console.log('...value: ',value,' flagValid: ',flagValid) ;
            callback();
        } catch(errVIN){
            console.log('...error:: errVIN: ',errVIN) ;
        }
    }
    //
    render(){
        //
        const { getFieldDecorator, getFieldError } = this.props.form ;
        return(
            //
            <Form onSubmit={(argEV)=>{argEV.preventDefault()}} >
                <Form.Item
                    hasFeedback
                    label={ <span>
                                Intent
                                <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.intentName} >
                                <Icon type="question-circle-o" /> </Tooltip>
                            </span>}
                >
                    {getFieldDecorator('intentName', {
                            initialValue: this.props.data.intentName||'',
                            suppressWarning: true ,
                            normalize: (value)=>(value || '').toUpperCase(),
                            rules: [
                                { required: true, message: this.props.translate.form.errorIntentName } ,
                                { pattern: new RegExp('^[-_a-zA-Z0-9]+$') , message: this.props.translate.form.errorIntentNameInvalid }
                            ],
                    })
                    ( <Input allowClear size="large" style={{fontWeight:'600'}}
                             disabled={this.props.flagNewIntent==true ? false : true}
                             ref={(argRef)=>{ /*this.firstNode=argRef; */argRef.focus(); }}
                      />
                    )}
                </Form.Item>
                <Form.Item
                    label={ <span>{this.props.translate.form.selectLanguage}</span> }
                >
                    {getFieldDecorator('intentLanguage', {
                        initialValue: this.props.data.intentLanguage||'',
                        rules: [{ required: true, message: this.props.translate.form.errorLanguage, whitespace: true }]
                    })
                    (
                        <Select
                            placeholder={this.props.translate.form.selectLanguage}
                            onChange={this.handleSelectChange}
                            getPopupContainer={(trigger) => {
                                return trigger.parentNode ;
                            }}
                            size="large"
                        >
                            <Select.Option value="es" key="1">Español</Select.Option>
                            <Select.Option value="en" key="2">English</Select.Option>
                            <Select.Option value="pt" key="3">Português</Select.Option>
                        </Select>
                    )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={(argEC)=>{argEC.preventDefault();this.onSubmitForm(); }} >
                        {this.props.translate.next}
                        <Icon type="right" />
                    </Button>
                </Form.Item>
            </Form>
        ) ;
    }
    //
} ;
//
export const FormIntentName = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            intentName:     Form.createFormField({ value: props.data.intentName     || ''   }),
            intentLanguage: Form.createFormField({ value: props.data.intentLanguage || 'es' })
        };
    }
})(FormIntentNameBase);
//