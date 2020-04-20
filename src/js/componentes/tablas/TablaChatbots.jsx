/*
*
*/
import React                                           from 'react' ;
import { Table, Typography, Input, Button, Icon }      from 'antd'  ;
import { Popconfirm, Row, Col, Popover, notification } from 'antd'  ;
import { api }                                         from '../../api/api' ;
import { FormNewChatbot }                              from '../formularios/FormNewChatbot' ;
import { CuerpoEditBot  }                              from "../cuerpoPagina/CuerpoEditBot" ;
import { copy2Clipboard, widgetCode }                  from '../../utils/utiles' ;
import SyntaxHighlighter                               from 'react-syntax-highlighter' ;
import { PARAMETROS }                                  from '../../utils/parametros';
//
export class TablaChatbots extends React.Component {
    constructor(props){
        super(props) ;
        this.rowSelection   = this.rowSelection.bind(this) ;
        this.onCancelModal  = this.onCancelModal.bind(this) ;
        this.onChange       = this.onChange.bind(this)     ;
        this.onChangeSearch = this.onChangeSearch.bind(this) ;
        this.parseColumns   = this.parseColumns.bind(this) ;
        this.addNewChatbot           = this.addNewChatbot.bind(this)           ;
        this.onAcceptNewChatbot      = this.onAcceptNewChatbot.bind(this)      ;
        this.onClickTrainChatbot     = this.onClickTrainChatbot.bind(this)     ;
        this.onClickEditChatbot      = this.onClickEditChatbot.bind(this)      ;
        this.onClickDeleteChatbot    = this.onClickDeleteChatbot.bind(this)    ;
        this.onClickCreateNewChatbot = this.onClickCreateNewChatbot.bind(this) ;
        let tempColumn      = this.parseColumns() ;
        this.flagMounted    = false ;
        this.state          = {
            idChatbotEdit: false ,
            userInfo: this.props.userInfo,
            modalVisible: false,
            chatbotBorrar: false,
            arrayChatbots: [],
            textBusqueda: '',
            arraySeleccionados:[],
            columnas: tempColumn,
            flagSpinner: true
        } ;
        //
    }
    //
    componentDidMount(){
        try {
            if ( this.flagMounted==false ){
                this.setState({flagSpinner: true}) ;
                api.chatbot.qry({idUser: this.props.userInfo.email})
                    .then((respQry)=>{
                        respQry.forEach((elemCbot,elemIdx)=>{ elemCbot.key = elemIdx ; }) ;
                        this.flagMounted = true ;
                        this.setState({arrayChatbots: respQry, flagSpinner: false}) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                        this.flagMounted = true ;
                        this.setState({flagSpinner: false}) ;
                    }) ;
            } else {
                this.setState({flagSpinner: false}) ;
            }
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        return { userInfo: newProps.userInfo } ;
    }
    //
    onClickDeleteChatbot(argChatbot){
        try {
            //
            this.setState({flagSpinner: true}) ;
            api.chatbot.delete(argChatbot)
                .then((respADD)=>{
                    if ( respADD.result.length>0 ){ respADD.result=respADD.result[0]; }
                    //
                    let tempArrayBots = this.state.arrayChatbots.filter((elemBot)=>{ return elemBot._id!=argChatbot._id ; }) ;
                    this.setState({arrayChatbots: tempArrayBots, flagSpinner: false}) ;
                    //
                    /*
                    let indexBot      = this.state.arrayChatbots.findIndex((elemState)=>{
                        return elemState._id==respADD.result._id ;
                    }) ;
                    console.log('\n...indexBot: '+indexBot+' respADD: ') ;
                    console.dir(respADD) ;
                    if ( indexBot!=-1 ){
                        let tempArrayBots = this.state.arrayChatbots ;
                        tempArrayBots[ indexBot ] = {...respADD.result,key: respADD.result._id} ;
                        if ( respADD.resultCode!=0 ){
                            tempArrayBots[ indexBot ].status =  respADD.message ;
                        }
                        this.setState({arrayChatbots: tempArrayBots, flagSpinner: false}) ;
                    } else {
                        this.setState({flagSpinner: false}) ;
                    }
                    */
                })
                .catch((respErr)=>{
                    console.dir(respErr) ;
                    this.setState({flagSpinner: false}) ;
                }) ;
            //
        } catch(errDelChatbot){
            console.dir(errDelChatbot) ;
        }
    }
    //
    onClickTrainChatbot(argChatbot){
        try {
            console.log('....onClickTrainChatbot:: argChatbot: ') ;
            console.dir(argChatbot) ;
            window.location.href = '/train/'+argChatbot._id ;
            //
        } catch(errDelChatbot){
            console.dir(errEditChatbot) ;
        }
    }
    //
    onClickEditChatbot(argChatbot){
        try {
            // this.setState({idChatbotEdit: argChatbot._id }) ;
            let idChatbot       = argChatbot._id ;
            let urlTrainchatbot = `${PARAMETROS.FRONTEND.URL_TRAIN_CHATBOT}${idChatbot}` ;
            console.log('...urlTrainchatbot: ',urlTrainchatbot,' para: ',PARAMETROS.FRONTEND.URL_TRAIN_CHATBOT) ;
            this.props.history.push( urlTrainchatbot ) ;
            //
        } catch(errDelChatbot){
            console.dir(errDelChatbot) ;
        }
    }
    //
    onAcceptNewChatbot(argSel){
        try {
            let tempNewCBot = { ...argSel, idUser: this.state.userInfo.email } ;
            this.addNewChatbot(tempNewCBot) ;
        } catch(errOANC){
            console.dir(errOANC) ;
        }
    } ;
    //
    addNewChatbot(argObjChatbot){
        try {
            //
            this.setState({flagSpinner: true, modalVisible: false}) ;
            let newState   = { flagSpinner: false  };
            let newChatbot = {} ;
            //
            api.chatbot.add(argObjChatbot)
                .then((respNewBot)=>{
                    //
                    newChatbot = respNewBot.length>0 ? respNewBot[0] : respNewBot ;
                    if ( !newChatbot.training ){ newChatbot.training={} ; }
                    if ( Object.keys(newChatbot.training).length==0 ){
                        let tempChatbotTrain = {...newChatbot,train:[]} ;
                        PARAMETROS.DEFAULT_INTENTS.forEach((elemIntent)=>{
                            tempChatbotTrain.train.push({...elemIntent,idChatbot: newChatbot._id}) ;
                        })
                        return api.chatbot.train( tempChatbotTrain , false ) ;
                    } else {
                        return [] ;
                    } ;
                    //
                })
                .then((respTrain)=>{
                    //
                    console.log('.....respTrain: ',respTrain) ;
                    if ( respTrain.result.length>0 ){
                        respTrain.result.forEach((elemINT)=>{
                            if ( Array.isArray(elemINT) && elemINT.length==1 ){ elemINT=elemINT[0]; }
                            let keyIntent = elemINT.entity || elemINT.name ;
                            newChatbot.training[ keyIntent ] = elemINT ;
                        }) ;
                    }
                    console.log('.......newChatbot.training: ',newChatbot.training) ;
                    //
                    newChatbot.key         = ( this.state.arrayChatbots.length+1 ) ;
                    newState.arrayChatbots = this.state.arrayChatbots ;
                    newState.arrayChatbots.push({ ...newChatbot }) ;
                    //
                    this.setState( newState ) ;
                    //
                })
                .catch((respErr)=>{
                    console.dir(respErr) ;
                    this.setState( newState ) ;
                }) ;
                //
        } catch(errAddNC){
            console.dir(errAddNC) ;
        }
    }
    //
    onClickCreateNewChatbot(argEE){
        try {
            //
            argEE.preventDefault() ;
            if ( !this.state.modalVisible ){
                this.setState({modalVisible: true}) ;
            }
            //
        } catch(errOCNC){
            console.dir(errOCNC) ;
        }
    }
    //
    parseColumns(){
        //
        let outCols = [] ;
        //
        const notificationCopied = () => {
            notification['success']({
                description: <h2>{this.props.translate.copied}</h2>
            });
        } ;
        //
        //
        try {
            //
            outCols = [
                {title: 'Id',
                    width: 210,dataIndex:'_id', key:'_id',
                    render: (text,argRow) => {
                        return(
                            <div>
                                <div style={{width:'100%',alignContent:'center'}} >
                                    <a style={{paddingLeft:'5px',fontWeight:'600',fontSize:'20px',color:'#497EC0'}}
                                        onClick={(argEE)=>{argEE.preventDefault();this.onClickEditChatbot(argRow);}}
                                    >
                                        <u>{argRow.botName}</u>
                                    </a>
                                </div>
                                <a style={{paddingLeft:'5px',width:'100%',fontWeight:'600',fontSize:'18px',color:'#497EC0'}}
                                      onClick={(argEE)=>{argEE.preventDefault();this.onClickEditChatbot(argRow);}}
                                >
                                    {text}
                                </a>
                                <br/>
                                <a style={{fontWeight:'500',fontSize:'18px',color:'#497EC0'}}
                                    onClick={(argEE)=>{argEE.preventDefault();this.onClickEditChatbot(argRow);}}
                                >
                                    <Icon type="edit" style={{color:'green'}}/>
                                    <span style={{marginLeft:'7px'}} >{this.props.translate.edit}</span>
                                </a>
                                <br/>
                                <Popconfirm placement="topRight" title={this.props.translate.form.deleteChatbotConfirmation}
                                    onConfirm={()=>{this.onClickDeleteChatbot(argRow);}}
                                    okText={this.props.translate.yes} cancelText="No"
                                >
                                    <a style={{fontWeight:'500',fontSize:'18px',color:'#497EC0'}} >
                                        <Icon type="delete" style={{color:'red'}}/>
                                        <span style={{marginLeft:'7px'}} >{this.props.translate.delete}</span>
                                    </a>
                                </Popconfirm>
                            </div>
                        )
                    },
                    defaultSortOrder: 'descend', sorter: (a, b) => a.botName.localeCompare(b.botName)
                } ,
                {title: this.props.translate.integration ,width: 150,
                        render: (text,argRow) => {
                            let widgetCodeLink = widgetCode({ url: __URL_WIDGET__, ts_last_update: argRow.ts_last_update, _id: argRow._id, secret: argRow.secret }) ;
                            return(
                                <div>
                                    <Button onClick={()=>{copy2Clipboard(widgetCodeLink);notificationCopied();}} >
                                        <Icon type="copy" />
                                        {this.props.translate.copyWidget}
                                    </Button>
                                    <div style={{width:'100%',marginTop:'10px'}}>
                                        <Popover trigger="hover"
                                                content={
                                                    <SyntaxHighlighter language="javascript" >
                                                        {widgetCodeLink}
                                                    </SyntaxHighlighter>
                                                }
                                                style={{width:'200px',height:'200px'}}
                                        >
                                            <span className="waiboc-tab-answer-example" >
                                                <Icon type="code" style={{marginRight:'10px'}} />
                                                {this.props.translate.checkWidgetCode}
                                            </span>
                                        </Popover>
                                    </div>
                                </div>
                            )
                        } ,
                        key:'ww'},
                {title: this.props.translate.status                 ,width: 70,dataIndex:'status',key:'status',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.status.localeCompare(b.status) } ,
                {title: this.props.translate.table.plan             ,width: 70,dataIndex:'plan',key:'plan',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.plan.localeCompare(b.plan) },
                {title: this.props.translate.table.messagesConsumed ,width: 120,dataIndex:'qtyMessages', key:'qtyMessages',
                        render: text => <div style={{width:'100%', textAlign:'center'}} ><span style={{fontWeight:'700'}}>{text}</span></div>,
                        defaultSortOrder: 'descend', sorter: (a, b) => b.qtyMessages-a.qtyMessages } ,
                {title: this.props.translate.table.description       ,width: 250,dataIndex:'description',key:'description',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.description.localeCompare(b.description) }
            ] ;
            //
        } catch(errPC){
            console.dir(errPC) ;
        }
        return outCols ;
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
    rowSelection(){
        try {
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    this.setState({arraySeleccionados:selectedRows}) ;
                    if ( this.props.sel ){
                        this.props.sel( selectedRows ) ;
                    }
                  },
                  getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',
                    name: record.name,
                  })
            }
        } catch(errRS){
            console.dir(errRS) ;
        }
    }
    //
    onChange(pagination, filters, sorter){
        this.setState({ pagination: pagination });
    }
    //
    onCancelModal(argEC){
        try {
            argEC.preventDefault() ;
            this.setState({modalVisible: false}) ;
        } catch(errOCM){
            console.dir(errOCM) ;
        }
    }
    //
    render(){
        //
        let arrayDatos = [] ;
        if ( this.state.textBusqueda.length==0 ){
            arrayDatos = this.state.arrayChatbots.map((elemE,idxE)=>{
                return({
                    ...elemE,
                    botName: elemE.botName||'',
                    key: idxE
                }) ;
            }) ;
        } else {
            this.state.arrayChatbots.forEach((elemTC,idxE)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(this.state.textBusqueda.toUpperCase())!=-1 ){
                    // arrayDatos.push( elemTC ) ;
                    arrayDatos.push({
                        ...elemTC,
                        botName: elemTC.botName||'',
                        key: idxE
                    }) ;
                }
            }) ;
        }
        //
        return(
            <div  className="waiboc-cl-form">
                {
                    this.state.idChatbotEdit!=false ?
                        <CuerpoEditBot translate={this.props.translate}
                                    idChatbot={this.state.idChatbotEdit}
                                    onFinishEdit={()=>{this.setState({idChatbotEdit: false});}}
                                    configuracion={this.props.configuracion}
                                    {...this.props.argMach}
                        />
                        :
                        <div>
                            <Row style={{paddingTop:'5px',paddingBottom:'5px'}} >
                                <Col xs={24} md={24} lg={8} xl={8} xxl={8} >
                                    <Input  allowClear
                                            size="large"
                                            placeholder={this.props.translate.search}
                                            onChange={this.onChangeSearch}
                                            style={{height:'100%', width:'100%', marginLeft:'10px'}}
                                    />
                                </Col>
                                <Col xs={24} md={24} lg={8} xl={8} xxl={8} >
                                    <Button type="primary"
                                            size={"large"}
                                            //className="btn-edit-menu"
                                            onClick={this.onClickCreateNewChatbot}
                                            style={{width:'80%',marginLeft:'20px'}}
                                    >
                                        {this.props.translate.newChatbot}
                                    </Button>
                                </Col>
                            </Row>
                            <Row style={{paddingTop:'5px',paddingBottom:'5px'}} >
                                <Table
                                    loading={this.state.flagSpinner}
                                    columns={this.state.columnas}
                                    dataSource={ arrayDatos }
                                    rowKey="_id"
                                    style={{marginLeft:'10px'}}
                                    pagination={{position:'bottom'}}
                                    onChange={this.onChange.bind(this)}
                                    bordered
                                    locale={this.props.translate}
                                    scroll={{ x: 1500 }}
                                />
                            </Row>
                            <FormNewChatbot
                                modalVisible={this.state.modalVisible}
                                translate={this.props.translate}
                                onCancelModal={this.onCancelModal}
                                sel={this.onAcceptNewChatbot}
                            />
                        </div>
                }
            </div>
        )
    }
    //
} ;
//