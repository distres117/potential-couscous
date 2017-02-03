import * as moment from 'moment';
export default {
    dateFormat(date) {
        if (!date)
            return 'None';
        if (_.isString(date))
            return moment.default(Date.parse(date)).format('MM-DD-YYYY');
        return moment.default(date).format('MM-DD-YYYY');
    },
    yesNoFormat(p) {
        return p === 1 ? 'Yes' : 'No';
    },
    personFormat(p) {
        let person = _.find(this, { value: parseInt(p) });
        if (!person)
            return 'Not found';
        return person.label;
    },
    flatten(arr) {
        if (!arr || !arr.length)
            return;
        let rArr = [];
        function _flatten(o, ro) {
            for (let key of Object.keys(o)) {
                if (typeof o[key] === 'object' && !Array.isArray(o[key]))
                    _flatten(o[key], ro);
                else
                    ro[key] = o[key];
            }
            return;
        }
        for (let obj of arr) {
            let ro = {};
            _flatten(obj, ro);
            rArr.push(ro);
        }
        return rArr;
    }
}