/*
* FormIntentAnswer
*/
import React                                             from 'react' ;
import { Button, Form, Input, Tooltip, Icon,  Select }   from 'antd'  ;
//
export class FormIntentAnswerBase extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        this.answerTypes        = {
            API:'api',
            TEXT:'text',
            CAROUSEL:'carousel',
            OPTIONS:'options',
            IMAGE:'image'
        } ;
        this.state              = {flagSpinner:false, fieldPanel: this.answerTypes.TEXT } ;
    }
    //
    componentDidMount(){
        const { resetFields } = this.props.form ;
        resetFields({names:['type','title','api','text','options' ]}) ;
    }
    //
    onSubmitForm(){
        try {
            //
            this.setState({flagSpinner:true}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false }) ;
                    }, 700 ) ;
              } else {
                  let tempFields    = this.props.form.getFieldsValue() ;
                  let tempOutAnswer = {} ;
                  for ( let keyF in tempFields ){
                      let valField = tempFields[keyF] ;
                      tempOutAnswer[keyF] = valField ;
                  }
                this.props.onSubmitOk( {intentAnswer: tempOutAnswer} ) ;
              }
            });
        } catch(errFS){
            console.dir(errFS) ;
        }
    }
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            type: value
        });
        if ( value ){
            this.setState({fieldPanel: value})
        }
    };
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        //
        return(
            //
                <Form >
                    <Form.Item
                        label={ <span>{this.props.translate.form.answerType}</span> }
                    >
                        {getFieldDecorator('type', {
                            initialValue: this.props.data.intentAnswer.answerType||'text',
                            rules: [{ required: true, message: this.props.translate.form.errorLanguage, whitespace: true }]
                        })
                        (
                            <Select
                                placeholder={this.props.translate.form.selectTypeOfAnswer}
                                onChange={this.handleSelectChange}
                                getPopupContainer={(trigger) => {
                                    return trigger.parentNode ;
                                }}
                                size="large"
                            >
                                {
                                    Object.values(this.answerTypes).map((elemType,idxType)=>{
                                    return(
                                            <Select.Option value={elemType}
                                                key={idxType}>{this.props.translate.answertType[elemType]||elemType}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        )
                        }
                    </Form.Item>
                    {
                        this.state.fieldPanel==this.answerTypes.TEXT ?
                            <Form.Item
                                hasFeedback
                                label={ <span>
                                            Text
                                            <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                            >
                                {getFieldDecorator('text', {
                                    initialValue: this.props.data.intentAnswer.text||'',
                                    rules: [{ required: true, message: this.props.translate.form.errorAnswerText, whitespace: true }]
                                })
                                (<Input allowClear size="large" />)}
                            </Form.Item>
                            : null
                    }
                    {
                        (this.state.fieldPanel==this.answerTypes.IMAGE || this.state.fieldPanel==this.answerTypes.OPTIONS) ?
                            <Form.Item
                                hasFeedback
                                label={ <span>
                                            Title
                                            <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                            >
                                {getFieldDecorator('title', {
                                    initialValue: this.props.data.intentAnswer.answerTitle||'',
                                    rules: [{ required: true, message: this.props.translate.form.errorAnswerTitle, whitespace: true }]
                                })
                                (<Input allowClear size="large" />)}
                            </Form.Item>
                            : null
                    }
                    {
                        this.state.fieldPanel==this.answerTypes.API ?
                            <Form.Item
                                hasFeedback
                                label={ <span>
                                            REST API Url
                                            <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                        </span>}
                            >
                                {getFieldDecorator('api', {
                                    initialValue: this.props.data.intentAnswer.answerApi||'',
                                    rules: [{ required: true, message: this.props.translate.form.errorAnswerApi, whitespace: true }]
                                })
                                (<Input allowClear size="large" />)}
                            </Form.Item>
                            : null
                    }
                    <Form.Item>
                        <Button type="primary" onClick={(argEC)=>{argEC.preventDefault();this.onSubmitForm(); }} >
                            {this.props.translate.form.submit}
                        </Button>
                    </Form.Item>
                </Form>
        ) ;
    }
    //
} ;

//
export const FormIntentAnswer = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            intentAnswer: Form.createFormField({ value: props.data.intentAnswer || {} })
        };
    }
})(FormIntentAnswerBase);
//