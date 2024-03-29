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