/*
* FormNewIntent
*/
import React                                from 'react' ;
import { FormIntentName   }                 from '../FormIntentName'     ;
import { FormIntentExamples }               from '../FormIntentExamples' ;
import { FormIntentSlots }                  from '../FormIntentSlots'    ;
import { FormIntentAnswer }                 from '../FormIntentAnswer'   ;
//
export const TitleStep = (props) => {
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
export const NextStepFormIntent    = (props) => {
    //
    let outRender = {} ;
    switch( String(props.formStep) ){
        case '0':
            outRender = <FormIntentName     translate={props.translate} flagNewIntent={props.flagNewIntent} data={props.data} chatbotConfig={props.chatbotConfig} onSubmitOk={props.onSubmitOk} prev={props.prev} /> ;
        break ;
        case '1':
            outRender = <FormIntentSlots    translate={props.translate} data={props.data} chatbotConfig={props.chatbotConfig} arraySlots={props.arraySlots} onUpdateSlots={props.onUpdateSlots} onSubmitOk={props.onSubmitOk} prev={props.prev}  /> ;
        break ;
        case '2':
            outRender = <FormIntentExamples translate={props.translate} data={props.data} chatbotConfig={props.chatbotConfig} onSubmitOk={props.onSubmitOk} prev={props.prev}  /> ;
        break ;
        case '3':
            outRender = <FormIntentAnswer   translate={props.translate} data={props.data} chatbotConfig={props.chatbotConfig} onSubmitOk={props.onSubmitOk} prev={props.prev}  /> ;
        break ;
        default:
            console.log('....form Step unknown: '+props.formStep)
        break ;
    }
    //
    return( outRender ) ;
    //
}