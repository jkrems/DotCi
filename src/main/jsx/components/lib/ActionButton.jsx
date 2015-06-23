import React from "react";
export default  React.createClass({
  render(){
    const styles =  "circular ui icon button hint--top" + (this.props.primary? " green ":"")+ (this.props.className || "");
    return (<a ref="button" className={styles} data-hint={this.props.tooltip}  href={this.props.href|| '#'} onClick={this._onClick}>
      <i className={this.props.icon}></i>
    </a>);
  },
  _onClick(e){
    this.disable();
    if(this.props.onClick){
      this.props.onClick(e);
    }
  },
  disable() {
    if(!this.props.dontDisable)
      this.refs.button.getDOMNode().classList.add('disabled');
  }
});
