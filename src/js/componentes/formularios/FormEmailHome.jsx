/*
*
*/
import React                                    from 'react' ;
import { Input, Icon,Button }                   from 'antd'  ;
import { Row, Col }                             from 'antd'  ;
// import ScrollAnim                               from 'rc-scroll-anim' ;
import  schema                                  from 'async-validator' ;
import LinkRouter                               from '../link/LinkRouter' ;
import { PARAMETROS }                           from '../../utils/parametros' ;
//
const descriptor = {
    email: [ {type: "email", required: true, message: "" }
    /*
      {type: "string", required: true, pattern: schema.pattern.email },
      {validator(rule, value, callback, source, options) {
        var errors = [];
        // test if email address already exists in a database
        // and add a validation error to the errors array if it does
        return errors;
      }}
      */
    ]
} ;
const validator = new schema(descriptor);
//
export class FormEmailHome extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            flagSearchEmpty: false,
            email: ''
        } ;
        this.MAX_RESULTS         = process.env.AMBIENTE=="produccion" ? 5 : 2 ;
        this.refButton           = false ;
        this.inputEmail          = false ;
        this.onChangeEmail       = this.onChangeEmail.bind(this)   ;
        this.onClickEmailTry     = this.onClickEmailTry.bind(this) ;
    } ;
    //
    onChangeEmail(argNewEmail){
        if ( argNewEmail.target.value ){
            this.setState({ email: argNewEmail.target.value }) ;
        }
    }
    //
    onClickEmailTry(argEE){
        try {
            console.log('...click:: ee: ',this.state.email,';') ;
            validator.validate({email: this.state.email }, (errors, fields) => {
                if(errors) {
                  console.log(' error: ',errors,' fields: ',fields);
                } else {
                    window.location.href = `/login?email=${this.state.email}&urlRedirect=/account` ;
                }
              });
        } catch(errCET){
            console.log('..ERROR: ',errCET) ;
        }
    }
    //
    render(){
        //
        /*
            <LinkRouter targetApp={PARAMETROS.APP_ID.HOME} wrapperClassname="waiboc-home-email-wrapper" className="waiboc-home-link" url={"/login?urlRedirect=/account"} >
                <Button type="primary" size="large" className="waiboc-home-button-try-free" >
                    {this.props.translate.homeTryUs}
                </Button>
            </LinkRouter>
        */
        // let extraStyle = this.props.bottomBlock==true ? {position:'absolute',bottom:'0px'} : {} ;
        //
        return(
            <div className={"waiboc-home-email-in"} >
                <div>
                    <Input
                        ref={ (argREf)=>{ if (argREf && this.inputEmail==false ){ this.inputEmail = argREf ; } } }
                        onPressEnter={this.onClickEmailTry}
                        prefix={
                            this.state.flagSearchEmpty==false ? null
                                :   <Icon type="close-circle" style={{fontSize:'30px',color:'red',cursor:'pointer'}} />
                        }
                        onChange={this.onChangeEmail}
                        placeholder={this.props.translate.form.placeholderEmailHome}
                        suffix={
                            <Button ref={(argRef)=>{this.refButton=argRef;}} type="primary" size="large"
                                    className="waiboc-home-button-try-free"
                                    onClick={this.onClickEmailTry}
                            >
                                {this.props.translate.homeTryUs}
                            </Button>
                        }
                    />
                </div>
            </div>
        )
    }
    //
} ;
//