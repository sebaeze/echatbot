/*
* FormNewIntent
*/
import React                                from 'react' ;
import { FormIntentName   }                 from './FormIntentName'     ;
import { FormIntentExamples }               from './FormIntentExamples' ;
import { FormIntentAnswer }                 from './FormIntentAnswer'   ;
import { Typography, Steps, Icon }          from 'antd'  ;
import { Drawer }                           from 'antd'  ;
//
const { Step  }  = Steps      ;
const { Title }  = Typography ;
const INTENT_DEF = {intentName:'',intentLanguage:'',intentExamples:[],intentDomain:'',intentAnswer:{} } ;
//
const TitleStep = (props) => {
    //
    let spanProps = { className: "waiboc-intent-step" } ;
    let flagTargetCompleted = props.stepCompleted[ String(props.targetFormStep) ] || false ;
    if ( flagTargetCompleted==true ){
        spanProps.className = "waiboc-intent-step with-link" ;
        spanProps.onClick   = ()=>{ props.goToFormStep({ targetFormStep: props.targetFormStep }) } ;
    }
    //
    return( <span {...spanProps} > {props.text} </span> ) ;
    //
} ;
//
export class FormNewIntent extends React.Component {
    constructor(props){
        super(props) ;
        this.state              = {
            flagSpinner:false,
            modalVisible: this.props.modalVisible,
            flagNewIntent: this.props.flagNewIntent,
            enviadoOk:false,
            dataNewIntent: this.props.data!=false ? {...this.props.data} : {...INTENT_DEF},
            stepCompleted:  this.props.flagNewIntent==true ? {"0": false, "1": false, "2":false } : {"0": true, "1": true, "2": true },
            formStep: 0,
        } ;
        this.onNextStep         = this.onNextStep.bind(this) ;
        this.onPrevStep         = this.onPrevStep.bind(this) ;
        this.goToFormStep       = this.goToFormStep.bind(this) ;
    }
    //
    componentDidMount(){}
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.modalVisible!=state.modalVisible ){
            let newDerivedState = {
                formStep: 0,
                modalVisible: newProps.modalVisible,
                flagNewIntent: newProps.flagNewIntent,
                dataNewIntent: newProps.modalVisible==true ? {...newProps.data} : {...INTENT_DEF}
            } ;
            return {...newDerivedState} ;
        } else {
            return false ;
        }
    }
    //
    goToFormStep(argOptions){
        try {
            let targetStep = argOptions.targetFormStep ;
            if ( targetStep!=this.state.formStep ){
                if ( typeof targetStep=="string" ){
                    targetStep = parseInt( targetStep.trim() ) ;
                }
                this.setState({ formStep: targetStep }) ;
            }
        } catch(errGTF){
            console.log('....ERROR: ',errGTF) ;
        }
    } ;
    //
    onNextStep(argNextStep){
        try {
            //
            let tempStepCompleted = {...this.state.stepCompleted} ;
            tempStepCompleted[ String(this.state.formStep) ] = true ;
            //
            let newState = {
                dataNewIntent: Object.assign({...this.state.dataNewIntent},argNextStep),
                stepCompleted: tempStepCompleted,
                formStep: this.state.formStep+1
            }
            if ( newState.formStep>2 ){
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
                    <FormIntentName translate={this.props.translate} flagNewIntent={this.state.flagNewIntent} data={{...this.state.dataNewIntent}} chatbotConfig={this.props.chatbotConfig} onSubmitOk={this.onNextStep} prev={this.onPrevStep} />
                    :
                    this.state.formStep==1 ?
                        <FormIntentExamples translate={this.props.translate} data={{...this.state.dataNewIntent}} chatbotConfig={this.props.chatbotConfig} onSubmitOk={this.onNextStep} prev={this.onPrevStep}  />
                        :
                        <FormIntentAnswer   translate={this.props.translate} data={{...this.state.dataNewIntent}} chatbotConfig={this.props.chatbotConfig} onSubmitOk={this.onNextStep} prev={this.onPrevStep}  />
            )
        }
        //
        return(
            //
            <Drawer
                title={
                    <div style={{width:'100%',color:'#012EFF', fontSize:'26px',fontWeight:'600'}} >
                        <div style={{marginLeft:'35%',height:'50px',lineHeight:'50px'}} >
                            <Icon type="edit" style={{color:'green'}}/>
                            <span style={{marginLeft:'1%',color:'#012EFF',textAlign:'center',padding:'5px 5px 5px 5px', marginBottom:'0'}} >
                                {
                                this.state.flagNewIntent==true
                                    ?   this.props.translate.newIntent
                                    :   this.state.dataNewIntent.intentName||this.state.dataNewIntent.entity
                                }
                            </span>
                        </div>
                    </div>
                }
                destroyOnClose={true}
                width={ (window.innerWidth<797) ? '99%' : '80%' }
                placement="right"
                closable={true}
                className="waiboc-drawer"
                style={{border:'0.5px dotted gray',marginTop:'25px',zIndex:'9992'}}
                bodyStyle={{paddingTop:'0'}}
                headerStyle={{padding:'5px 5px 5px 5px'}}
                visible={this.state.modalVisible}
                onCancel={(argEC)=>{this.props.onCancelModal(argEC);}}
                onClose={(argEC)=>{this.props.onCancelModal(argEC);}}
                footer={null}
            >
                <div className="waiboc-cl-form" >
                    <div style={{marginTop:'20px',marginBottom:'10px'}}>
                        <Steps current={this.state.formStep}>
                            <Step key="1" title={<TitleStep targetFormStep={0} stepCompleted={this.state.stepCompleted} goToFormStep={this.goToFormStep} text={this.props.translate.form.name}     />} icon={this.state.formStep==0 ? <Icon type="loading" /> : false } />
                            <Step key="2" title={<TitleStep targetFormStep={1} stepCompleted={this.state.stepCompleted} goToFormStep={this.goToFormStep} text={this.props.translate.form.examples} />} icon={this.state.formStep==1 ? <Icon type="loading" /> : false } />
                            <Step key="3" title={<TitleStep targetFormStep={2} stepCompleted={this.state.stepCompleted} goToFormStep={this.goToFormStep} text={this.props.translate.form.answer}   />} icon={this.state.formStep==2 ? <Icon type="loading" /> : false } />
                        </Steps>
                    </div>
                    <NextStepForm />
                </div>
            </Drawer>
        ) ;
    }
    //
} ;
//