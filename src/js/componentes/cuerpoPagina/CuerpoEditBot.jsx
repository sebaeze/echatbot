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
        this.state = {
            idChatbot: this.props.match.params.idChatbot||false,
            userInfo: false,
            flagSpinner: false,
            flagCachedProps: false,
            chatbotConfig:false,
            chatbotConfigPendingSave: false
        } ;
    }
    //
    componentDidMount(){
        try {
            console.log('....CuerpoEditBot:: componentDidMount:: flagCachedProps: '+this.state.flagCachedProps) ;
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
    /*
    componentDidUpdate(prevProps, prevState) {
        Object.entries(this.props).forEach(([key, val]) =>
          prevProps[key] !== val && console.log(`Prop '${key}' changed:: val: `+val+';')
        );
        if (this.state) {
          Object.entries(this.state).forEach(([key, val]) =>
            prevState[key] !== val && console.log(`State '${key}' changed:: val: `+val+';')
          );
        }
    }
    */
    //
    render(){
        //
        let tempChatbotConfig = this.state.chatbotConfig ;
        //
        return(
            <div id="waiboc-id-edit-chatbot" ref={(argRef)=>{ this.refContainer=argRef; }} style={{paddingTop:'145px',minHeight:'110vh',backgroundColor:'#F4F4F4'}}>
                    <BackTop>
                        <div className="ant-back-top-inner"><Icon type="arrow-up" /></div>
                    </BackTop>
                    <Tabs style={{width:'95%',marginLeft:'2%'}}>
                        <TabPane key="1"
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
                                <Col xs={22} md={22} lg={16} xl={16} xxl={16}>
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
                        <TabPane key="2"
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
                        <TabPane key="3"
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