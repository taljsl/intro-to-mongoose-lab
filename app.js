const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const username = prompt("What is your name? ");
const Profiles = require("./models/profiles.js");

console.log(`Your name is ${username}`);

const connect = async () => {
  console.log("Welcome to the CRM");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  await runQueries();
};

const runQueries = async () => {
  console.log("Queries running.");
  const userChoice = prompt(
    "What would you like to do?  1) Create A Customer  2) View All Customers  3) Update a customer  4) Delete a customer  5) quit :  "
  );
  switch (userChoice) {
    case "1":
      await createProfile();
      await runQueries();
      break;
    case "2":
      await findAllProfiles();
      await runQueries();
      break;
    case "3":
      await updateProfile();
      await runQueries();
      break;
    case "4":
      await deleteProfile();
      await runQueries();
      break;
    case "5":
      await mongoose.disconnect();
      console.log("Disconnected from Database");
      process.exit;
      break;
    default:
      console.log("Invalid choice, pleast try again");
      await runQueries();
  }
  // The functions calls to run queries in our db will go here as we write them.
};

const createProfile = async () => {
  const targetName = prompt(
    "What is the name of the person that this profile is for?: "
  );
  const targetAge = prompt(
    "How old is the person associated with this profile?: "
  );
  const profileData = {
    name: targetName,
    age: targetAge,
  };
  const profile = await Profiles.create(profileData);
  console.log("New Profile: ", profile);
};

const findAllProfiles = async () => {
  const profiles = await Profiles.find({});
  console.log("All Profiles: ", profiles);
};

const updateProfile = async () => {
  // const targetProfile = prompt("What is the name of the person who's profile you wish to update? : ")
  // const findProfile = await Profiles.findOne({name: targetProfile})

  const findProfile = prompt(
    "Please paste in the id of the person you wish to update here: "
  );
  if (!findProfile) {
    console.log("Profile Not Found");
    return;
  }
  console.log("We found that profile ");
  const whatToChange = prompt(
    "What would you like to change?  1) Name  2) Age  3) Both: "
  );

  if (whatToChange == "1") {
    let newName = prompt("Please insert the new name for this Profile: ");
    const updatedProfile = await Profiles.findByIdAndUpdate(
      findProfile,
      {
        name: newName,
      },
      { new: true }
    );
    console.log(`Okay, I've updated that information for you`, updatedProfile);
  } else if (whatToChange == "2") {
    let newAge = prompt(
      "What would you like to make the age for this profile?: "
    );
    const updatedProfile = await Profiles.findByIdAndUpdate(
      findProfile,
      {
        age: newAge,
      },
      { new: true }
    );
    console.log(`Okay, I've updated that information for you`, updatedProfile);
  } else if (whatToChange == "3") {
    let newName = prompt("Please insert the new name for this Profile: ");
    let newAge = prompt(
      "What would you like to make the age for this profile?: "
    );
    const updatedProfile = await Profiles.findByIdAndUpdate(
      findProfile,
      {
        name: newName,
        age: newAge,
      },
      { new: true }
    );
    console.log(`Okay, I've updated that information for you`, updatedProfile);
  } else {
    console.log("Invalid Input, please try again.");
    updateProfile();
  }
};

const deleteProfile = async () => {
  const findProfile = prompt(
    "Please paste in the id of the person you wish to update here: "
  );
  if (!findProfile) {
    console.log("Profile Not Found");
    return;
  }
  const safety = prompt(
    "We found that profile;. Are you sure you want to delete it? Press y/n: "
  );
  if (safety.toLocaleLowerCase() == "y") {
    const deletedProfile = await Profiles.findByIdAndDelete(findProfile);
    console.log("Profile Deleted");
  } else if (safety.toLowerCase()== 'n') {
    console.log("Returning to main menu");
    runQueries()
  }else { 
    console.log("Invalid Input, Please Try Again: ")
    deleteProfile()
  }
};

// console.log("Okay, here is that profile: ", findProfile)
// const whatToChange = prompt('What would you like to change?  1) Name  2) Age')
// const updateInformation =  () => {
//     if (whatToChange == "1") {
//         let newName = prompt('Please insert the new name for this user: ')
//         findProfile.name = newName;
//         await findProfile.save()
//         console.log(`Okay, I've updated that ifnromation for you`, findProfile)
//     } else if (whatToChange == "2"){
//         let newAge = prompt ('How old are they now?: ')
//         findProfile.age = newAge
//         await findProfile.save()
//         console.log(`Okay, I've updated that ifnromation for you`, findProfile)
//     } else {
//         console.log('Invalid input, please try again')
//         updateInformation();
//     }
// }

connect();
