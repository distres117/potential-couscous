import {shallow, mount} from '../helpers/mount.helper';
import {expect} from 'chai';
import PersonForm from '../../components/people/personForm.component';
import {PersonModel} from '../../models/person.models';

describe('person component tests', ()=>{
    it('component should autopopulate properly', ()=>{
        let state = {
            current: {
                firstName: 'Testy',
                lastName: 'McTest',
                organizationId: 1,
                isNull: ()=>false
            },
            organizations:[
                {organizationId: 1, abbrev: 'NYCEM', name: 'NYCEM'}
            ],
        };
        let instance = mount(PersonForm,state);
        //console.log(instance.debug())
        expect(instance.find("input[name='firstName']").node.value).equals('Testy');
        expect(instance.find("input[name='lastName']").node.value).equals('McTest');
        expect(instance.find("select[name='organizationId']").node.value).equals('1');
        expect(instance.find('.btn-primary').text()).equals('Update');

    });
    it('should render an empty form with submit button', ()=>{
        let state = {
            current:{
                isNull: ()=>true
            }
        };
        let instance = mount(PersonForm, state);
        instance.setProps({render:true});
        expect(instance.find('.btn-primary').text()).equals('Submit');
    });
})