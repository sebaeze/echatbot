/*
*
*/
import React                                        from 'react' ;
import { Table, Typography, Input, Button, Icon }   from 'antd'  ;
import { Modal, Popconfirm, Row, Col }              from 'antd'  ;
import { api }                                      from '../../api/api' ;
import { FormNewChatbot }                           from '../formularios/FormNewChatbot' ;
import { CuerpoEditBot }                            from "../cuerpoPagina/CuerpoEditBot" ;
//
const { Title } = Typography ;
//
export class TablaChatbots extends React.Component {
    constructor(props){
        super(props) ;
        this.rowSelection   = this.rowSelection.bind(this) ;
        this.onCancelModal  = this.onCancelModal.bind(this) ;
        this.onChange       = this.onChange.bind(this)     ;
        this.onChangeSearch = this.onChangeSearch.bind(this) ;
        this.parseColumns   = this.parseColumns.bind(this) ;
        this.addNewChatbot  = this.addNewChatbot.bind(this) ;
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
            this.flagMounted = true ;
            if ( this.props.userInfo && this.props.userInfo.email.length>0 ){
                this.setState({flagSpinner: true}) ;
                api.chatbot.qry({idUser: this.props.userInfo.email})
                    .then((respQry)=>{
                        respQry.forEach((elemCbot,elemIdx)=>{ elemCbot.key = elemIdx ; }) ;
                        this.setState({arrayChatbots: respQry, flagSpinner: false}) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
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
    componentDidUpdate(prevProps){
        try {
            if ( this.flagMounted==true && this.props.userInfo.email!=prevProps.userInfo.email ){
                this.setState({flagSpinner: true}) ;
                api.chatbot.qry({idUser: this.props.userInfo.email})
                    .then((respQry)=>{
                        respQry.forEach((elemCbot,elemIdx)=>{ elemCbot.key = elemIdx ; }) ;
                        this.setState({arrayChatbots: respQry, flagSpinner: false}) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                        this.setState({flagSpinner: false}) ;
                    }) ;
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
            console.log('....deleteChatbot:: argChatbot: ') ;
            console.dir(argChatbot) ;
            //
            this.setState({flagSpinner: true}) ;
            api.chatbot.delete(argChatbot)
                .then((respADD)=>{
                    if ( respADD.result.length>0 ){ respADD.result=respADD.result[0]; }
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
            // window.location.href = '/edit/'+argChatbot._id ;
            this.setState({idChatbotEdit: (argChatbot._id||argChatbot.idChatbot)}) ;
            //
        } catch(errDelChatbot){
            console.dir(errEditChatbot) ;
        }
    }
    //
    addNewChatbot(argObjChatbot){
        try {
            this.setState({flagSpinner: true}) ;
            api.chatbot.add(argObjChatbot)
                .then((respADD)=>{
                    if ( respADD.length>0 ){ respADD=respADD[0]; }
                    let tempArrayBots = this.state.arrayChatbots ;
                    tempArrayBots.push({
                        key:(tempArrayBots.length+1),
                        ...respADD
                    }) ;
                    this.setState({arrayChatbots: tempArrayBots, flagSpinner: false}) ;
                })
                .catch((respErr)=>{
                    console.dir(respErr) ;
                    this.setState({flagSpinner: false}) ;
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
        let outCols = [] ;
        try {
            //
            outCols = [
                {title: 'Id',
                    width: 300,dataIndex:'_id', key:'_id',
                    render: (text,argRow) => {
                        return(
                            <div>
                                <span style={{paddingLeft:'5px',width:'100%',fontWeight:'600',fontSize:'20px',color:'#497EC0'}}>
                                    <u>{text}</u>
                                </span><br/>
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
                    defaultSortOrder: 'descend', sorter: (a, b) => a._id.localeCompare(b._id)
                } ,
                {title: this.props.translate.table.chatbotName,width: 250,
                        render: (text,argRow) => {
                            return(
                                <a style={{fontWeight:'500',fontSize:'18px',color:'#497EC0'}}
                                    onClick={(argEE)=>{argEE.preventDefault();this.onClickEditChatbot(argRow);}}
                                >
                                    {text}
                                </a>
                            )
                        } ,
                        dataIndex:'botName', key:'botName',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.botName.localeCompare(b.botName) },
                {title: this.props.translate.status       ,width: 200,dataIndex:'status',key:'status',
                        // render: (text) => <a style={{fontWeight:'700'}} >{text}</a>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.status.localeCompare(b.status) } ,
                {title: this.props.translate.table.description       ,width: 250,dataIndex:'description',key:'description',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.description.localeCompare(b.description) } ,
                {title: this.props.translate.table.messagesConsumed ,width: 200,dataIndex:'qtyMessages', key:'qtyMessages',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.qtyMessages - b.qtyMessages } ,
                {title: this.props.translate.table.plan  ,width: 150,dataIndex:'plan',key:'plan',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.plan.localeCompare(b.plan) }
                /* ,{title: this.props.translate.table.language ,width: 200,dataIndex:'language', key:'language',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.language - b.language },
                {title: this.props.translate.table.ChatbotStatusDisplay ,
                        dataIndex:'botSubtitle', key:'botSubtitle' , defaultSortOrder: 'descend',
                        sorter: (a, b) => a.botSubtitle.localeCompare(b.botSubtitle) }
                */
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
            arrayDatos = this.state.arrayChatbots ;
        } else {
            this.state.arrayChatbots.forEach((elemTC)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(this.state.textBusqueda.toUpperCase())!=-1 ){
                    arrayDatos.push( elemTC ) ;
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
                            <div style={{width:'100%',marginTop:'5px',marginBottom:'5px'}}>
                                <Row>
                                    <Col xs={1} md={1} lg={1} xl={1} xxl={1} ></Col>
                                    <Col xs={23} md={23} lg={8} xl={8} xxl={8} >
                                        <Input placeholder={this.props.translate.search}
                                            onChange={this.onChangeSearch}
                                            style={{height:'42px', width:'90%'}}
                                        />
                                    </Col>
                                    <Col xs={1} md={1} lg={1} xl={1} xxl={1} ></Col>
                                    <Col xs={24} md={24} lg={8} xl={8} xxl={8} >
                                        <Button type="primary"
                                                size={"large"} className="btn-edit-menu"
                                                onClick={this.onClickCreateNewChatbot}
                                                style={{marginTop:'3px'}}
                                        >
                                            {this.props.translate.newChatbot}
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
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
                                scroll={{ x: 1000 }}
                            />
                            {
                                this.state.modalVisible==true ?
                                    <FormNewChatbot
                                        modalVisible={this.state.modalVisible}
                                        translate={this.props.translate}
                                        onCancelModal={this.onCancelModal}
                                        sel={
                                            (argSel)=>{
                                                this.setState({modalVisible: false }) ;
                                                let tempNewCBot = {
                                                    ...argSel,
                                                    idUser: this.state.userInfo.email
                                                } ;
                                                this.addNewChatbot(tempNewCBot) ;
                                            }
                                        }
                                    />
                                    : null
                            }
                        </div>
                }
            </div>
        )
    }
    //
} ;
//