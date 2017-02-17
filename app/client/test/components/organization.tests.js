import {shallow, mount} from '../helpers/mount.helper';
import {expect} from 'chai';
import OrganizationForm from '../../components/organizations/organizationForm.component';
import {OrganizationModel} from '../../models/organization';

describe('organization component tests',()=>{
    it('component should autopopulate correctly', ()=>{
        let state={
            current:{
                name: 'testy org',
                abbrev: 'TOTOTO',
                orgTypeId: 1,
                isNull: ()=>false
            },
            orgTypes:[
                {orgTypeId: 1, type:'stupid org type'}
            ]
        };
        let instance = mount(OrganizationForm, state);
        let submitButton = instance.find('.btn-primary');
        expect(submitButton.text()).equals('Update');
        expect(submitButton.node.disabled).to.be.false;
        instance.find("select[name='orgTypeId']").simulate('change',{target:{name:'orgTypeId', value:''}});
        expect(submitButton.node.disabled).to.be.true;
    });
    it('should render an empty form with disabled submit button', ()=>{
        let state = {
            current:{
                isNull:()=>true
            }
        };
        let instance = mount(OrganizationForm, state);
        let submitBtn = instance.find('.btn-primary');
        expect(submitBtn.text()).equals('Submit');
        expect(submitBtn.node.disabled).to.be.true;
    })
})