/*
*
*/
import React                                   from 'react' ;
import { Tabs, Icon, Spin, Row, Col, Button }   from 'antd'  ;
import { api }                                 from '../../api/api' ;
import { FormEditChatbotInfo }                 from '../formularios/FormEditChatbotInfo' ;
//
const { TabPane } = Tabs ;
//
export class CuerpoEditBot extends React.Component {
    constructor(props){
        super(props) ;
        this.handleKeyboard      = this.handleKeyboard.bind(this)   ;
        this.updateChatbotConfig = this.updateChatbotConfig.bind(this) ;
        this.state = {
            idChatbot: this.props.match.params.idChatbot||false,
            userInfo: false,
            flagSaved: false,
            flagSpinner: false,
            chatbotConfig:false
        } ;
    }
    //
    componentDidMount(){
        try {
            let tempUserInfo = false ;
            this.setState({flagSpinner: true}) ;
            api.account.getUserInfo()
                .then((respUserInfo)=>{
                    if ( respUserInfo.length>0 ){respUserInfo=respUserInfo[0]; }
                    tempUserInfo = respUserInfo ;
                    return api.chatbot.qry({_id: this.state.idChatbot, idUser: tempUserInfo.email}) ;
                })
                .then((respQry)=>{
                    //
                    if ( respQry.length>0 ){ respQry=respQry[0]; }
                    this.setState({ chatbotConfig: respQry, userInfo: tempUserInfo, flagSpinner: false}) ;
                })
                .catch((respErr)=>{
                    console.dir(respErr) ;
                    this.setState({flagSpinner: false}) ;
                }) ;
            //
        } catch(errDM){
            console.dir(errDM) ;
        }
    }
    //
    handleKeyboard(event){
        try {
            //
            let charCode = String.fromCharCode(event.which).toLowerCase();
            if(event.ctrlKey && charCode === 's') {
                event.preventDefault();
                //this.formSubmit() ;
                this.updateChatbotConfig() ;
            }
            // For MAC we can use metaKey to detect cmd key
            if(event.metaKey && charCode === 's') {
                event.preventDefault();
                //this.formSubmit() ;
                this.updateChatbotConfig() ;
            }
        } catch(errHK){
            console.dir(errHK) ;
            throw errHK ;
        }
    } ;
    //
    updateChatbotConfig(){
        try {
            this.setState({flagSpinner: true}) ;
            console.log('....updateChatbotConfig:: config: ') ;
                    console.dir(this.state.chatbotConfig) ;
            api.chatbot.add( this.state.chatbotConfig )
                .then((respADD)=>{
                    if ( respADD.length>0 ){ respADD=respADD[0]; }
                    console.log('....termine de modificar el chatbot:: ') ;
                    console.dir(respADD) ;
                    /*
                    let tempArrayBots = this.state.arrayChatbots ;
                    tempArrayBots.push({
                        key:(tempArrayBots.length+1),
                        ...respADD
                    }) ;
                    this.setState({arrayChatbots: tempArrayBots, flagSpinner: false}) ;
                    */
                    this.setState({flagSpinner: false, flagSaved: true}) ;
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
    static getDerivedStateFromProps(newProps, state) {
        console.log('......Cuerpocuenta:: getDerivedStateFromProps: ') ;
        console.dir(state) ;
        return false ; // { listaBots: newProps.listaBots } ;
    }
    */
    //
    render(){
        //
        return(
            <div id="waiboc-id-edit-chatbot" style={{paddingTop:'145px',minHeight:'110vh',backgroundColor:'#F4F4F4'}}>
                    <Tabs>
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
                                            <Button type="primary" size={"large"} style={{marginLeft:'10%', width:'80%'}} className="btn-edit-menu"
                                                onClick={ (argEEV)=>{argEEV.preventDefault(); this.updateChatbotConfig(); } }
                                            >
                                                {this.props.translate.form.savechanges}
                                            </Button>
                                    }
                                    <span style={this.state.flagSaved==true ? {display:'block'} : {display:'none'}}>
                                        {this.props.translate.form.changesSaved}
                                    </span>
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
                                            chatbotConfig={this.state.chatbotConfig}
                                            formChange={
                                                (argNewValues)=>{
                                                    let tempNewValuesChatbot = Object.assign(this.state.chatbotConfig,argNewValues) ;
                                                    this.setState({chatbotConfig: tempNewValuesChatbot, flagSaved: false }) ;
                                                }
                                            }
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
                            tab 2
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