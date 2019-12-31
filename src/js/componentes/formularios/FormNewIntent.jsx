/*
* FormNewIntent
*/
import React                           from 'react' ;
import { FormIntentName   }            from './FormIntentName'     ;
import { FormIntentExamples }          from './FormIntentExamples' ;
import { FormIntentAnswer }            from './FormIntentAnswer'   ;
import { Modal, Typography, Steps, Icon }   from 'antd'  ;
//
const { Step  }  = Steps      ;
const { Title }  = Typography ;
const INTENT_DEF = {intentName:'',intentLanguage:'',intentExamples:[],intentDomain:'',intentAnswer:{} } ;
//
export class FormNewIntent extends React.Component {
    constructor(props){
        super(props) ;
        this.state              = {
            flagSpinner:false,
            modalVisible: this.props.modalVisible,
            enviadoOk:false,
            dataNewIntent: this.props.data!=false ? {...this.props.data} : {...INTENT_DEF},
            formStep: 0,
        } ;
        this.onNextStep         = this.onNextStep.bind(this) ;
        this.onPrevStep         = this.onPrevStep.bind(this) ;
    }
    //
    componentDidMount(){}
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.modalVisible!=state.modalVisible ){
            let newDerivedState = {
                formStep: 0,
                modalVisible: newProps.modalVisible,
                dataNewIntent: newProps.modalVisible==true ? {...newProps.data} : {...INTENT_DEF}
            } ;
            return {...newDerivedState} ;
        } else {
            return false ;
        }
    }
    //
    onNextStep(argNextStep){
        console.log('....onNextStep:: ',argNextStep) ;
        try {
            let newState = {
                dataNewIntent: Object.assign({...this.state.dataNewIntent},argNextStep),
                formStep: this.state.formStep+1
            }
            if ( newState.formStep>2 ){
                console.log('....voy a grabar newIntent:: newState: ',newState) ;
                this.props.onAccept( {...newState.dataNewIntent} ) ;
                newState.dataNewIntent = {...INTENT_DEF} ;
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
        const TitleStep = (argProps) => {
            return(
            <span style={{fontSize:'18px', fontWeight:'600'}}>{argProps.text}</span>
            )
        }
        //
        return(
            //
            <Modal
                title={
                    <div style={{width:'100%',color:'#012EFF', fontSize:'26px',fontWeight:'600'}} >
                        <div style={{marginLeft:'20%'}} >
                            <Icon type="edit" style={{color:'green'}}/>
                            <span style={{marginLeft:'1%',color:'#012EFF',textAlign:'center',padding:'5px 5px 5px 5px', marginBottom:'0'}} >
                                {this.props.translate.newIntent}
                            </span>
                        </div>
                    </div>
                }
                wrapClassName="waiboc-cl-modal-intent"
                maskClosable={false}
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                bodyStyle={{paddingTop:'0'}}
                headerStyle={{padding:'5px 5px 5px 5px'}}
                visible={this.state.modalVisible}
                onCancel={(argEC)=>{this.props.onCancelModal(argEC);}}
                footer={null}
            >
                <div className="waiboc-cl-form" >
                    <div style={{marginTop:'20px',marginBottom:'10px'}}>
                        <Steps current={this.state.formStep}>
                            <Step key="1" title={<TitleStep text={this.props.translate.form.name}     />}  icon={this.state.formStep==0 ? <Icon type="loading" /> : false } />
                            <Step key="2" title={<TitleStep text={this.props.translate.form.examples} />} icon={this.state.formStep==1 ? <Icon type="loading" /> : false } />
                            <Step key="3" title={<TitleStep text={this.props.translate.form.answer}   />} icon={this.state.formStep==2 ? <Icon type="loading" /> : false } />
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