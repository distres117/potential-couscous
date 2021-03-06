import {shallow, mount} from '../../helpers/mount.helper';
import {expect} from 'chai';
import TransactionReview from '../../../components/transactions/review.component';
import {TransactionReviewModel} from '../../../models/transaction.models';

let extraAttrs;
describe('transaction review', ()=>{
    beforeEach(()=>{
        extraAttrs ={
            people:[
                {label: 'testPerson1', value: 1}
            ]
        } 
    }) 
    it('should pre-populate form correctly', ()=>{
        let state = _.assign(extraAttrs, {
                current:{
                    isNull: ()=>false,
                    passed: 1,
                    reviewPerson: 1,
                    reviewNotes: 'this is just a stupid review note'
                }
        });
        let instance = mount(TransactionReview, state);
        expect(instance.find("select[name='reviewPerson']").node.value).to.equal('1');
        expect(instance.find("select[name='passed']").node.value).equals('1');
        expect(instance.find('button').node.disabled).to.be.false;
    });
    it('submit button should not be enabled if form invalid', ()=>{
        let state = _.assign(extraAttrs,{
            current:{
                isNull: ()=>false
            }
        })
        let instance = mount(TransactionReview,state);
        expect(instance.find('button').node.disabled).to.be.true;
    });
});