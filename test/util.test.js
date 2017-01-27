import {expect} from 'chai';
import {runProcess} from '../app/utils/childProcess';
import axios from 'axios';
import {getDetailsGp} from '../app/services/acpyService'

//These tests will not work without arcgis server and the appropriate gp service and data
xdescribe('util tests', function(){
    const datasetName = '_OMtesting_feature';
    this.timeout(60000);
    it('should export metadata from dataset', ()=>{
        return runProcess(datasetName, 'feature')
        .then(out=>{
            expect(out).to.equal('success');
        })
        .catch(err=>{
            console.log(err);
        })
    });
    it('should use service to get all the data', ()=>{
        return getDetailsGp(datasetName, 'feature')
        .then(res=>{
            expect(res.data.results.length > 0).to.be.true;
            expect(res.data.results[0].value.metadata).to.be.ok;
            expect(res.data.results[0].value.metadata.metadata.dataqual.lineage.procstep[4].procdesc).to.be.null;
        });
    });

})