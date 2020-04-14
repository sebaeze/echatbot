/*
*
*/
import React                                    from 'react' ;
import ReactDOM                                 from 'react-dom' ;
import { withRouter }                           from "react-router-dom" ;
import ScrollAnim                               from 'rc-scroll-anim' ;
import { HashLink }                             from 'react-router-hash-link';
import { PARAMETROS }                           from '../../utils/parametros' ;
//
const { Link }     = ScrollAnim ;
//
class LinkRouter  extends React.Component {
    //
    constructor(props){
        super(props) ;
        this.state       = {
            fullUrl: this.props.url,
            url: this.props.url ,
            hasHash: false,
            hash: "",
            targetApp: this.props.targetApp ? this.props.targetApp : PARAMETROS.APP_ID.HOME
        } ;
        this.refLinkwithHash = false ;
        this.refAnimatedLink = false ;
        this.refLink     = this.refLink.bind(this) ;
        this.refHashLink = this.refHashLink.bind(this) ;
        this.onClickLink = this.onClickLink.bind(this) ;
    } ;
    //
    componentDidMount(){
        try {
            if ( this.props.url.indexOf("#")!=-1 ){
                let tempUrlSP  = this.props.url.split("#") ;
                let tempHash   = tempUrlSP[1] ;
                let tempUrl    = tempUrlSP[0] ;
                this.setState({
                    url: tempUrl,
                    hash: tempHash,
                    hasHash: true
                }) ;
            }
        } catch(errDm){
            console.log('....ERROR: ',errDm) ;
        }
    }
    //
    refLink(argRef){
        if ( argRef && this.refAnimatedLink==false ){
            this.refAnimatedLink = ReactDOM.findDOMNode( argRef ) ;
        }
    }
    //
    refHashLink(argRef){
        if ( argRef && this.refLinkwithHash==false ){
            this.refLinkwithHash = ReactDOM.findDOMNode( argRef ) ;
        }
    }
    // <LinkWithHash {...this.state} ref={this.refHashLink} >{this.props.children}</LinkWithHash>
    onClickLink(argEE){
        try {
            console.log('...process.env.APP_ID: ',process.env.APP_ID,' target: ',this.state.targetApp,' url: ',this.state.fullUrl) ;
            // if ( process.env.APP_ID==PARAMETROS.APP_ID.HOME ){
            if ( process.env.APP_ID==this.state.targetApp ){
                //console.log('....hashash: ',this.state.hasHash,' hash: ',this.state.hash,' url: ',this.state.url,' pathna: ',window.location.pathname) ;
                if ( this.state.url==window.location.pathname && this.state.hasHash==true ){
                    this.refAnimatedLink.click() ;
                } else {
                    let tempUrl = this.state.url + ( this.state.hasHash==true ? "#"+this.state.hash : "" ) ;
                    //console.log('...this.props.history: ',this.props.history,' push: ',this.props.history.push) ;
                    //this.props.history.push( tempUrl ) ;
                    this.refLinkwithHash.click() ;
                    if ( this.state.fullUrl.indexOf("#")==-1 ){
                        setTimeout(() => {
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }, 300 );
                    }
                }
            } else {
                //let tempUrl = this.state.url + ( this.state.hasHash==true ? "/#"+this.state.hash : "" ) ;
                console.log('.....(B) url: ',this.state.fullUrl) ;
                window.location.href = this.state.fullUrl ;
            }
        } catch(errOCL){
            console.log('ERROR: ',errOCL) ;
        }
    } ;
    //
    render(){
        return(
            <div rel="noopener noreferrer"  >
                {
                    this.state.hasHash
                        ?   <Link style={{display:'none'}} ease={"easeOutCirc"} offsetTop={80} toHash={false} to={ this.state.hash }
                                    ref={this.refLink}
                            >
                                {this.props.children}
                            </Link>
                        :   null
                }
                <a onClick={this.onClickLink} rel="noopener noreferrer" className={this.props.className ? this.props.className : ""} >
                    {this.props.children}
                </a>
                <HashLink   to={this.state.fullUrl} style={{display:'none'}}
                            scroll={ (el) => { el.scrollIntoView({ behavior: 'smooth', block: 'start' }) ; }}
                >
                    <div ref={this.refHashLink}>
                        {this.props.children}
                    </div>
                </HashLink>
            </div>
        )
    }
    //
} ;
//
export default withRouter( LinkRouter ) ;
//