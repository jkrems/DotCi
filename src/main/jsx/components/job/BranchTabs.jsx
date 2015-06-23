import React from 'react';
import LocationHashHelper from './../mixins/LocationHashHelper.jsx'
import contains from 'ramda/src/contains'
import classNames from 'classnames'; 
import ActionButton from './../lib/ActionButton.jsx';
import Router from 'react-router';
import LoadingHelper from './../mixins/LoadingHelper.jsx';
import CustomAttributes from './../mixins/CustomAttributes.jsx';
require('./branch_tabs.css')
export default React.createClass({
  mixins: [LocationHashHelper,LoadingHelper,CustomAttributes], 
  getInitialState(){
    return {currentSelection: this.selectedHash()?this.selectedHash(): this.props.defaultTab};
  },
  currentTab(){
    const selectedTab = Router.HashLocation.getCurrentPath();
    return selectedTab|| this.props.defaultTab;
    // <input type="text" ref="newBranchTab" placeholder=""/>
  },
  _render()  {
    return (<div>
      <div className="ui text menu">
        {this.props.tabs.map((tab,i)=>this._getHistoryTab(tab,i,this._isTabRemovable(tab))).toArray()}
        <ActionButton className="ui item" tooltip="Add new tab" onClick={this._addTab} icon="fa fa-plus-circle" dontDisable/>
      </div>
      <paper-dialog  ref="ca-addDialog"  attrs={{heading:"Add new brach tab"}} onClick={this._onTabSave} >
        <paper-input ref="ca-branchInput" attrs={{label:"Branch Expression"}}></paper-input>
        <div className="buttons">
          <paper-button ref="ca-1" attrs={{"dialog-dismiss": true}}>Cancel</paper-button>
          <paper-button id="addTabButton" ref="ca-2" attrs={{ "dialog-confirm": true}}>Accept</paper-button>
        </div>
      </paper-dialog>
    </div>
           );
  },
  _isTabRemovable(tab){
    return !contains(tab)(['master','All','Mine']);
  },
  _addTab(){
    const addDialog = this.refs['ca-addDialog'];
    addDialog.getDOMNode().toggle();
  },
  _onTabSave(e){
    if(e.target.parentElement && e.target.parentElement.id === "addTabButton"){
      const tabExpr = this.refs['ca-branchInput'].getDOMNode().value
      if(tabExpr){
        this.props.flux.addBranchTab(tabExpr);
      }
    }
  },
  _notifyTabSelection: function (tab) {
    this.replaceState({currentSelection: tab});
    this.props.onTabChange(tab);
  },
  _onLocationHashChange(event){
    const selectedTab = this.selectedHash();
    this._notifyTabSelection(selectedTab?selectedTab:this.defaultTab);
  },
  _onTabRemove(event){
    event.stopPropagation();
    this.replaceState(this.getInitialState());
    this._notifyTabSelection(this.state.currentSelection);
    var tab = event.currentTarget.getAttribute('data-tab');
    this.props.flux.removeBranchTab(tab);
  },
  _getHistoryTab(tab,i,closable) {
    var classes = classNames({
      'ui':true,
      'item':true ,
      'green':true ,
      'active': this.state.currentSelection== tab
    });
    return (<a className={classes} key={i} href={'#'+tab}>
      <i className="icon octicon octicon-git-branch "></i>
      {tab}
      {closable?<div data-tab={tab} className="tab-close fa fa-times-circle-o" onClick={this._onTabRemove}></div>: ''}
    </a>);
  }
});
