import * as moment from 'moment';
export default {
    dateFormat(date){
        if (!date)
            return 'None';
        if (_.isString(date))
            return moment.default(Date.parse(date)).format('MM-DD-YYYY');
        return moment.default(date).format('MM-DD-YYYY');
    },
    yesNoFormat(p){
        return p===1? 'Yes':'No';
    },
    personFormat(p){
        let person = _.find(this, {value:parseInt(p) });
        if (!person)
            return 'Not found';
        return person.label;
    }
}