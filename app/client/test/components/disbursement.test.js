import {shallow, mount} from '../helpers/mount.helper';
import {expect} from 'chai';
import DisbursementForm from '../../components/disbursements/disbursementsForm';
import {DisbursementModel} from '../../models/disbursement.model';

describe('disbursement component tests',()=>{
    it('component should autopopulate correctly', ()=>{
        const state = {
            current:{
                dataCatalogId: 1,
                contractor:0,
                recipient: 2,
                provider: 1,
                formatId: 1,
                transmittalId:1,
                isNull:()=>false
            },
            people:[
                {value: 1, label:'moe'},
                {value:2, label:'larry'}
            ],
            domainTypes:[
                {value:1, label:'text'}
            ],
            transmittalTypes:[
                {value:1, label:'email'}
            ]
        };
        const instance = mount(DisbursementForm, state);
        const submitBtn = instance.find('.btn-primary');
        expect(submitBtn.text()).equals('Update');
        expect(submitBtn.node.disabled).to.be.false;
        instance.find("select[name='dataCatalogId']").simulate('change',{target:{name:'dataCatalogId', value:''}});
        expect(submitBtn.node.disabled).to.be.true;
        expect(instance.find("select[name='formatId']").node.value).equals('1');
    });
    it('should render empty form with disabled submit button', ()=>{
        const state = {
            current:{
                isNull: ()=>true
            }
        };
        const instance = mount(DisbursementForm, state);
        const submitBtn = instance.find('.btn-primary');
        expect(submitBtn.text()).equals('Submit');
        expect(submitBtn.node.disabled).to.be.true;
    });
});