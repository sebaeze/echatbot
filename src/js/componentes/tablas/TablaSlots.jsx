/*
*
*/
import React                                               from 'react' ;
import { Table, Input, Button, notification, Icon }        from 'antd'  ;
import { Row, Col, Popconfirm, Popover }                   from 'antd'  ;
import moment                                              from 'moment-timezone'  ;
import { columnsSlots }                                    from './columns/columnsSlots' ;
import { FormEditNewSlot }                                 from '../formularios/FormEditNewSlot' ;
import { api }                                             from '../../api/api'    ;
import { STATUS_SLOT }                                     from '@sebaeze/echatbot-mongodb/dist/data/STATUS_SLOT'
//
const openNotificationWithIcon = (type,argText) => {
    notification[type]({
        top: 180,
        description: <h2>{argText}</h2>
    });
} ;
//
const log = require('debug')('WAIBOC:TablaSlot') ; // require('debug')('TablaSlots') ;
//
export class TablaSlots extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            flagCachedProps: false,
            flagSpinner: false,
            modalSlotVisible: false,
            slotNewModify: false,
            id: props.idChatbot||"",
            textBusqueda: '',
            arraySlots:  []
        } ;
        this.onChange               = this.onChange.bind(this) ;
        this.onCloseModal           = this.onCloseModal.bind(this)   ;
        this.onChangeSearch         = this.onChangeSearch.bind(this) ;
        this.onClickNewSlot         = this.onClickNewSlot.bind(this)  ;
        this.onAcceptNewSlot        = this.onAcceptNewSlot.bind(this) ;
        this.onClickEditSlot        = this.onClickEditSlot.bind(this) ;
        this.onClickDeleteSlot      = this.onClickDeleteSlot.bind(this) ;
        log('..constructor: props: ',props.idChatbot) ;
        this.columnas = columnsSlots({  translate: props.translate,
                                        onClickEditSlot: this.onClickEditSlot,
                                        onClickDeleteSlot: this.onClickDeleteSlot
                                    }) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( state.flagCachedProps==false || newProps.idChatbot!=state.idChatbot ){
            log('..getDerivedStateFromProps: props: ',newProps.idChatbot) ;
            let newState = {
                flagCachedProps: false,
                idChatbot: newProps.idChatbot,
                arraySlots: []
            } ;
            return newState ;
        } else {
            return false ;
        }
    }
    //
    componentDidMount(){
        log('..componentDidMount: props: ',this.props) ;
        try {
            if ( this.state.flagCachedProps==false ){
                this.setState({ flagSpinner: true }) ;
                api.chatbot.qrySlots({ idChatbot: this.props.idChatbot, status: STATUS_SLOT.ACTIVE })
                    .then((arrSlots)=>{
                        this.setState({ arraySlots: arrSlots, flagSpinner: false, flagCachedProps: true }) ;
                    })
                    .catch((errQ)=>{
                        this.setState({ flagSpinner: false }) ;
                        console.log('...ERROR: ',errQ) ;
                        throw errQ ;
                    }) ;
            } ;
        } catch(errDM){
            console.log('...ERROR: ',errDM) ;
            throw errDM ;
        }
    }
    //
    onCloseModal(argEE){
        if ( argEE && argEE.preventDefault ){ argEE.preventDefault(); }
        this.setState({modalSlotVisible:false})
    }
    //
    onAcceptNewSlot(argNewSlot){
        try {
          //
          let tempNewIntent = {
              ...argNewSlot,
              idChatbot: this.props.chatbotConfig._id,
              language: this.props.chatbotConfig.language ||'es',
              ts_last_update: moment( new Date() ).tz("America/Argentina/Buenos_Aires").format()
          };
          delete tempNewIntent._v ;
          delete tempNewIntent.__v ;
          //
          this.setState({ flagSpinner: true }) ;
          api.chatbot.updateSlot( tempNewIntent )
              .then((respSlot)=>{
                if ( respSlot.length>0 ){ respSlot=respSlot[0]; }
                if ( respSlot==false ){
                    openNotificationWithIcon('error',this.props.translate.form.userNotAuthorized) ;
                    this.setState({ flagSpinner: false }) ;
                } else {
                    openNotificationWithIcon('success',this.props.translate.form.changesSaved) ;
                    //
                    let tempArrSlots = this.state.arraySlots ;
                    let posSlot      = tempArrSlots.findIndex((elemSlot)=>{ return elemSlot._id==respSlot._id; })
                    if ( posSlot>-1 ){
                        tempArrSlots[posSlot] = respSlot ;
                    } else {
                        tempArrSlots.push( respSlot ) ;
                    }
                    this.setState({ flagSpinner: false, arraySlots: tempArrSlots, modalSlotVisible:false }) ;
                    //
                }
              })
              .catch((respErr)=>{
                this.setState({ flagSpinner: false }) ;
                console.dir(respErr) ;
              }) ;
          //
        } catch(errNI){
            console.dir(errNI) ;
            this.setState({ flagSpinner: false }) ;
        }
    }
    //
    onClickDeleteSlot(argRowSlot){
        try {
            //
            let tempArraySlots = this.state.arraySlots.filter((elemEntity)=>{ return elemEntity._id!=argRowSlot._id  ; }) ;
            let tempDeleteSlot  = {
                ...argRowSlot,
                status: STATUS_SLOT.DELETED,
                ts_last_update: moment( new Date() ).tz("America/Argentina/Buenos_Aires").format()
            } ;
            delete tempNewIntent._v ;
            delete tempNewIntent.__v ;
            //
            this.setState({ flagSpinner: true }) ;
            api.chatbot.updateSlot( tempDeleteSlot )
                .then((respSlot)=>{
                    if ( respSlot==false ){
                        openNotificationWithIcon('error',this.props.translate.form.userNotAuthorized) ;
                        this.setState({ flagSpinner: false }) ;
                    } else {
                        openNotificationWithIcon('success',this.props.translate.form.changesSaved) ;
                        this.setState({ flagSpinner: false, arraySlots: tempArraySlots }) ;
                    }
                })
                .catch((respErr)=>{
                    openNotificationWithIcon('error',this.props.translate.form.userNotAuthorized) ;
                    this.setState({ flagSpinner: false }) ;
                    console.dir(respErr) ;
                }) ;
            //
        } catch(errOCI){
            console.dir(errOCI) ;
            this.setState({ flagSpinner: false }) ;
        }
    }
    //
    onChangeSearch(argEventSearch){
        try {
            argEventSearch.preventDefault() ;
            let tempValorBuscar = argEventSearch.target.value || argEventSearch.target.innerText || '' ;
            this.setState({textBusqueda: tempValorBuscar}) ;
        } catch(errOCS){
            console.dir(errOCS) ;
        }
    }
    //
    onClickNewSlot(argEE){
        if ( argEE && argEE.preventDefault){ argEE.preventDefault(); }
        this.setState({
            modalSlotVisible: true,
            modalNewSlot: true,
            slotNewModify: { name:'',question:'',description:'' }
        }) ;
    }
    //
    onClickEditSlot(argRowIntent){
        try {
            //
            let tempSlot2Modify = {
                slotNewModify: {...argRowIntent},
                modalSlotVisible: true,
                modalNewSlot: false
            } ;
            this.setState( {...tempSlot2Modify} ) ;
            //
        } catch(errOCI){
            console.dir(errOCI) ;
        }
    }
    //
    onChange(pagination, filters, sorter){
        this.setState({ pagination: pagination });
    }
    //
    render(){
        //
        let arrayDatos = [] ;
        if ( this.state.textBusqueda.length==0 ){
            arrayDatos = this.state.arraySlots.map((elemTC,elemIdx)=>{
                return {
                    ...elemTC,
                    key: elemIdx,
                    language: elemTC.language||'es'
                } ;
            }) ;
        } else {
            this.state.arraySlots.forEach((elemTC,elemIdx)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(this.state.textBusqueda.toUpperCase())!=-1 ){
                    arrayDatos.push( {
                        ...elemTC,
                        key: elemIdx,
                        language: elemTC.language||'es'
                    } ) ;
                }
            }) ;
        }
        //
        return(
            <div className="waiboc-cl-form" >
                <FormEditNewSlot onAccept={this.onAcceptNewSlot}
                                data={this.state.slotNewModify}
                                onCancel={this.onCloseModal}
                                modalVisible={this.state.modalSlotVisible}
                                flagNewSlot={this.state.modalNewSlot}
                                translate={this.props.translate}
                />
                <div style={{width:'100%',marginTop:'20px',marginBottom:'15px'}}>
                    <Row>
                        <Col xs={24}  md={24}  lg={9} xl={9} xxl={9}>
                            <Input placeholder={this.props.translate.search}
                                onChange={this.onChangeSearch}
                                style={{height:'42px',width:'90%'}}
                            />
                        </Col>
                        <Col xs={23}  md={23}  lg={10} xl={10} xxl={10}>
                            <Button.Group size="large" >
                                <Button onClick={this.onClickNewSlot}  type="primary" style={{marginTop:'3px'}} >
                                {this.props.translate.form.newSlot}
                                </Button>
                            </Button.Group>
                        </Col>
                    </Row>
                </div>
                <Table
                    loading={this.state.flagSpinner}
                    columns={this.columnas}
                    dataSource={ arrayDatos }
                    rowKey="name"
                    // style={{marginLeft:'10px'}}
                    pagination={{position:'bottom', defaultPageSize: 50, showSizeChanger:true, showQuickJumper: true,locale:this.props.translate.pagination}}
                    onChange={this.onChange.bind(this)}
                    bordered
                    locale={this.props.translate}
                    scroll={{ x: 1500 }}
                />
            </div>
        )
    }
    //
} ;
//