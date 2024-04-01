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

function displayWorkoutInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("workouts")
        .doc(ID)
        .get()
        .then(doc => {
            thisworkout = doc.data();
            // workout = thisworkout.code;
            workoutDetails = thisworkout.details;

            // only populate title, and image
            document.getElementById("workoutName").innerHTML = workoutDetails;
            // let imgEvent = document.querySelector(".hike-img");
            // imgEvent.src = "../images/" + hikeCode + ".jpg";
        });
}
displayWorkoutInfo();