import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import 'react-date-picker/index.css';
import { DateField, DatePicker } from 'react-date-picker';

@connected
export default class TransactionSubmit extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        //TODO: Get people action
        //TODO: Get contents of ready to load
    }
    onDateChange = (dateString, {dateMoment, timestamp}) => {
        console.log(dateString);
    }
    labelFor(title){
        return <label className='col-sm-2 control-label'>{title}</label>
    }
    dropDownFor(title,items){
        return (
            <select>
                <option></option>
                {items.map((it,i)=><option key={i}>{it}</option>)}
            </select>
        )
    }
    render() {
        return (<div>
            <form className='form-horizontal'>
                <div className='form-group'>
                    {this.labelFor('Submit date')}
                    <DateField dateFormat="YYYY-MM-DD" forceValidDate={true} updateOnDateClick={true} collapseOnDateClick={true} defaultValue={Date.now()} showClock={false}>
                        <DatePicker navigation={true} locale="en" forceValidDate={true} highlightWeekends={false} highlightToday={false} weekNumbers={true} weekStartDay={0} footer={false}/>
                    </DateField>
                </div>
                <div className='form-group'>
                    {this.labelFor('Submit person')}
                    {this.dropDownFor('select person...', ['test', 'shitface'])}
                </div>
                <div className='form-group'>
                    {this.labelFor('Action')}
                    {this.dropDownFor('Transaction type...',['New', 'Update (version)', 'Update (external)', 'Archive', 'Rename', 'Delete'])}
                </div>
                <div className='form-group'>
                    {this.labelFor('Select data')}
                </div>
                <div className='form-group'>
                    
                </div>
            </form>
        </div>);
    }
}
