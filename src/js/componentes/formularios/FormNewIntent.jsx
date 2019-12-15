/*
* FormNewIntent
*/
import React                     from 'react' ;
import { FormIntentName   }      from './FormIntentName'     ;
import { FormIntentExamples }    from './FormIntentExamples' ;
import { FormIntentAnswer }      from './FormIntentAnswer'   ;
import { Row, Form, Input, Tooltip, Icon, Modal, Select, Typography, Steps  }   from 'antd'  ;
//
const { Step  } = Steps      ;
const { Title } = Typography ;
//
class FormNewIntentWithModal extends React.Component {
    constructor(props){
        super(props) ;
        this.state              = {
            flagSpinner:false,
            modalVisible: this.props.modalVisible,
            enviadoOk:false,
            dataNewIntent:{intentName:'',intentLanguage:'',intentExamples:[],intentDomain:'',intentAnswer:{}},
            formStep: 0,
        } ;
        this.onAcceptNewIntent  = this.onAcceptNewIntent.bind(this) ;
        this.onNextStep         = this.onNextStep.bind(this) ;
    }
    //
    componentDidMount(){
        const { resetFields } = this.props.form ;
        // resetFields({names:['botSubtitle','botIcon','botSubtitle','description']}) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        return { modalVisible: newProps.modalVisible } ;
    }
    //
    onNextStep(argNextStep){
        try {
            console.log('....onNextStep:: current Form: '+this.state.formStep) ;
            let newState = {
                dataNewIntent: Object.assign({...this.state.dataNewIntent},argNextStep),
                formStep: this.state.formStep<2 ? (this.state.formStep+1) : this.state.formStep
            }
            console.dir(newState) ;
            this.setState(newState) ;
        } catch(errNS){
            console.dir(errNS) ;
        }
    }
    //
    onAcceptNewIntent(argEE){
        try {
            //
            argEE.preventDefault() ;
            this.setState({flagSpinner:true,enviadoOk:false}) ;
            this.props.form.validateFields({ force: true }, (error) => {
              if (error) {
                  console.log('.....valid:: error: ') ;
                  console.dir(error) ;
                  setTimeout(() => {
                        this.setState({flagSpinner:false,enviadoOk:false }) ;
                    }, 700 ) ;
              } else {
                  let tempValuesForm = this.props.form.getFieldsValue() ;
                  let tempValuesAcce = {
                    intentAnswer:{
                        type: tempValuesForm['answerType'] ,
                        title: tempValuesForm['answerTitle'] ,
                        text: tempValuesForm['answerText'] || '',
                        api: tempValuesForm['answerApi'] || '',
                        options: tempValuesForm['answerOptions'] ||''
                    } ,
                    intentLanguage: tempValuesForm.intentLanguage,
                    intentName: tempValuesForm.intentName,
                    intentExamples: tempValuesForm.intentExamples,
                    intentDomain: tempValuesForm.intentDomain
                  } ;
                  this.props.onAccept( tempValuesAcce ) ;
              }
            });
            //
        } catch(errNC){
            console.dir(errNC) ;
        }
    }
    //
    render(){
        //
        const { resetFields } = this.props.form ;
        const NextStepForm    = (props) => {
            return(
                this.state.formStep==0 ?
                    <FormIntentName translate={this.props.translate} data={{}} onSubmitOk={this.onNextStep} />
                    :
                    this.state.formStep==1 ?
                        <FormIntentExamples translate={this.props.translate} data={{}} onSubmitOk={this.onNextStep} />
                        :
                        <FormIntentAnswer translate={this.props.translate} data={{intentAnswer:{}}} onSubmitOk={this.onNextStep} />
            )
        }
        //
        return(
            //
            <Modal
                title={
                    <Title level={3} style={{textAlign:'center',padding:'5px 5px 5px 5px'}}>{this.props.translate.newIntent}</Title>
                }
                maskClosable={false}
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                bodyStyle={{paddingTop:'0'}}
                headerStyle={{padding:'5px 5px 5px 5px'}}
                visible={this.state.modalVisible}
                onOk={this.onAcceptNewIntent}
                onCancel={(argEC)=>{resetFields(); this.props.onCancelModal(argEC);}}
                footer={null}
            >
                <div className="waiboc-cl-form" >
                    <div style={{marginTop:'10px',marginBottom:'10px'}}>
                        <Steps size="small" current={this.state.formStep}>
                            <Step title={this.props.translate.form.name} />
                            <Step title={this.props.translate.form.examples} />
                            <Step title={this.props.translate.form.answer} />
                        </Steps>
                    </div>
                    <NextStepForm />
                </div>
            </Modal>
            //
        ) ;
    }
    //
} ;
//
export const FormNewIntent = Form.create({ name: '',
    mapPropsToFields(props) {
        return {
            intentLanguage: Form.createFormField({ value: props.data.intentLanguage ||'es'}),
            intentName:     Form.createFormField({ value: props.data.intentName     ||''  }),
            intentExamples: Form.createFormField({ value: props.data.intentExamples ||[]  }),
            intentDomain:   Form.createFormField({ value: props.data.intentDomain   ||''  }),
            intentAnswer:   Form.createFormField({ value: props.data.intentAnswer   ||''  })
        };
    }
})(FormNewIntentWithModal);
//