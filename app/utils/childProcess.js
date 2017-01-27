const scriptPath = __dirname + '\\exportMetadata.py';
const exec = require('child-process-promise').exec;

// export const runProcess = (datasetName, datasetType)=>{
//     return new Promise((resolve,reject)=>{
//         let prc = exec(`${scriptPath} ${datasetName} ${datasetType}`);
//         prc.on('exit', ()=>{
//             resolve();
//         });
            
//             // if (stderr)
//             //     reject(stderr);
//             // else{
//             //     if(stdout === 'success\r\n' || stdout === 'success with export\r\n')
//             //         resolve(stdout);
//             //     else
//             //         reject(stdout);
//             // }
                
//     })
// };
export const runProcess = (datasetName, datasetType)=>{
    return exec(`${scriptPath} ${datasetName} ${datasetType}`);
}
