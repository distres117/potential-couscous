import * as moment from 'moment';
export default {
    dateFormat(date){
        if (!date)
            return 'None';
        return moment.default(Date.parse(date)).format('MM-DD-YYYY');
    },
    yesNoFormat(p){
        return p===1? 'Yes':'No';
    }
}