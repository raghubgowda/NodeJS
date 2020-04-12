const log = console.log;
let users = [];


//Populates random users
function populateUsers(callback){
    let i = 1;
    while( i <= 5){
        const user = { 
            id : i,
            name : `User${i}`,
            age : Math.round(Math.random() * 100)
        };
        users.push(user); 
        i++;
    }
}

//Returns the user matching the user id
function getUser(userId, callback){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            resolve(users.find(user => user.id === userId));
        }, 2000);
    });
    
}

//Print User Details of the user passed
function getUserDetails(user, callback){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            if(user == null){
                reject(new Error(`User with id ${userId} not found!!!`));
            }
            else{
                resolve(`User - Id: ${user.id} Name: ${user.name} Age: ${user.age}`);  
            }
        }, 3000); 
    });
}


//Populate the users
populateUsers();

//Generate a random user id
const userId = Math.round(Math.random() * 10);

log(`Fetching details for the userId: ${userId}`);

//Fetch the user and print the details
getUser(userId)
.then(user => getUserDetails(user))
.then(userDetails => log(userDetails))
.catch( e => log(e.message));




