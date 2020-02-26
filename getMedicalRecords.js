const https = require('https');
const log = console.log;
const error = console.error;

function getMedicalRecords(page = 1){
    const url = `https://jsonmock.hackerrank.com/api/medical_records?page=${page}`;
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            })
            res.on('end', () => {
                let json = JSON.parse(data);
                let result = [];
                let totalPages = json.total_pages;
                json.data.map(a => {
                    result.push(a);
                });
                resolve({
                    data: result,
                    totalPages : totalPages
                });
            })
            res.on('error', e =>{
                reject(e);
            });
        });
    });
}

function getAllMedicalRecords(){
    let promises = [];
    let medicalData = [];

    return new Promise((resolve, reject) => {
        getMedicalRecords(1).then( a => {
            medicalData.push(...a.data);
            for(i = 2; i <= a.totalPages; i++){
                promises.push(getMedicalRecords(i));
            }
            Promise.all(promises).then(result => {
                result.forEach( a => {
                    medicalData.push(...a.data);
                });
                resolve(medicalData);
            }).catch(e => {
                error(e);
            });
        }).catch(e => {
            reject(e);
        });
    });
}

function filterMedicalRecords(_ageStart, _ageEnd, _bpdiff){
    return new Promise((resolve, reject) => {
        getAllMedicalRecords().then(data => {
            let result = [];
            data.forEach( i => {
                let recordTimeStamp = i.timestamp;
                let dob = i.userDob;
                let bpdiff = i.vitals.bloodPressureDiastole - i.vitals.bloodPressureSystole;
                if(bpdiff > _bpdiff){
                    let age = getAge(recordTimeStamp, new Date(Date.parse(dob)));    
                    log(`recordTimeStamp:${recordTimeStamp}, dob:${dob}, age:${age}`);
                    if(isNaN(age) && age > _ageStart && age <= _ageEnd){
                        result.push(i);
                    }
                }
            });
            resolve(result);
        }).catch(e => {
            reject(e);
        })
    });
}

function getAge(timestamp, birthday){
    var ageDifMs = timestamp - birthday.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

filterMedicalRecords(25, 50, 50)
    .then(a => {
        //log(a);
    })
    .catch(e => error(e));
