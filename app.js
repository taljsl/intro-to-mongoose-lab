const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const username = prompt('What is your name? ');
const Profiles = require('./models/profiles.js')



console.log(`Your name is ${username}`);


const connect = async () => {
    console.log('Welcome to the CRM')
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    const userChoice = prompt('What would you like to do? \n 1) Create A Customer \n 2) View All Customers \n 3) Update a customer \n 4) Delete a customer \n 5) quit' )



    await runQueries()
    await mongoose.disconnect();
    console.log ('Disconnected from Database')
    process.exit
}

const runQueries = async () => {
    console.log('Queries running.')
    if (userChoice === '1') {
        createProfile();
    }
    // The functions calls to run queries in our db will go here as we write them.
  };


const createProfile = async () => {
    const targetName = prompt ("What is the name of the person that this profile is for?")
    const targetAge = prompt ("How old is the person associated with this profile?")
    const profileData = { 
        name: targetName,
        age:  targetAge,
    }
    const profile = await Profiles.create(profileData)
    console.log("New Profile: ", profile)
}

const findAllProfiles = async () => {
    
}

connect()