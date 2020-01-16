/*
*
*/
import React                                   from 'react' ;
import { Tabs, Icon, Spin, Row, Col, BackTop, notification }   from 'antd'  ;
import { api }                                 from '../../api/api' ;
import { FormEditChatbotInfo }                 from '../formularios/FormEditChatbotInfo' ;
import { TablaTraining       }                 from '../tablas/TablaTraining'            ;
//
const { TabPane } = Tabs ;
//
export class CuerpoEditBot extends React.Component {
    constructor(props){
        super(props) ;
        this.updateChatbotConfig = this.updateChatbotConfig.bind(this) ;
        this.onChangeTab         = this.onChangeTab.bind(this) ;
        this.state = {
            idChatbot: this.props.match.params.idChatbot||false,
            userInfo: false,
            flagSpinner: false,
            flagCachedProps: false,
            chatbotConfig:false,
            chatbotConfigPendingSave: false
        } ;
        this.tabs = { CONFIG: 'config', APPEARANCE: 'appearance', TRAINING: 'training', CONVERSATIONS: 'conversations' } ;
    }
    //
    componentDidMount(){
        try {
            console.log('....this.props.history: ',this.props.history) ;
            //
            if ( this.state.flagCachedProps==false ){
                let tempUserInfo = false ;
                this.setState({flagSpinner: true}) ;
                api.account.getUserInfo()
                    .then((respUserInfo)=>{
                        if ( respUserInfo.length>0 ){respUserInfo=respUserInfo[0]; }
                        tempUserInfo = respUserInfo ;
                        return api.chatbot.qry({_id: this.state.idChatbot, idUser: tempUserInfo.email}) ;
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
    /*
    static getDerivedStateFromProps(newProps, state) {
        console.log('.....not-cached:: getDerivedStateFromProps:: state: ',state) ;
        if ( state.flagCachedProps==false ){
            return { flagCachedProps: true } ;
        } else {
            return false ;
        }
    }
    */
    //
    updateChatbotConfig(argChatbotConfigUpdate){
        try {
            this.setState({flagSpinner: true}) ;
            let tempUpdateBot = Object.assign({...this.state.chatbotConfig},argChatbotConfigUpdate) ;
            //
            const openNotificationWithIcon = (type,argText) => {
                notification[type]({
                    //message: <h1>putooo</h1>,
                    description: <h2>{argText}</h2>
                });
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
            <div id="waiboc-id-edit-chatbot" ref={(argRef)=>{ this.refContainer=argRef; }} style={{paddingTop:'145px',minHeight:'110vh',backgroundColor:'#F4F4F4'}}>
                    <BackTop>
                        <div className="ant-back-top-inner"><Icon type="arrow-up" /></div>
                    </BackTop>
                    <Tabs style={{width:'95%',marginLeft:'2%'}}
                          onChange={this.onChangeTab}
                          activeKey={  activeTab() }
                    >
                        <TabPane key={this.tabs.CONFIG}
                            tab={<span>
                                <Icon type="edit" theme="twoTone" />
                                {this.props.translate.menuAdmin.botsConfiguration}
                            </span>}
                        >
                            <Row>
                                <Col xs={24}  md={24}  lg={4}  xl={4}  xxl={4}>
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
                                <Col xs={22} md={22} lg={20} xl={20} xxl={20}>
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
                                <Icon type="message" theme="twoTone" />
                                {this.props.translate.form.appearance}
                            </span>}
                        >
                            tab 3
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
                            tab 3
                        </TabPane>
                    </Tabs>
            </div>
        )
    }
    //
} ;
//