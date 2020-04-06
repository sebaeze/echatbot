/*
*
*/
import React                                    from 'react' ;
import ReactDOM                                 from 'react-dom' ;
import { withRouter }                           from "react-router-dom" ;
import ScrollAnim                               from 'rc-scroll-anim' ;
import { PARAMETROS }                           from '../../utils/parametros' ;
//
const { Link }             = ScrollAnim ;
//
class LinkRouter  extends React.Component {
    //
    constructor(props){
        super(props) ;
        this.state       = {
            url: this.props.url ,
            hasHash: false,
            hash: ""
        } ;
        this.refLinkHash = false ;
        this.refLink     = this.refLink.bind(this) ;
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
        if ( argRef && this.refLinkHash==false ){
            this.refLinkHash = ReactDOM.findDOMNode( argRef ) ;
        }
    }
    //
    onClickLink(argEE){
        try {
            if ( process.env.APP_ID==PARAMETROS.APP_ID.HOME ){
                if ( this.state.url==window.location.pathname && this.state.hasHash==true ){
                    this.refLinkHash.click() ;
                } else {
                    this.props.history.push( this.state.url ) ;
                }
            } else {
                window.location.href = this.state.url ;
            }
        } catch(errOCL){
            console.log('ERROR: ',errOCL) ;
        }
    } ;
    //
    render(){
        return(
            <div rel="noopener noreferrer"  >
                <Link style={{display:'none'}} ease={"easeOutCirc"} offsetTop={80} toHash={false} to={ this.state.hash }
                      ref={this.refLink}
                >
                    {this.props.children}
                </Link>
                <a onClick={this.onClickLink} rel="noopener noreferrer" >
                    {this.props.children}
                </a>
            </div>
        )
    }
    //
} ;
//
export default withRouter( LinkRouter ) ;
//