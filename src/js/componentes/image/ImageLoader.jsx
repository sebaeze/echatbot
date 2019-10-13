import React from "react";

const _loaded = {};

export class ImageLoader extends React.Component {
  constructor(props){
      super(props) ;
      this.state = {
        loaded: _loaded[this.props.src]
      };
      this.onLoad = this.onLoad.bind(this) ;
      if ( !this.props.style           ){ this.props.style={}; }
      if ( !this.props.className       ){ this.props.className=""; }
      if ( !this.props.loadingClassName ){ this.props.loadingClassName=""; }
      if ( !this.props.loadedClassName  ){ this.props.loadedClassName=""; }
  }
  //image onLoad handler to update state to loaded
  onLoad(){
    _loaded[this.props.src] = true;
    this.setState(() => ({ loaded: true }));
  };
  //
  render(){
    //
    let { className, loadedClassName, loadingClassName, style, ...props } = this.props;
    className = `${className} ${this.state.loaded
      ? loadedClassName
      : loadingClassName}`;
    //
    return (
            <img
                src={this.props.src}
                onClick={this.props.onClick}
                className={className}
                style={style}
                onLoad={this.onLoad} />
            ) ;
    //
  }
}
//