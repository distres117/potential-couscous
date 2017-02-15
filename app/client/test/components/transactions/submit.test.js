import { mount, shallow } from '../../helpers/mount.helper';
import { expect } from 'chai';
import TransactionSubmit from '../../../components/transactions/submit.component';

function changeValue(elem, name, val) {
    elem.find(`select[name="${name}"]`).simulate('change', { target: { name: name, value: val } });
}
let extraAttrs
describe('submit transaction', () => {
    beforeEach(()=>{
        extraAttrs = {
            readyToLoad: {
                featureClasses: [],
                loaded: true
            },
            people: [],
            versions: []
        }
    })
    it('should not enable submit button when form is invalid', () => {
        let state = _.assign(extraAttrs,{
            current: {
                isNull: () => true
            }
        });
        let wrapped = mount(TransactionSubmit, state);
        expect(wrapped.findWhere(n => n.text() === 'Submit').node.disabled).to.be.true;

    });
    it('should not enable submit button when form is invalid', () => {
        let state = _.assign(extraAttrs,{
            current: {
                isNull: () => false,
                dataType: 1,
                submitName: 'test1',
                submitPerson: 1
            }
        });
        let wrapped = mount(TransactionSubmit, state);
        expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.true;
    });
    it('should not enable submit if version is not populated', () => {
        let state = _.assign(extraAttrs, {
           current: {
                isNull: () => false,
                action: 'New',
                dataType: 1,
                submitName: 'sde.SDE.test1',
                submitPerson: 1
           } 
        });
        let wrapped = mount(TransactionSubmit, state);
        expect(wrapped.findWhere(n=>n.text()==='Submit').node.disabled).to.be.true;
    });
});