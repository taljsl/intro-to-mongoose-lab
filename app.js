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
    switch(userChoice){
    case '1':
        await createProfile();
        break;
    case '2':
        await findAllProfiles();
        break;
    case '3':
        await updateProfile();
        break;
    case '4':
        


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
    const profiles = await (Profiles.find({}));
    console.log("All Profiles: ", profiles)
}

const updateProfile = async () => {
    const targetProfile = prompt("What is the name of the person who's profile you wish to update? : ")
    const findProfile = await Profiles.findOne({name: targetProfile})

    if(!findProfile){
        console.log('Profile Not Found')
        return;
    }

    console.log("Okay, here is that profile: ", findProfile)
    const whatToChange = prompt('What would you like to change? \n 1) Name \n 2) Age')
    const updateInformation =  () => {
        if (whatToChange == "1") {
            let newName = prompt('Please insert the new name for this user: ')
            findProfile.name = newName;
            await findProfile.save()
            console.log(`Okay, I've updated that ifnromation for you`, findProfile)
        } else if (whatToChange == "2"){
            let newAge = prompt ('How old are they now?: ')
            findProfile.age = newAge
            await findProfile.save()
            console.log(`Okay, I've updated that ifnromation for you`, findProfile)
        } else {
            console.log('Invalid input, please try again')
            updateInformation();
        }
    }


}

connect()