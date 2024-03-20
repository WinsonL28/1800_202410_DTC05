function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name").innerText = userName;

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

function writeWorkouts() {
    //define a variable for the collection you want to create in Firestore to populate data
    var workoutRef = db.collection("workouts");

    workoutRef.add({
        workoutcode: "WOUB01",
        name: "Uper Body 1.1", //replace with your own city?
        level: "easy",
        details: "Upper body strength training",
        length: 25,          //number value
        // hike_time: 60,       //number value

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}

// writeWorkouts()


function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("WorkoutCardTemplate"); // Retrieve the HTML element with the ID "WorkCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "workouts"
        .then(allworkouts => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allworkouts.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var WorkoutCode = doc.data().workoutcode;    //get unique ID to each hike to be used for fetching right image
                var workoutLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.


                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = workoutLength + "min";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${WorkoutCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "each_workout.html?docID=" + docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("workouts");  //input param is the name of the collection