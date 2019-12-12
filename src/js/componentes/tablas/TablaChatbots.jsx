/*
*
*/
import React                                               from 'react' ;
import { Table, Typography, Input, Button, Icon, Modal }   from 'antd'  ;
import { api }                                      from '../../api/api' ;
import { FormNewChatbot }                           from '../formularios/FormNewChatbot' ;
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
            userInfo: this.props.userInfo,
            modalVisible: false,
            modalDeleteChatbot: false,
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
            //console.log('.....didupdate:: this.flagMounted: '+this.flagMounted+';') ;
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
            console.log('....onClickEditChatbot:: argChatbot: ') ;
            console.dir(argChatbot) ;
            window.location.href = '/edit/'+argChatbot._id ;
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
                {title: this.props.translate.table.action,dataIndex: '',width:200,key: 'x',fixed: 'left',
                       render: (argRecord) => {
                            return (
                                <div  style={{width:'100%'}}>
                                    <p style={{padding:'0',fontWeight:'600'}}>
                                        <a  onClick={()=>this.onClickEditChatbot(argRecord)}>{this.props.translate.edit}</a>
                                    </p>
                                </div>
                            )}
                },
                {title: 'Id',
                        width: 200,dataIndex:'_id', key:'_id',fixed: 'left',
                        //render: text => <span style={{fontWeight:'700',color:'#497EC0'}}>{text}</span>,
                        render: (text,objReg) => <a style={{fontWeight:'700',color:'#497EC0'}} onClick={()=>{this.onClickEditChatbot(objReg)}}>{text}</a>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a._id.localeCompare(b._id) } ,
                {title: this.props.translate.table.chatbotName,width: 200,
                        dataIndex:'botName', key:'botName',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.botName.localeCompare(b.botName) },
                {title: this.props.translate.status       ,width: 100,dataIndex:'status',key:'status',
                        render: (text) => <a style={{fontWeight:'700',color:'#497EC0'}} >{text}</a>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.status.localeCompare(b.status) } ,
                {title: this.props.translate.table.description       ,width: 150,dataIndex:'description',key:'description',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.description.localeCompare(b.description) } ,
                {title: this.props.translate.table.plan  ,width: 150,dataIndex:'plan',key:'plan',
                        defaultSortOrder: 'descend', sorter: (a, b) => a.plan.localeCompare(b.plan) } ,
                {title: this.props.translate.table.messagesConsumed ,width: 200,dataIndex:'qtyMessages', key:'qtyMessages',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.qtyMessages - b.qtyMessages } ,
                {title: this.props.translate.table.language ,width: 200,dataIndex:'language', key:'language',
                        render: text => <span style={{fontWeight:'700'}}>{text}</span>,
                        defaultSortOrder: 'descend', sorter: (a, b) => a.language - b.language },
                {title: this.props.translate.table.ChatbotStatusDisplay ,
                        dataIndex:'botSubtitle', key:'botSubtitle' , defaultSortOrder: 'descend',
                        sorter: (a, b) => a.botSubtitle.localeCompare(b.botSubtitle) }
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
            <div>
                <Modal
                    title=""
                    maskClosable={false}
                    visible={this.state.modalDeleteChatbot}
                    style={{top:'150px',zIndex:'9992'}}
                    // onOk={this.onClickOkModal.bind(this)}
                    onCancel={()=>{this.setState({modalDeleteChatbot:false});}}
                    footer={[
                        <Button key="DELETE" type="primary"
                                onClick={ () => { this.onClickDeleteChatbot(this.state.chatbotBorrar);this.setState({modalDeleteChatbot:false}); } }
                        >
                            {this.props.translate.delete}
                        </Button>,
                        <Button key="CANCEL" type="primary"
                                onClick={ () => { this.setState({modalDeleteChatbot:false}); } }
                        >
                            {this.props.translate.cancel}
                        </Button>
                        ]}
                >
                    <div style={{fontSize:'32px',width:'100%',textAlign:'center'}} >{this.props.translate.danger} <Icon type="exclamation" style={{color:'#FF0000',fontSize:'32px'}}/></div>
                </Modal>
                <div style={{width:'100%',marginTop:'20px',marginBottom:'15px'}}>
                    <Input placeholder={this.props.translate.search}
                           onChange={this.onChangeSearch}
                           style={{height:'42px',marginLeft:'10px', width:'20%'}}
                    />
                    <Button type="primary" size={"large"} style={{marginLeft:'10px'}} className="btn-edit-menu"  onClick={this.onClickCreateNewChatbot} >
                      {this.props.translate.newChatbot}
                    </Button>
                </div>
                <Table
                    //rowSelection={{...this.rowSelection()}}
                    loading={this.state.flagSpinner}
                    columns={this.state.columnas}
                    style={{marginLeft:'10px'}}
                    pagination={{position:'top'}}
                    dataSource={ arrayDatos }
                    onChange={this.onChange.bind(this)}
                    bordered
                    locale={this.props.translate}
                    scroll={{ x: 1500 }}
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
        )
    }
    //
} ;
//