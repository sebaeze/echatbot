/*
*
*/
import React                                         from 'react' ;
import { Row, Col, Button, Icon   }                  from 'antd'  ;
import { TablaSlots }                                from '../tablas/TablaSlots' ;
//
const log = require('debug')('FormIntentSlots') ;
//
export class FormIntentSlots extends React.Component {
    constructor( props){
        super(props) ;
        this.state                = {
            flagSpinner:false,
            selectedSlots: ( this.props.data && this.props.data.slots ) ? this.props.data.slots : []
        } ;
        this.inputNameRef         = false ;
        this.onSubmitForm         = this.onSubmitForm.bind(this)  ;
        this.onSelectSlots        = this.onSelectSlots.bind(this) ;
    }
    //
    onSelectSlots(argArrSelected){
        try {
            let arrSelectedSlots = argArrSelected.map((elemSlot)=>{
                return {
                    language: elemSlot.language,
                    name: elemSlot.name,
                    question: elemSlot.question,
                    prefix: elemSlot.prefix||'##'
                } ;
            }) ;
            this.setState({ selectedSlots: arrSelectedSlots }) ;
        } catch(errOS){
            console.log('...ERROR: ',errOS) ;
            throw errOS ;
        }
    } ;
    //
    onSubmitForm(){
        try {
            //
            let intentSlots = {  slots: this.state.selectedSlots } ;
            this.props.onSubmitOk( intentSlots )
            //
        } catch(errFS){
            console.dir(errFS) ;
        }
    }
    //
    render(){
        //
        return(
            <Row style={{paddingTop:'30px'}} >
                <Row>
                    <TablaSlots
                        translate={this.props.translate}
                        idChatbot={this.props.chatbotConfig._id}
                        chatbotConfig={this.props.chatbotConfig}
                        arraySlots={this.props.arraySlots}
                        onUpdateSlots={this.props.onUpdateSlots}
                        flagSelection={ true }
                        data={this.props.data}
                        onSelectSlots={this.onSelectSlots}
                    />
                </Row>
                <Row>
                {
                    this.state.flagSpinner==true ?
                        <Spin size="large" />
                        :
                        <div>
                            <Button type="primary" size="large" onClick={this.onSubmitForm} >
                                {this.props.translate.next}
                                <Icon type="right" />
                            </Button>
                            <Button size="large"
                                style={{marginLeft:'10px'}}
                                onClick={this.props.prev}
                            >
                                <Icon type="left" />
                                {this.props.translate.previous}
                            </Button>
                        </div>
                }
                </Row>
            </Row>
        ) ;
    }
    //
} ;
//