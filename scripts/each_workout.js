function displayWorkoutInfo() {
    let params = new URL(window.location.href); 
    let ID = params.searchParams.get("docID"); 
    console.log(ID);
    console.log("hello");

    db.collection("workouts")
        .doc(ID)
        .get()
        .then(doc => {
            thisworkout = doc.data();
            workoutCode = thisworkout.workoutcode;
            workoutDetails = thisworkout.details;
            workoutTitle = thisworkout.title;
            workoutLength = thisworkout.length;
            console.log(workoutCode);
            console.log(workoutDetails);
            console.log(workoutTitle);
            console.log(thisworkout);

            var woExcercises0 = document.createElement("p");
            woExcercises0.textContent = thisworkout.excercises[0]
           
            var woExcercises1 = document.createElement("p");
            woExcercises1.textContent = thisworkout.excercises[1]
            var woExcercises2 = document.createElement("p");
            woExcercises2.textContent = thisworkout.excercises[2]
            var woExcercises3 = document.createElement("p");
            woExcercises3.textContent = thisworkout.excercises[3]
            var woExcercises4 = document.createElement("p")
            woExcercises4.textContent = thisworkout.excercises[4]
            var woExcercises5 = document.createElement("p");
            woExcercises5.textContent = thisworkout.excercises[5]


            // only populate title, and image
            document.getElementById("workoutName").innerHTML = workoutTitle;
            document.getElementById("workoutDetails").innerHTML = workoutDetails;
            document.getElementById("length").innerHTML = workoutLength + " min";
            document.getElementById("excercises").appendChild(woExcercises0);
            document.getElementById("excercises").appendChild(woExcercises1);
            document.getElementById("excercises").appendChild(woExcercises2);
            document.getElementById("excercises").appendChild(woExcercises3);
            document.getElementById("excercises").appendChild(woExcercises4);
            document.getElementById("excercises").appendChild(woExcercises5);
            let imgEvent = document.querySelector(".workout-img");
            imgEvent.src = "../images/" + workoutCode + ".jpg";
        });
    
    // console.log(currentUser);
    
}
displayWorkoutInfo();
