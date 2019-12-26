/*
FormIntentExamples
*/
/*
*
*/
import React                                   from 'react' ;
import { Form, Button, Tooltip, Icon, Spin }   from 'antd'  ;
import { FormDynamicInputText }                from  './FormDynamicInputText' ;
//
class FormIntentExamplesBase extends React.Component {
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
            this.setState({flagSpinner:true}) ;
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
        return(
            //
            <Form onSubmit={(argEV)=>{argEV.preventDefault();}} >
                <Form.Item
                    label={ <span>{this.props.translate.form.intentExamples}
                                <Tooltip  placement="topRight" title={this.props.translate.tooltip.intentExamples}>
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                >
                    {
                        <FormDynamicInputText
                            form={this.props.form}
                            textPlaceholder="hello!, I need info !"
                            fieldName="intentExamples"
                            type="array"
                            focus={true}
                            defaultTypefield="string"
                            textAdd={this.props.translate.form.textAddIntentExample}
                            description={this.props.translate.form.nonValidIntentExample}
                            translate={this.props.translate}
                        />
                    }
                </Form.Item>
                <Form.Item>
                    {
                        this.state.flagSpinner==true ?
                            <Spin size="large" />
                            :
                            <div>
                                <Button type="primary" onClick={(argEC)=>{argEC.preventDefault();this.onSubmitForm(); }} >
                                    {this.props.translate.next}
                                    <Icon type="right" />
                                </Button>
                                <Button
                                    style={{marginLeft:'10px'}}
                                    onClick={(argEC)=>{argEC.preventDefault();this.props.prev(); }}
                                >
                                    <Icon type="left" />
                                    {this.props.translate.previous}
                                </Button>
                            </div>
                    }
                </Form.Item>
            </Form>
        ) ;
    }
    //
} ;
//
export const FormIntentExamples = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            intentExamples:     Form.createFormField({ value: props.data.intentExamples || [] })
        };
    }
})(FormIntentExamplesBase);
//