/*
*
*/
import React                                    from 'react' ;
import ReactDOM                                 from 'react-dom' ;
import { withRouter }                           from "react-router-dom" ;
import ScrollAnim                               from 'rc-scroll-anim' ;
import { HashLink }                             from 'react-router-hash-link';
import { PARAMETROS }                           from '../../utils/parametros' ;
import { sendError2Backend }                    from '../../api/api'      ;
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
            if ( this.props.url && this.props.url.indexOf("#")!=-1 ){
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
    //
    onClickLink(argEE){
        try {
            if ( argEE && argEE.preventDefault ){ argEE.preventDefault(); }
            if ( process.env.APP_ID==this.state.targetApp ){
                if ( this.state.url==window.location.pathname && this.state.hasHash==true ){
                    this.refAnimatedLink.click() ;
                } else {
                    let tempUrl = this.state.url + ( this.state.hasHash==true ? "#"+this.state.hash : "" ) ;
                    this.refLinkwithHash.click() ;
                    if ( this.state.fullUrl.indexOf("#")==-1 ){
                        setTimeout(() => {
                            window.scrollTo({top: 0, behavior: 'smooth'});
                        }, 300 );
                    }
                }
            } else {
                window.location.href = this.state.fullUrl ;
            }
        } catch(errOCL){
            console.log('ERROR: ',errOCL) ;
        }
    } ;
    //
    render(){
        try {
            const { wrapperClassname } = this.props ;
            return(
                <div rel="noopener noreferrer" className={wrapperClassname} >
                    {
                        this.state.hasHash
                            ?   <Link style={{display:'none'}} ease={"easeOutCirc"} offsetTop={80} toHash={false} to={ this.state.hash }
                                        ref={this.refLink}
                                >
                                    {this.props.children}
                                </Link>
                            :   null
                    }
                    <a onClick={this.onClickLink} href={this.state.fullUrl} className={this.props.className ? this.props.className : ""} >
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
        } catch(errNMRender){
            sendError2Backend({url: window.location.pathname,comp: ' Linkrouter::Render',...errNMRender, ...this.props})
                .then((resuEnd)=>{ throw errNMRender ; })
                .catch((errRes)=>{ throw errNMRender ; }) ;
        }
    }
    //
} ;
//
export default withRouter( LinkRouter ) ;
//