/*
*
*/
import React                                    from 'react' ;
import { Carousel }                             from 'antd'  ;
import { styleArrowCarousel }                   from '../style/styleCarousel' ;
//
import '../../../css/iconArrows.css' ;
//
const CarouselArrowPrev = ( props ) => {
    return(
        //<div className="custom-arrow prev" onClick={props.onClick}  style={props.visible==true ? {} : {display:'none'} } >
        <div    className="custom-arrow prev" onClick={props.onClick}
                style={props.visible==true ? {visibility: 'visible', opacity:'1'} : {visibility: 'hidden', opacity:'0'} }
        >
            <img src="/img/ARROW-PREV-BLUE.png" style={styleArrowCarousel} />
        </div>
    )
} ;
//
const CarouselArrowNext = ( props ) => {
    return(
        // <div className="custom-arrow next" onClick={props.onClick} style={props.visible==true ? {} : {display:'none'} } >
        <div    className="custom-arrow next" onClick={props.onClick}
                style={props.visible==true ? {visibility: 'visible', opacity:'1'} : {visibility: 'hidden', opacity:'0'} }
        >
            <img src="/img/ARROW-NEXT-BLUE.png" style={styleArrowCarousel} />
        </div>
    )
} ;
//
export class CarouselImagenes extends React.Component {
    //
    constructor(props) {
        super(props) ;
        let tempStyle = this.props.styleArrows ? this.props.styleArrows : {} ;
        this.state = {
            currentSlide: 0,
            refCarousel: false,
            visible: false ,
            //  visible: true ,
            styleArrows: {...tempStyle, transition: 'all 0.3s ease-in-out',display:'none'}
            //styleArrows: {...tempStyle, transition: 'all 0.3s ease-in-out',display:'none'}
        } ;
        //
        this.onMouseOverCarousel = this.onMouseOverCarousel.bind(this) ;
        this.onMouseOutCarousel  = this.onMouseOutCarousel.bind(this)  ;
        //
        this.carouselSettings = {
            className: "slider variable-width",
            // dots: true,
            // lazyLoad : true,
            //edgeFriction: 1,
            infinite: false,
            arrows: true,
            centerMode: (window.innerWidth<797) ? false : true,
            centerPadding: '60px',
            variableWidth: (window.innerWidth<797) ? false : true,
            //swipeToSlide: true,
            //variableWidth: true,
            //accessibility: true,
            autoplay: true,
            autoplaySpeed: 93000,
            // cssEase: "linear",
            slidesToShow: 1,
            // slidesToScroll: 1,
            afterChange: current => {this.setState({ currentSlide: current })},
            prevArrow: <CarouselArrowPrev visible={this.state.visible} />,
            nextArrow: <CarouselArrowNext visible={this.state.visible} />,
            //
            focusOnSelect: false,
            draggable: false
          };
          if ( this.props.settings ){
              for ( let keySet in this.props.settings ){
                this.carouselSettings[keySet] = this.props.settings[keySet] ;
              }
          }
          //
    }
    //
    onMouseOverCarousel(argEE){
        try {
            if ( argEE && argEE.preventDefault  ){ argEE.preventDefault(); }
            this.setState({ visible: true }) ;
        } catch(errOMO){
            console.log('...ERROR: errOMO: ',errOMO) ;
        }
    }
    //
    onMouseOutCarousel(argEE){
        try {
            if ( argEE && argEE.preventDefault  ){ argEE.preventDefault(); }
            this.setState({ visible: false }) ;
        } catch(errOMO){
            console.log('...ERROR: errOMO: ',errOMO) ;
        }
    }
    //
    goToEnd(){
        //
        if ( this.state.refCarousel!=false && this.props.data.length>1 ) {
            this.state.refCarousel.goTo( (this.props.data.length-1) )
        }
    }
    //
    render(){
        //
        const { customStyle } = this.props ;
        let tempSettings = {...this.carouselSettings} ;
        if ( this.props.data.length<2 ){
            tempSettings.autoplay     = false ;
            tempSettings.slidesToShow = 1 ;
            tempSettings.centerMode   = true  ;
        }
        //
        tempSettings.prevArrow = <CarouselArrowPrev visible={this.state.visible} /> ;
        tempSettings.nextArrow = <CarouselArrowNext visible={this.state.visible} /> ;
        //
        return(
            <div className="waiboc-website-carousel" style={customStyle} onMouseEnter={this.onMouseOverCarousel} onMouseLeave={this.onMouseOutCarousel} >
                <div style={{width:'100%'}} >
                    <Carousel {...tempSettings}
                        ref={
                        (argRef)=>{
                            if ( argRef && this.state.refCarousel==false ){
                                this.setState({refCarousel:argRef}) ;
                            }
                        }
                        }
                    >
                        {
                            this.props.data
                        }
                    </Carousel>
                </div>
            </div>
        )
    }
    //
} ;
//