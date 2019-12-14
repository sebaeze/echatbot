/*
* FormIntentAnswer
*/
import React                                          from 'react' ;
import { Row, Form, Input, Tooltip, Icon,  Select }   from 'antd'  ;
//
export class FormIntentAnswer extends React.Component {
    constructor(props){
        super(props) ;
        this.firstNode          = false ;
        this.state              = {flagSpinner:false, modalVisible: this.props.modalVisible, enviadoOk:false, accessList:{} } ;
        this.handleSelectChange = this.handleSelectChange.bind(this) ;
        console.log('....FormAnswer:: props: ') ;
        console.dir(props) ;
    }
    //
    componentDidMount(){
        const { resetFields } = this.props.form ;
        resetFields({names:['answerType','answerTitle','answerApi','answerText','answerOptions' ]}) ;
    }
    //
    handleSelectChange(value){
        this.props.form.setFieldsValue({
            type: value
        });
    };
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form ;
        let estiloForm  = this.state.flagPantContacto==true ? {marginTop:'140px'} : {} ;
        //
        return(
            //
            <div>
                <Row >
                    <Form.Item
                        label={ <span>{this.props.translate.form.answerType}</span> }
                    >
                        {getFieldDecorator('answerType', { initialValue:'text', rules: [{ required: true, message: 'Please, choose the language', whitespace: true }], })
                        (
                            <Select
                                placeholder={this.props.form.selectTypeOfAnswer}
                                onChange={this.handleSelectChange}
                                getPopupContainer={(trigger) => {
                                    return trigger.parentNode ;
                                }}
                                size="large"
                            >
                                <Select.Option value="text"      key="1">Text</Select.Option>
                                <Select.Option value="carousel"  key="2">Carousel</Select.Option>
                                <Select.Option value="option"    key="3">Option</Select.Option>
                                <Select.Option value="image"     key="4">Picture</Select.Option>
                            </Select>
                        )
                        }
                    </Form.Item>
                </Row>
                <Row >
                    <Form.Item
                        hasFeedback
                        label={ <span>
                                    title
                                    <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                </span>}
                    >
                        {getFieldDecorator('answerTitle', { rules: [{ required: true, message: 'Please, write a name that identify the intent', whitespace: true }], })
                        (<Input allowClear size="large" />)}
                    </Form.Item>
                </Row>
                <Row >
                    <Form.Item
                        hasFeedback
                        label={ <span>
                                    Text
                                    <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                </span>}
                    >
                        {getFieldDecorator('answerText', { rules: [{ required: true, message: 'Please, write a name that identify the intent', whitespace: true }], })
                        (<Input allowClear size="large" />)}
                    </Form.Item>
                </Row>
                <Row >
                    <Form.Item
                        hasFeedback
                        label={ <span>
                                    API
                                    <Tooltip  placement="bottomRight" title={this.props.translate.tooltip.answerText} ><Icon type="question-circle-o" /> </Tooltip>
                                </span>}
                    >
                        {getFieldDecorator('answerApi', { rules: [{ required: false, message: 'Please, write a name that identify the intent', whitespace: true }], })
                        (<Input allowClear size="large" />)}
                    </Form.Item>
                </Row>
            </div>
        ) ;
    }
    //
} ;
//