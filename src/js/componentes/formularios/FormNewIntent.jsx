/*
* FormNewIntent
*/
import React                           from 'react' ;
import { FormIntentName   }            from './FormIntentName'     ;
import { FormIntentExamples }          from './FormIntentExamples' ;
import { FormIntentAnswer }            from './FormIntentAnswer'   ;
import { Modal, Typography, Steps, Spin }   from 'antd'  ;
//
const { Step  } = Steps      ;
const { Title } = Typography ;
//
export class FormNewIntent extends React.Component {
    constructor(props){
        super(props) ;
        console.log('......FormNewIntent:: this.props.data: ',this.props.data) ;
        this.state              = {
            flagSpinner:false,
            modalVisible: this.props.modalVisible,
            enviadoOk:false,
            dataNewIntent: this.props.data!=false ? {...this.props.data} : {intentName:'',intentLanguage:'',intentExamples:[],intentDomain:'',intentAnswer:{}},
            formStep: 0,
        } ;
        this.onNextStep         = this.onNextStep.bind(this) ;
        this.onPrevStep         = this.onPrevStep.bind(this) ;
    }
    //
    componentDidMount(){}
    //
    static getDerivedStateFromProps(newProps, state) {
        console.log('....FormNewIntent:: geteriveddd:: ',newProps);
        if ( newProps.modalVisible!=state.modalVisible ){
            console.log('.......(B) FormNewIntent:: geteriveddd:: VOY A ACTUALIZAR PROPSSS');
            let newDerivedState = {
                modalVisible: newProps.modalVisible,
                dataNewIntent: newProps.data!=false ? {...newProps.data} : {intentName:'',intentLanguage:'',intentExamples:[],intentDomain:'',intentAnswer:{}},
            } ;
            return {...newDerivedState} ;
        } else {
            console.log('.......(C) FormNewIntent:: geteriveddd::  NO ACTUALIZO PROPSSSS');
            return false ;
        }
    }
    //
    onNextStep(argNextStep){
        try {
            console.log('.....onNextStep:: ',argNextStep) ;
            let newState = {
                dataNewIntent: Object.assign({...this.state.dataNewIntent},argNextStep),
                formStep: this.state.formStep+1
            }
            if ( newState.formStep>2 ){
                console.log('......(B) onNextStep:: ',newState) ;
                this.props.onAccept( {...newState.dataNewIntent} ) ;
                newState.dataNewIntent = {intentName:'',intentLanguage:'',intentExamples:[],intentDomain:'',intentAnswer:{}} ;
                newState.formStep = 0 ;
                this.setState(newState) ;
            } else {
                this.setState(newState) ;
            }
            //
        } catch(errNS){
            console.dir(errNS) ;
        }
    }
    //
    onPrevStep(){
        let newState = {
            formStep: this.state.formStep-1
        } ;
        this.setState(newState) ;
    }
    //
    render(){
        //
        const NextStepForm    = (props) => {
            return(
                this.state.formStep==0 ?
                    <FormIntentName translate={this.props.translate} data={{...this.state.dataNewIntent}} onSubmitOk={this.onNextStep} prev={this.onPrevStep} />
                    :
                    this.state.formStep==1 ?
                        <FormIntentExamples translate={this.props.translate} data={{...this.state.dataNewIntent}} onSubmitOk={this.onNextStep} prev={this.onPrevStep}  />
                        :
                        <FormIntentAnswer translate={this.props.translate} data={{...this.state.dataNewIntent}} onSubmitOk={this.onNextStep} prev={this.onPrevStep}  />
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
                onCancel={(argEC)=>{this.props.onCancelModal(argEC);}}
                footer={null}
            >
                <div className="waiboc-cl-form" >
                    <div style={{marginTop:'10px',marginBottom:'10px'}}>
                        <Steps size="small" current={this.state.formStep}>
                            <Step key="1" title={this.props.translate.form.name} />
                            <Step key="2" title={this.props.translate.form.examples} />
                            <Step key="3" title={this.props.translate.form.answer} />
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