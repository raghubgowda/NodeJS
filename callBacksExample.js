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
    setTimeout(() => {
        log('Fetching the user...');
        callback(users.find(user => user.id === userId));
    }, 2000);
}

//Print User Details of the user passed
function getUserDetails(user, callback){
    setTimeout(() => {
        log('Printing the user details...');
        if(user == null){
            callback(`User with id ${userId} not found!!!`);
        }
        else{
            callback(`User - Id: ${user.id} Name: ${user.name} Age: ${user.age}`);  
        }
    }, 3000); 
}


//Populate the users
populateUsers();

//Generate a random user id
const userId = Math.round(Math.random() * 10);

//Fetch the user and print the details
getUser(userId, (user) => {
    log('Fetched the user!!!');
    getUserDetails(user, (userDetails) => {
        log(userDetails);
    });
});




