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
                                <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.chatbotName} >
                                <Icon type="question-circle-o" /> </Tooltip>
                            </span>}
                >
                    {getFieldDecorator('intentName', {
                            initialValue: this.props.data.intentName||'',
                            suppressWarning: true,
                            rules: [{ required: true, message: this.props.translate.form.errorIntentName, whitespace: true }],
                    })
                    (<Input allowClear size="large" ref={(argRef)=>{ /*this.firstNode=argRef; */argRef.focus(); }} />)}
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