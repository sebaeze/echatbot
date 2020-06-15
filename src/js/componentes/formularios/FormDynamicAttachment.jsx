/*
*
*/
import React                                            from 'react' ;
import { Form, Input, Icon, Button, Row, Col, Upload }  from 'antd'  ;
import axios                                            from 'axios' ;
//
const UploadButton = (props) =>{
    return(
        <Row className="waiboc-uploader-avatar" >
            <Icon type={props.flagUploading==true ? 'loading' : 'cloud-upload'} />
            <div className="ant-upload-text">{props.translate.form.newFileClickDrag}</div>
        </Row>
    ) ;
  };
//
export class FormDynamicAttachment extends React.Component {
    constructor(props){
        super(props) ;
        this.state        = {
            flagUploading: false,
            flagFocusInput: false,
            labels: [],
            values: [],
            arrayOptions: [],
            keys: [],
            files: [],
            descriptions: [],
            urlLink: [],
            focus: this.props.focus ? this.props.focus : false
        } ;
        this.nodeFocus    = false ;
        this.refInput     = false ;
        this.add          = this.add.bind(this) ;
        this.remove       = this.remove.bind(this) ;
        this.normFile             = this.normFile.bind(this) ;
        this.beforeUpload         = this.beforeUpload.bind(this) ;
        this.handleChange         = this.handleChange.bind(this) ;
        this.onChangeUrl          = this.onChangeUrl.bind(this)  ;
        this.draggerCustomRequest = this.draggerCustomRequest.bind(this) ;
        this.onChangeDescription  = this.onChangeDescription.bind(this)  ;
    }
    //
    componentDidMount(){
        //
        let tempFiles = this.props.form.getFieldValue( this.props.fieldName ) || [] ;
        let newState = { keys: [], files: [], descriptions: [], urlLink: [] } ;
        for ( let fileInd=0; fileInd<tempFiles.length; fileInd++ ){
            newState.keys.push( fileInd ) ;
            newState.files.push({
                ...tempFiles[fileInd],
                key: fileInd,
                uid: fileInd
            }) ;
            newState.descriptions.push( tempFiles[fileInd].description||"" ) ;
            newState.urlLink.push( tempFiles[fileInd].urlLink||"" ) ;
        } ;
        //
        this.setState( newState ) ;
        //
    }
    //
    beforeUpload(argFile,fileList){
        const isSizeOk = argFile.size<2048001 ;
        if ( !isSizeOk ) {
        message.error( this.props.translate.form.fileSize1MBError );
        message.status = "error" ;
        argFile.status   = 'error' ;
        argFile.response = this.props.translate.form.fileSize1MBError  ;
        }
        return isSizeOk ;
    } ;
    //
    normFile(e){
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    //
    handleChange(info){
        //
        console.log('....handleChange:: info: ',info) ;
        //
        if (info.file.status === 'uploading') {
          //this.setState({ loading: true });
          return;
        }
        /*
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
        */
    };
    //
    draggerCustomRequest(argKey,argCR){
        try {
            //
            this.setState({flagUploading: true}) ;
            let fr = new FileReader() ;
            fr.readAsDataURL( argCR.file );
            fr.onerror = (errFR) => { console.log('...ERROR: FR: ',errFR) ; throw errFR; } ;
            fr.onload  = () => {
                let reqOptions = {
                    url: "/api/files",
                    method: 'POST',
                    withCredentials: true,
                    data: {
                        // idChatbot: this.props.chatbotConfig._id,
                        idChatbot: this.props.idChatbot,
                        name: argCR.file.name ,
                        description: this.state.descriptions[argKey],
                        urlLink: this.state.urlLink[argKey],
                        size: argCR.file.size ,
                        type: argCR.file.type ,
                        lastModified: argCR.file.lastModified ,
                        data: fr.result
                    }
                } ;
                axios( reqOptions )
                    .then((respAXios)=>{
                        let tempFiles = this.props.form.getFieldValue( this.props.fieldName ) || [] ;
                        let indFile   = tempFiles.findIndex((elemFF)=>{ return elemFF.name==respAXios.data.name ; }) ;
                        respAXios.data.uid = respAXios.data._id ;
                        respAXios.data.key = respAXios.data._id ;
                        respAXios.data     = {
                            ...respAXios.data,
                            description: this.state.descriptions[argKey],
                            urlLink: this.state.urlLink[argKey]
                        } ;
                        if ( indFile!=-1 ){
                            tempFiles[ indFile ]   = respAXios.data ;
                        } else {
                            tempFiles.push( respAXios.data  ) ;
                        }
                        //
                        let obj2Update = {} ;
                        obj2Update[ this.props.fieldName ] = tempFiles ;
                        this.props.form.setFieldsValue( obj2Update );
                        let newState = {
                            flagUploading: false,
                            files: tempFiles
                        } ;
                        this.setState( newState ) ;
                        //
                    })
                    .catch((errText)=>{
                        console.log('...ERROR: errText:: ',errText) ;
                        this.setState({flagUploading: false}) ;
                    })
            } ;
        } catch(errDCR){
            console.log('...ERROR: Dragger:: CustomRequest:: errDCR: ',errDCR) ;
        }
    }
    //
    remove(k){
        //
        if (this.state.keys.length === 0) { return; }
        let tempKeys = this.state.keys.filter(key => key !== k) ;
        //
        let tempFiles = this.props.form.getFieldValue( this.props.fieldName ) || [] ;
        console.log('....voy a borrar:: K: ',k,' files:: ',tempFiles) ;
        if ( tempFiles.length>0 ){
            let obj2Update = {} ;
            obj2Update[ this.props.fieldName ] = tempFiles.filter((elem,index)=>{ return index!=k ; }) ;
            console.log('....obj2Update: ',obj2Update,';') ;
            this.props.form.setFieldsValue( obj2Update );
        }
        //
        this.setState({keys: tempKeys})  ;
        //
    };
    //
    add(){
    //
    // let tempId   = this.state.ids++ ;
    //let tempKeys = this.state.keys.concat( tempId );
    let tempKeys = this.state.keys.concat( this.state.keys.length );
    this.setState({keys: tempKeys, flagFocusInput: true })  ;
    // this.forceUpdate() ;
    //  this.setState({keys: tempKeys }) ;
    } ;
    onChangeUrl(argKey,argTarget){
        try {
            //
            let arrUrlLink     = this.state.urlLink ;
            arrUrlLink[argKey] = argTarget.value||"" ;
            this.setState({ urlLink: arrUrlLink  }) ;
            //
        } catch(errOCD){
            console.log('...ERROR: ',errOCD) ;
        }
    }
    //
    onChangeDescription(argKey,argTarget){
        try {
            //
            let descr = this.state.descriptions ;
            descr[argKey] = argTarget.value||"" ;
            this.setState({ descriptions: descr  }) ;
            //
        } catch(errOCD){
            console.log('...ERROR: ',errOCD) ;
        }
    }
    //
    render(){
        //
        const { getFieldDecorator } = this.props.form;
        /*
        let tempFiles = this.props.form.getFieldValue( this.props.fieldName ) || [] ;
        console.log('....tempFiles: ',tempFiles) ;
        */
        //
        const formItems      = this.state.keys.map((k, index) => {
            let relativePath      = (this.state.files[k] && this.state.files[k].relativePath) ? this.state.files[k].relativePath : false ;
            return(
                <div key={k}>
                    <Row key={k}>
                        <Col xs={24} md={24} lg={20} xl={20} xxl={20} key={"this.props.fieldName_"+k+"_description"}>
                            <Form.Item
                                required={true}
                                key={"this.props.fieldName_"+k+"_description"}
                                hasFeedback
                                style={{padding:'5px 5px 5px 5px '}}
                            >
                                <Input  placeholder={this.props.translate.form.placeholderImagenDescription} size="large"
                                        ref={(argRef)=>{ if ( argRef && this.refInput==false && this.state.flagFocusInput==true ){ this.refInput=argRef; argRef.focus();} }}
                                        defaultValue={this.state.descriptions[k] ? this.state.descriptions[k] : ""}
                                        onChange={(argEE)=>{this.onChangeDescription(k,argEE.target);}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={20} xl={20} xxl={20} key={"this.props.fieldName_"+k+"_url"}>
                            <Form.Item
                                required={true}
                                key={"this.props.fieldName_"+k+"_url"}
                                hasFeedback
                                style={{padding:'5px 5px 5px 5px '}}
                            >
                                <Input  placeholder={this.props.translate.form.placeholderImagenUr} size="large"
                                        defaultValue={this.state.urlLink[k] ? this.state.urlLink[k] : ""}
                                        onChange={(argEE)=>{this.onChangeUrl(k,argEE.target);}}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={22} md={22} lg={20} xl={20} xxl={20} key={"this.props.fieldName_"+k+"_value"} >
                            <Form.Item
                                required={true}
                                key={"this.props.fieldName_"+k+"_value"}
                                hasFeedback
                                style={{padding:'5px 5px 5px 5px '}}
                                labelCol={{  xs: 24, md: 24, lg: 24, xl: 24, xxl: 24 }}
                                wrapperCol={{xs: 24, md: 24, lg: 22, xl: 22, xxl: 22 }}
                            >
                                <Upload
                                    name="files"
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                    method="post"
                                    action="/api/files"
                                    showUploadList={false}
                                    customRequest={(argCustReq)=>{ this.draggerCustomRequest(k,argCustReq) ; }}
                                >
                                    <Row>
                                    {
                                        relativePath    ? <img src={relativePath} alt="avatar" style={{ width: '90px',height:'auto' }} />
                                                        : <UploadButton flagUploading={this.state.flagUploading}  translate={this.props.translate} />
                                    }
                                    </Row>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col xs={2} md={2} lg={1} xl={1} xxl={1} >
                            <span className="waiboc-icon-del" key={k} onClick={()=>{this.remove(k);}} >
                                <Icon style={{marginLeft:'10px'}} key={k}  className="dynamic-delete-button" type="minus-circle-o"  />
                            </span>
                        </Col>
                    </Row>
                </div>
            )
        });
        //
        return (
            <div>
                {formItems}
                <Form.Item wrapperCol={{xs: 0, md: 0, lg: 0, xl: 0, xxl: 0}} labelCol={{xs: 0, md: 0, lg: 0, xl: 0, xxl: 0}} >
                    {
                        getFieldDecorator( this.props.fieldName ,
                                            { type: "array", required: false, suppressWarning: true, rules: [ {suppressWarning: true, type: "array"  } ] })
                                        ( <Input  /> )
                    }
                </Form.Item>
                <Form.Item wrapperCol={{xs: 24, md: 24, lg: 13, xl: 13, xxl: 13}} >
                    <Button onClick={this.add} size="large" style={ this.props.styleButton ? this.props.styleButton : { width: '80%' }} >
                        <Icon type="plus-circle" /> <span style={{fontWeight:'600'}}>{this.props.textAdd} </span>
                    </Button>
                </Form.Item>
            </div>
        );
        //
    }
    //
} ;
//