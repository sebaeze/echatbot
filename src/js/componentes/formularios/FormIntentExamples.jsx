/*
FormIntentExamples
*/
/*
*
*/
import React                                   from 'react' ;
import { Form, Button, Tooltip, Icon, Spin }   from 'antd'  ;
import { Row, Col }                            from 'antd'  ;
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
                let tempfieldsValues            = this.props.form.getFieldsValue() ;
                tempfieldsValues.intentExamples = tempfieldsValues.intentExamples.filter((elemF)=>{ return elemF!=null ; }) ;
                this.props.onSubmitOk( tempfieldsValues ) ;
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
            <Row style={{paddingTop:'30px'}} >
                <Col xs={0}  md={0}  lg={5}  xl={5}  xxl={5} ></Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={12} >
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
                                    textPlaceholder={this.props.translate.form.textAddIntentExample}
                                    fieldName="intentExamples"
                                    type="array"
                                    focus={ (window.innerWidth>797) ? true : false }
                                    defaultTypefield="string"
                                    disabled={this.props.data.systemDefined==true ? true : false}
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
                                        <Button type="primary" size="large" onClick={(argEC)=>{argEC.preventDefault();this.onSubmitForm(); }} >
                                            {this.props.translate.next}
                                            <Icon type="right" />
                                        </Button>
                                        <Button size="large"
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
                </Col>
            </Row>
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