import {expect} from 'chai';
import {runProcess} from '../app/utils/childProcess';
import axios from 'axios';
import {getDetails} from '../app/services/acpyService'

xdescribe('util tests', function(){
    this.timeout(60000);
    xit('should export metadata from dataset', done=>{
        runProcess('NYC_Buildings_composite', 'feature')
        .then(out=>{
            expect(out).to.equal('success');
            done();
        })
        .catch(err=>{
            console.log(err);
            done();
        })
    });
    xit('should get object from gp service', done=>{
        let data = {datasetName: 'NYC*'};
        axios.post('http://agsprod2:6080/arcgis/rest/services/Development/GpMetadata/GPServer/MGPMetadata/execute?f=json', data)
        .then(res=>{
            expect(res.data.results[0].value.metadata).to.be.ok;
            done();
        });
    });
    it('should use service to get all the data', done=>{
        getDetails('NYC_Buildings_composite', 'feature')
        .then(res=>{
            let data = res.data;
            expect(data.results.length > 0).to.be.true;
            expect(data.results[0].value.metadata).to.be.ok;
            done();
        });
    });

})