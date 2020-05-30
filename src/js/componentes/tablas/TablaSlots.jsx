/*
*
*/
import React                                               from 'react' ;
import { Table, Input, Button, notification }        from 'antd'  ;
import { Row, Col  }                                 from 'antd'  ;
import moment                                              from 'moment-timezone'  ;
import { columnsSlots }                                    from './columns/columnsSlots' ;
import { FormEditNewSlot }                                 from '../formularios/FormEditNewSlot' ;
import { api }                                             from '../../api/api'    ;
import { searchTextInArray }                               from '../util/searchTable' ;
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
            flagSelection: this.props.flagSelection ,
            id: props.idChatbot||"",
            textBusqueda: '',
            arraySlots:  [] ,
            selectedRowsKeys: []
        } ;
        this.onChange               = this.onChange.bind(this) ;
        this.onCloseModal           = this.onCloseModal.bind(this)   ;
        this.onChangeSearch         = this.onChangeSearch.bind(this) ;
        this.onClickNewSlot         = this.onClickNewSlot.bind(this)  ;
        this.onUpdateSlot           = this.onUpdateSlot.bind(this) ;
        this.onClickEditSlot        = this.onClickEditSlot.bind(this) ;
        this.onClickDeleteSlot      = this.onClickDeleteSlot.bind(this) ;
        this.onChangeRowSelection   = this.onChangeRowSelection.bind(this) ;
        this.columnas = columnsSlots({  translate: props.translate,
                                        flagSelection: this.state.flagSelection,
                                        onClickEditSlot: this.onClickEditSlot,
                                        onClickDeleteSlot: this.onClickDeleteSlot
                                    }) ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( state.flagCachedProps==false || newProps.idChatbot!=state.idChatbot ){
            let newState = {
                flagCachedProps: false,
                flagSelection: newProps.flagSelection ,
                idChatbot: newProps.idChatbot,
                arraySlots: []
            } ;
            //
            if ( newProps.arraySlots && newProps.arraySlots.length>0 ){
                newState.arraySlots      = newProps.arraySlots ;
                newState.flagCachedProps = true ;
            }
            //
            if ( newProps.data && newProps.data.slots ){
                newState.selectedRowsKeys = newProps.data.slots.map((elemSlot)=>{
                                                return elemSlot.name ;
                                            }) ;
            } else {
                newState.selectedRowsKeys = [] ;
            }
            //
            return newState ;
        } else {
            return false ;
        }
    }
    //
    componentDidMount(){
        try {
            if ( this.state.flagCachedProps==false ){
                this.setState({ flagSpinner: true }) ;
                api.chatbot.qrySlots({ idChatbot: this.props.idChatbot, status: STATUS_SLOT.ACTIVE })
                    .then((arrSlots)=>{
                        this.props.onUpdateSlots( arrSlots ) ;
                        let arrayKeysSelected = ( this.props.data && this.props.data.slots )
                                                    ? this.props.data.slots.map((elemSlot)=>{
                                                        return elemSlot.name ;
                                                    })
                                                    : [] ;
                        this.setState({ arraySlots: arrSlots, flagSpinner: false, flagCachedProps: true, selectedRowsKeys: arrayKeysSelected }) ;
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
    onUpdateSlot(argNewSlot){
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
                    this.props.onUpdateSlots( tempArrSlots ) ;
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
            delete tempDeleteSlot._v ;
            delete tempDeleteSlot.__v ;
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
    onChangeRowSelection( argSelectedRowKeys, selectedRows){
        if ( this.props.onSelectSlots ){
            this.props.onSelectSlots( selectedRows ) ;
        }
        this.setState({ selectedRowsKeys: argSelectedRowKeys }) ;
    }
    //
    render(){
        //
        let arrayDatos = searchTextInArray( this.state.arraySlots, this.state.textBusqueda, "name" ) ;
        //
        let extraPropsTable = {} ;
        if ( this.state.flagSelection==true ){
            extraPropsTable.rowSelection = {
                onChange: this.onChangeRowSelection,
                selectedRowKeys: this.state.selectedRowsKeys
            } ;
        }
        //
        return(
            <div className="waiboc-cl-form" >
                <FormEditNewSlot onAccept={this.onUpdateSlot}
                                data={this.state.slotNewModify}
                                onCancel={this.onCloseModal}
                                modalVisible={this.state.modalSlotVisible}
                                flagNewSlot={this.state.modalNewSlot}
                                translate={this.props.translate}
                />
                <div style={{width:'100%',marginTop:'15px',marginBottom:'15px'}}>
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
                    {...extraPropsTable}
                />
            </div>
        )
    }
    //
} ;
//