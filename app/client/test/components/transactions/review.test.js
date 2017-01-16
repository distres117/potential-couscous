import {shallow, mount} from '../../helpers/mount.helper';
import {expect} from 'chai';
import TransactionReview from '../../../components/transactions/review.component';
import {TransactionReviewModel} from '../../../models/transaction.models';

describe('transaction review', ()=>{ 
    it('should pre-populate form correctly', ()=>{
        let model = new TransactionReviewModel();
        _.assign(model, {
            passed: 1,
            reviewPerson: 1,
            reviewNotes: 'this is just a stupid review note'
        });
        let state = {
            transaction:{model}, 
            people:[
                {label: 'testPerson1', value: 1}
            ]
        };
        let instance = mount(TransactionReview, state);
        expect(instance.find("select[name='reviewPerson']").node.value).to.equal('1');
        expect(instance.find('button').node.disabled).to.be.false;
    });
    it('submit button should not be enabled if form invalid', ()=>{
        let model = new TransactionReviewModel();
        let state = {
            transaction:{model},
            people:[
                {label: 'testPerson1', value: 1}
            ]
        }
        let instance = mount(TransactionReview,state);
        expect(instance.find('button').node.disabled).to.be.true;
    });
});