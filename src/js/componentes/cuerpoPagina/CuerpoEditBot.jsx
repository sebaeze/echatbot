/*
*
*/
import React                                   from 'react' ;
import { Tabs, Icon, Spin, Row, Col }          from 'antd'  ;
import { notification, Button }                from 'antd'  ;
import { api }                                 from '../../api/api' ;
import { FormEditChatbotInfo   }               from '../formularios/FormEditChatbotInfo'       ;
import { FormChatbotAccessList }               from '../formularios/FormChatbotAccessList'     ;
import { FormEditChatbotAppearance }           from '../formularios/FormEditChatbotAppearance' ;
import { TablaSlots }                          from '../tablas/TablaSlots'                     ;
import { TablaTraining       }                 from '../tablas/TablaTraining'                  ;
import { TablaConversations  }                 from '../tablas/TablaConversations'             ;
import { IconLock }                            from '../icon/IconLock' ;
//
const { TabPane } = Tabs ;
const log         = require('debug')('WAIBOC:CuerpoEditBot') ;
//
export class CuerpoEditBot extends React.Component {
    constructor(props){
        super(props) ;
        this.updateChatbotConfig = this.updateChatbotConfig.bind(this) ;
        this.onChangeTab         = this.onChangeTab.bind(this) ;
        let tempFlagUrlEdit      = ( this.props.match && this.props.match.params && this.props.match.params.idChatbot ) ;
        this.state = {
            flagUrlEdit: tempFlagUrlEdit ,
            idChatbot: tempFlagUrlEdit==true ? this.props.match.params.idChatbot : false,
            userInfo: false,
            flagSpinner: false,
            flagCachedProps: false,
            chatbotConfig:false,
            chatbotConfigPendingSave: false,
            arraySlots: []
        } ;
        this.tabs = { CONFIG: 'config', APPEARANCE: 'appearance', TRAINING: 'training', SLOTS: 'slots', CONVERSATIONS: 'conversations', SECURITY: 'SECURITY' } ;
        this.onUpdateSlots = this.onUpdateSlots.bind(this) ;
    }
    //
    componentDidMount(){
        try {
            if ( this.state.flagCachedProps==false ){
                let tempUserInfo = false ;
                this.setState({flagSpinner: true}) ;
                api.account.getUserInfo()
                    .then((respUserInfo)=>{
                        if ( respUserInfo.length>0 ){respUserInfo=respUserInfo[0]; }
                        tempUserInfo = respUserInfo ;
                        return api.chatbot.qry({_id: this.state.idChatbot, slots: false ,idUser: tempUserInfo.email}) ;
                    })
                    .then((respQry)=>{
                        if ( respQry.length>0 ){ respQry=respQry[0]; }
                        this.setState({ chatbotConfig: respQry, userInfo: tempUserInfo,flagCachedProps:true,flagSpinner: false}) ;
                    })
                    .catch((respErr)=>{
                        console.dir(respErr) ;
                        this.setState({flagCachedProps:true,flagSpinner: false}) ;
                    }) ;
            }
            //
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    static getDerivedStateFromProps(newProps, state) {
        if ( newProps.idChatbot!=state.idChatbot ){
            let newState = {
                idChatbot: newProps.idChatbot
            } ;
            return newState ;
        } else {
            return false ;
        }
    }
    //
    updateChatbotConfig(argChatbotConfigUpdate){
        try {
            this.setState({flagSpinner: true}) ;
            let tempUpdateBot = Object.assign({...this.state.chatbotConfig},argChatbotConfigUpdate) ;
            //
            const openNotificationWithIcon = (type,argText) => {
                notification[type]({
                    description: <h2>{argText}</h2>
                }) ;
            } ;
            //
            api.chatbot.add( tempUpdateBot )
                .then((respADD)=>{
                    if ( respADD.length>0 ){ respADD=respADD[0]; }
                    openNotificationWithIcon('success', this.props.translate.form.changesSaved ) ;
                    this.setState({chatbotConfig: tempUpdateBot, flagSpinner: false}) ;
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
    onUpdateSlots(argArrSlots){
        this.setState({ arraySlots: argArrSlots }) ;
    }
    //
    onChangeTab(argNextTab){
        try {
            if ( String(window.location.hash).toUpperCase().indexOf(argNextTab.toUpperCase())==-1 ){
                window.location.hash = '#'+argNextTab ;
            }
        } catch(errOCT){
            console.log('...ERROR: onChange tab:: ',errOCT) ;
        }
    }
    //
    render(){
        //
        let tempChatbotConfig = this.state.chatbotConfig ;
        const activeTab = () => {
            let outTab = this.tabs.CONFIG ;
            let urlHash = (window.location.hash && String(window.location.hash).length>0 ) ? String(window.location.hash).substr(1) : false ;
            if ( urlHash && this.tabs[ urlHash.toUpperCase() ] ){
                outTab = this.tabs[ urlHash.toUpperCase() ]  ;
            }
            return outTab ;
        }
        //
        return(
            <div id="waiboc-id-edit-chatbot"
                 ref={(argRef)=>{ this.refContainer=argRef; }}
                 style={{paddingTop:(this.props.onFinishEdit==false ? '145px' : '0px'),minHeight:'110vh'}}
            >
                    <Tabs style={{width:'95%',marginLeft:'2%',paddingTop:'20px'}}
                          onChange={this.onChangeTab}
                          type="card"
                          // size="large"
                          tabBarGutter={0}
                          activeKey={  activeTab() }
                    >
                        <TabPane key={this.tabs.CONFIG}
                            tab={<span>
                                <Icon type="tool" theme="twoTone" />
                                {this.props.translate.menuAdmin.botsConfiguration}
                            </span>}
                        >
                            <Row>
                                <Col xs={24}  md={24}  lg={2}  xl={2}  xxl={2}>
                                    {
                                        this.state.flagSpinner==true ?
                                            <Spin size="large" />
                                            :
                                            null
                                    }
                                </Col>
                                <Col xs={24}  md={24}  lg={0}  xl={0}  xxl={0}>
                                    <div style={{marginTop:'15px'}}></div>
                                </Col>
                                <Col xs={1}  md={1}  lg={0}  xl={0}  xxl={0}></Col>
                                <Col xs={22} md={22} lg={24} xl={24} xxl={24}>
                                    {
                                        this.state.chatbotConfig==false ?
                                        <Spin size="large" />
                                        :
                                        <FormEditChatbotInfo
                                            translate={this.props.translate}
                                            chatbotConfig={{...tempChatbotConfig}}
                                            onSubmitChanges={this.updateChatbotConfig.bind(this)}
                                            container={this.refContainer}
                                        />
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane key={this.tabs.APPEARANCE}
                            tab={<span>
                                <Icon type="edit" theme="twoTone" />
                                {this.props.translate.form.appearance}
                            </span>}
                        >
                            <Row>
                                <Col xs={24}  md={24}  lg={0}  xl={0}  xxl={0}>
                                    {
                                        this.state.flagSpinner==true ?
                                            <Spin size="large" />
                                            :
                                            null
                                    }
                                </Col>
                                <Col xs={24}  md={24}  lg={0}  xl={0}  xxl={0}>
                                    <div style={{marginTop:'15px'}}></div>
                                </Col>
                                <Col xs={1}  md={1}  lg={0}  xl={0}  xxl={0}></Col>
                                <Col xs={22} md={22} lg={24} xl={24} xxl={24}>
                                    {
                                        this.state.chatbotConfig==false ?
                                        <Spin size="large" />
                                        :
                                        <FormEditChatbotAppearance
                                            translate={this.props.translate}
                                            chatbotConfig={{...tempChatbotConfig}}
                                            onSubmitChanges={this.updateChatbotConfig.bind(this)}
                                            container={this.refContainer}
                                        />
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane key={this.tabs.SLOTS}
                            tab={<span>
                                <Icon type="message" theme="twoTone" />
                                {this.props.translate.table.slotFilling}
                            </span>}
                        >
                            <Row>
                                <Col xs={1}  md={1}  lg={1}  xl={1}  xxl={1}></Col>
                                <Col xs={22} md={22} lg={24} xl={24} xxl={24}>
                                    {
                                        this.state.chatbotConfig==false ?
                                        <Spin size="large" />
                                        :
                                        <TablaSlots
                                            translate={this.props.translate}
                                            idChatbot={tempChatbotConfig._id}
                                            chatbotConfig={tempChatbotConfig}
                                            flagSelection={false}
                                            onUpdateSlots={this.onUpdateSlots}
                                        />
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane key={this.tabs.TRAINING}
                            tab={<span>
                                <Icon type="message" theme="twoTone" />
                                {this.props.translate.form.training}
                            </span>}
                        >
                            <Row>
                                <Col xs={1}  md={1}  lg={1}  xl={1}  xxl={1}></Col>
                                <Col xs={22} md={22} lg={24} xl={24} xxl={24}>
                                    {
                                        this.state.chatbotConfig==false ?
                                        <Spin size="large" />
                                        :
                                        <TablaTraining
                                            translate={this.props.translate}
                                            chatbotConfig={{...tempChatbotConfig}}
                                            onSubmitChanges={this.updateChatbotConfig.bind(this)}
                                            container={this.refContainer}
                                            arraySlots={this.state.arraySlots}
                                            onUpdateSlots={this.onUpdateSlots}
                                        />
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane key={this.tabs.CONVERSATIONS}
                            tab={<span>
                                <Icon type="message" theme="twoTone" />
                                {this.props.translate.form.conversations}
                            </span>}
                        >
                            <TablaConversations idChatbot={tempChatbotConfig._id} />
                        </TabPane>
                        <TabPane key={this.tabs.SECURITY}
                            tab={<span>
                                <IconLock className="waiboc-sys-icon" />
                                {this.props.translate.form.accessList}
                            </span>}
                        >
                            {
                                this.state.chatbotConfig==false ?
                                <Spin size="large" />
                                :
                                <FormChatbotAccessList
                                    translate={this.props.translate}
                                    chatbotConfig={{...tempChatbotConfig}}
                                    onSubmitChanges={this.updateChatbotConfig.bind(this)}
                                    container={this.refContainer}
                                />
                            }
                        </TabPane>
                    </Tabs>
            </div>
        )
    }
    //
} ;
//