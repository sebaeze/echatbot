/*
* TablaTraining
*/
import React                                               from 'react' ;
import { Table, Input, Button, notification, Icon }        from 'antd'  ;
import { Row, Col, Popconfirm, Popover }                   from 'antd'  ;
import moment                                              from 'moment-timezone'     ;
import { CustomReply }                                     from 'waiboc-widget-react' ;
//   import { CustomReply }  from '../../../../../waiboc-widget-react/lib/index'  ;// 'waiboc-widget-react' ;
import { api }                                             from '../../api/api' ;
import { FormNewIntent }                                   from '../formularios/FormNewIntent' ;
import { TestChatbotWidget }                               from '../chat/TestChatbotWidget'    ;
import { TextoExpandClose  }                               from '../texto/TextoExpandClose'    ;
import { arrayTags }                                       from '../texto/ArrayTags'           ;
//
export class TablaTraining extends React.Component {
    constructor(props){
        super(props) ;
        this.onChange               = this.onChange.bind(this) ;
        this.parseColumns           = this.parseColumns.bind(this)   ;
        this.onChangeSearch         = this.onChangeSearch.bind(this) ;
        this.onAcceptNewIntent      = this.onAcceptNewIntent.bind(this) ;
        this.onClickNewIntent       = this.onClickNewIntent.bind(this)  ;
        this.onClickEditIntent      = this.onClickEditIntent.bind(this) ;
        this.onClickDeleteIntent    = this.onClickDeleteIntent.bind(this) ;
        this.saveChangesTotraining = this.saveChangesTotraining.bind(this) ;
        this.state = {
            flagWidgetTest: false,
            modalIntentVisible: false,
            modalNewIntent: false,
            flagCachedProps: false,
            flagSpinner: false,
            intentNewModify: false,
            textBusqueda: '',
            chatbotConfig: this.props.chatbotConfig,
            arrayTraining:  this.props.chatbotConfig.training ? Object.values(this.props.chatbotConfig.training) : [],
            columnas: this.parseColumns()
        } ;
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( state.flagCachedProps==false ){
            let tempArrayTraining = newProps.chatbotConfig.training ? Object.values(newProps.chatbotConfig.training) : [] ;
            tempArrayTraining = tempArrayTraining.map((elemTT,elemIDD)=>{
                return {...elemTT,key: elemIDD}
            }) ;
            return { chatbotConfig: newProps.chatbotConfig, arrayTraining: tempArrayTraining, flagCachedProps: true  } ;
        } else {
            return false ;
        }
    }
    //
    onClickNewIntent(argEE){
        if ( argEE && argEE.preventDefault){ argEE.preventDefault(); }
        this.setState({
            modalIntentVisible: true,
            modalNewIntent: true,
            intentNewModify: {
                intentName:'',intentLanguage:'',intentDescription:'',intentExamples:[],intentDomain:'',intentAnswer:{}, systemDefined:false
            }
        }) ;
    }
    //
    onClickEditIntent(argRowIntent){
        try {
            //
            let tempIntent2Modify = {
                intentNewModify:{
                    intentName: argRowIntent.entity ,
                    intentLanguage: argRowIntent.language||'es' ,
                    intentDescription: argRowIntent.description||'' ,
                    intentExamples: argRowIntent.examples ,
                    intentDomain: argRowIntent.domain ,
                    intentAnswer: argRowIntent.answer ,
                    systemDefined: argRowIntent.systemDefined
                },
                modalIntentVisible: true,
                modalNewIntent: false
            } ;
            this.setState( {...tempIntent2Modify} ) ;
            //
        } catch(errOCI){
            console.dir(errOCI) ;
        }
    }
    //
    onClickDeleteIntent(argRowIntent){
        try {
            //
            this.setState({flagSpinner: true}) ;
            let tempArrayTraining = this.state.arrayTraining.filter((elemEntity)=>{
                return elemEntity.entity!=argRowIntent.entity  ;
            }) ;
            this.setState({arrayTraining: tempArrayTraining,flagSpinner: false}) ;
            this.saveChangesTotraining( argRowIntent, true ) ;
            //
        } catch(errOCI){
            console.dir(errOCI) ;
        }
    }
    //
    parseColumns(){
        let outCols   = [] ;
        //
        let tempLang = navigator.language || navigator.languages[0] || 'es' ;
        moment.locale(tempLang) ;
        //
        try {
            //
            outCols = [
                {title: this.props.translate.table.intent ,
                        dataIndex: 'entity',width:250,key: 'entity',
                        render: (text,argRow) => {
                            return(
                                <div>
                                    <span className="waiboc-tab-id-name" onClick={(argEE)=>{argEE.preventDefault();this.onClickEditIntent(argRow);}} >
                                        <u>{text}</u>
                                    </span>
                                    <br/>
                                    <div className="waiboc-tab-edit-opt"  >
                                        <a style={{fontWeight:'500',fontSize:'18px',color:'#497EC0'}}
                                            onClick={(argEE)=>{argEE.preventDefault();this.onClickEditIntent(argRow);}}
                                        >
                                            <Icon type="edit" style={{color:'green'}}/>
                                            <span style={{marginLeft:'7px'}} >{this.props.translate.edit}</span>
                                        </a>
                                        {
                                            argRow.systemDefined==true
                                                ?   <span style={{fontSize:'12px',color:'red',width:'100%',display:'block'}} >{this.props.translate.form.systemDefinedDelete}</span>
                                                :   <Popconfirm placement="topRight" title={this.props.translate.form.deleteEntityConfirmation}
                                                        onConfirm={()=>{this.onClickDeleteIntent(argRow)}}
                                                        okText={this.props.translate.yes} cancelText="No"
                                                    >
                                                        <a >
                                                            <Icon type="delete" style={{color:'red'}}/>
                                                            <span style={{marginLeft:'7px'}} >{this.props.translate.delete}</span>
                                                        </a>
                                                    </Popconfirm>
                                        }
                                    </div>
                                </div>
                        )},
                        defaultSortOrder: 'descend', sorter: (a, b) => a.entity.localeCompare(b.entity)
                },
                {title: this.props.translate.table.systemDefined     ,width: 120,dataIndex:'systemDefined',key:'systemDefined',
                        render: text => {
                            let tempText = text==true ? this.props.translate.yes : "No" ;
                            return(
                                <span style={{fontWeight:'600'}}>
                                    {tempText}
                                </span>
                            )
                        },
                        sorter: (a, b) => a.systemDefined - b.systemDefined
                } ,
                {title: this.props.translate.table.userSay ,width: 250,
                        dataIndex:'examples', key:'examples',
                        render: (text) => {
                            let tempTT = arrayTags(text) ;
                            return(
                                <TextoExpandClose text={tempTT} rows={3} translate={this.props.translate}  />
                            )}
                },
                {title: this.props.translate.table.usageQuantity ,width: 150,
                    dataIndex:'usageQuantity', key:'usageQuantity',
                    render: (text) => <span style={{fontWeight:'600',fontSize:'18px'}}>{text}</span>,
                    sorter: (a, b) => a.usageQuantity-b.usageQuantity
                },
                {title: this.props.translate.table.language ,width: 150,
                    dataIndex:'language', key:'language',
                    render: (text) => <span style={{fontWeight:'600',fontSize:'18px'}}>{text}</span>,
                    sorter: (a, b) => a.language.localeCompare(b.language)
                },
                {title: this.props.translate.table.searchText ,width: 150,
                    dataIndex:'searchText', key:'searchText',
                    render: (searchText) => {
                        let tempText = arrayTags( Object.keys(searchText)  ) ;
                        return(
                            <TextoExpandClose text={tempText} rows={3} translate={this.props.translate}  />
                        )
                    }
                },
                {title: this.props.translate.table.answer       ,
                        dataIndex:'answer',key:'answer',width: 400,
                        render: (text) =>
                            <div style={{width:'100%',marginTop:'10px'}}>
                                <Popover trigger="hover"
                                        content={ <CustomReply datos={{output: text}} flagTimestamp={false} /> }
                                        style={{width:'100px',height:'100px'}}
                                >
                                    <span className="waiboc-tab-answer-example" >
                                        <span style={{marginRight:'10px'}} >💬</span>
                                        {this.props.translate.form.checkAnswer}
                                    </span>
                                </Popover>
                            </div>
                },
                {title: this.props.translate.table.lastUpdate ,
                        dataIndex:'timestamp_last_update', key:'timestamp_last_update',width: 250,
                        render: (text) => <span style={{fontWeight:'600',fontSize:'18px'}}>{moment(text).fromNow()}</span>,
                        sorter: (a, b) => a.timestamp_last_update.localeCompare(b.timestamp_last_update)
                }
            ] ;
            //
        } catch(errPC){
            console.dir(errPC) ;
        }
        return outCols ;
    }
    //
    onChange(pagination, filters, sorter){
        this.setState({ pagination: pagination });
    }
    //
    onAcceptNewIntent(argNewIntent){
      try {
        //
        let tempNewIntent = {
            answer: argNewIntent.intentAnswer,
            domain: argNewIntent.domain||'default',
            description: argNewIntent.intentDescription||'',
            examples: argNewIntent.intentExamples||argNewIntent.examples||[],
            entity: argNewIntent.intentName,
            language: argNewIntent.intentLanguage ||'',
            timestamp_last_update: moment( new Date() ).tz("America/Argentina/Buenos_Aires").format()
        };
        let tempArrayTraining = this.state.arrayTraining ;
        let indexIntent       = tempArrayTraining.findIndex((elemIntent)=>{ return elemIntent.entity.toUpperCase()==tempNewIntent.entity.toUpperCase() ; }) ;
        if ( indexIntent!=-1 ){
            let prevIntent = {...tempArrayTraining[indexIntent]} ;
            for ( let keyIntent in tempNewIntent ){
                prevIntent[keyIntent] = tempNewIntent[keyIntent] ;
            }
            tempArrayTraining[indexIntent] = {...prevIntent} ;
            tempNewIntent                  = {...prevIntent} ;
        } else {
            tempNewIntent.usageQuantity = 1 ;
            tempNewIntent.creation_ts   = moment( new Date() ).tz("America/Argentina/Buenos_Aires").format() ;
            tempArrayTraining.push( tempNewIntent ) ;
        }
        this.setState({arrayTraining: tempArrayTraining, modalIntentVisible: false, intentNewModify: false}) ;
        this.saveChangesTotraining(tempNewIntent) ;
        //
      } catch(errNI){
        console.dir(errNI) ;
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
    saveChangesTotraining(argEntity, flagDeleteIntent=false ){
        try {
            //
            let chatbotTrain = {
              _id: this.state.chatbotConfig._id,
              train: {}
            } ;
            delete argEntity.key ;
            chatbotTrain.train[ argEntity.entity ] = argEntity ;
            //
            const openNotificationWithIcon = (type,argText) => {
              notification[type]({
                  top: 180,
                  description: <h2>{argText}</h2>
              });
            } ;
            //
            api.chatbot.train( chatbotTrain, flagDeleteIntent )
                .then((respTrain)=>{
                  if ( respTrain==false ){
                    openNotificationWithIcon('error',this.props.translate.form.userNotAuthorized) ;
                  } else {
                    openNotificationWithIcon('success',this.props.translate.form.changesSaved) ;
                  }
                })
                .catch((respErr)=>{
                  console.dir(respErr) ;
                }) ;
            //
        } catch(errSC){
            console.dir(errSC) ;
        }
    }
    //
    render(){
        //
        let arrayDatos = [] ;
        if ( this.state.textBusqueda.length==0 ){
            arrayDatos = this.state.arrayTraining.map((elemTC,elemIdx)=>{
                let tempsystemDefined = (typeof elemTC.systemDefined=="undefined") ? false : elemTC.systemDefined ;
                return {
                    ...elemTC,
                    key: elemIdx,
                    language: elemTC.language||'es',
                    searchText: elemTC.searchText || {},
                    systemDefined: tempsystemDefined,
                    usageQuantity: elemTC.usageQuantity||0,
                    entity: elemTC.entity||""
                } ;
            }) ;
        } else {
            this.state.arrayTraining.forEach((elemTC,elemIdx)=>{
                if ( Object.values(elemTC).join("").toUpperCase().indexOf(this.state.textBusqueda.toUpperCase())!=-1 ){
                    let tempsystemDefined = (typeof elemTC.systemDefined=="undefined") ? false : elemTC.systemDefined ;
                    arrayDatos.push( {
                        ...elemTC,
                        key: elemIdx,
                        language: elemTC.language||'es',
                        searchText: elemTC.searchText || {},
                        systemDefined: tempsystemDefined,
                        usageQuantity: elemTC.usageQuantity||0,
                        entity: elemTC.entity||""
                    } ) ;
                }
            }) ;
        }
        //
        return(
            <div>
                <FormNewIntent  onAccept={this.onAcceptNewIntent}
                                data={this.state.intentNewModify}
                                chatbotConfig={this.props.chatbotConfig}
                                modalVisible={this.state.modalIntentVisible}
                                flagNewIntent={this.state.modalNewIntent}
                                onCancelModal={(argEE)=>{argEE.preventDefault();this.setState({modalIntentVisible:false})}}
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
                                <Button onClick={this.onClickNewIntent}  type="primary" style={{marginTop:'3px'}} >
                                {this.props.translate.form.newIntent}
                                </Button>
                                {
                                    this.state.flagWidgetTest==false ?
                                        <Button onClick={(argEE)=>{argEE.preventDefault(); this.setState({flagWidgetTest: true});}}
                                                type="primary" style={{marginTop:'3px',backgroundColor:'#8B6BEC'}}
                                        >
                                            {this.props.translate.form.testChatbot}
                                        </Button>
                                        : null
                                }
                            </Button.Group>
                        </Col>
                    </Row>
                </div>
                <Table
                    loading={this.state.flagSpinner}
                    columns={this.state.columnas}
                    dataSource={ arrayDatos }
                    rowKey="entity"
                    style={{marginLeft:'10px'}}
                    pagination={{position:'bottom', defaultPageSize: 50, showSizeChanger:true, showQuickJumper: true,locale:this.props.translate.pagination}}
                    onChange={this.onChange.bind(this)}
                    bordered
                    locale={this.props.translate}
                    scroll={{ x: 1500 }}
                />
                {
                    this.state.flagWidgetTest==true ?
                            <TestChatbotWidget
                                chatbotConfig={this.state.chatbotConfig}
                                onWindowClose={()=>{this.setState({flagWidgetTest: false});}}
                            />
                            : null
                }
            </div>
        )
    }
    //
} ;
//