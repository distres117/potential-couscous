import React from 'react';
import {connected} from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import formatter from '../../helpers/format.helpers';

@connected
export default class TransactionInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {tab: 'general'};
    }
    isActive(name){
        if (name===this.state.tab)
            return 'active';
        return '';
    }
    handleClick = (e)=>{
        e.preventDefault();
        this.setState({tab:e.target.name});
    }
    
    getContent(current){;
        let {people} = this.props;
        switch(this.state.tab){
            case 'submit':
                return helper.infoPaneFor([
                    {key:'submitName', label:'Submit Name'},
                    {key:'submitDate', label: 'Submitted', format: formatter.dateFormat},
                    {key:'submitPerson', label: 'Submitted by', format: formatter.personFormat.bind(this.props.people)},
                    {key:'submitGdb', label:'GDB'},
                    {key:'submitVersion', label:'Version'}
                ], current);
            case 'review':
                return helper.infoPaneFor([
                    {key: 'reviewDate', label: 'Reviewed', format: formatter.dateFormat },
                    {key:'reviewPerson', label: 'Reviewed by', format: formatter.personFormat.bind(this.props.people) },
                    {key: 'passed', label:'Passed', format:formatter.yesNoFormat}

                ],current,'reviewNotes')
            case 'load':
                return helper.infoPaneFor([
                    {key: 'loadDate', label:'Loaded', format: formatter.dateFormat},
                    {key:'loadName', label:'Name'},
                    {key:'sdePerson', label:'SDE person', format: formatter.personFormat.bind(this.props.people)},
                    {key:'recorded', label:'Recorded', format:formatter.yesNoFormat}
                ], current)
            default:
                return helper.infoPaneFor([
                    {key: 'submitName', label: 'Name'},
                    {key: 'dataTypeString', label: 'Type'},
                    {key: 'action', label: 'Action'},
                    {key: 'indexes', label: 'Indexes'}
                ], current,'description')
        }
    }
    render(){
        let activeCls = this.state.tab;
        return(
            <div className='row-align-items-center'>
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Transaction Info</h3>
                    </div>
                    <div className='panel-body '>
                        <ul className='nav nav-pills'>
                            <li role='presentation' className={this.isActive('general')}><a href='#' name='general' onClick={this.handleClick}>General</a></li>
                            <li role='presentation' className={this.isActive('submit')}> <a href='#' name='submit' onClick={this.handleClick}>Submit detail</a></li>
                            <li role='presentation' className={this.isActive('review')}><a href='#' name='review' onClick={this.handleClick}>Review detail</a></li>
                            <li role='presentation' className={this.isActive('load')}><a href='#' name='load' onClick={this.handleClick}>Load detail</a></li>
                        </ul>
                        <hr/>
                        {this.getContent(this.props.current)}
                    </div>
                </div>
            </div>
        );
    }
}