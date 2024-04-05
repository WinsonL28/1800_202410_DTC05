function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().firstName;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                // document.getElementById("name-goes-here").innerText = "Welcome " + userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();


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

            var docID = doc.id;

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


            document.querySelector('i').id = "save-" + docID;
            document.querySelector('i').onclick = () => updateBookmark(docID);// for Backend part

            currentUser.get().then(userDoc => {
                //get the user name
                var bookmarks = userDoc.data().wbookmarks;
                if (bookmarks.includes(docID)) {
                    document.getElementById('save-' + docID).innerText = 'bookmark';
                }
                var completedNow = userDoc.data().WorkoutHistory;
                console.log(completedNow)
                let complete = document.getElementById('completed');
                if (completedNow.includes(docID)) {
                    complete.innerHTML = "Mark as incomplete";
                }
            })




        });

    // console.log(currentUser);

}
displayWorkoutInfo();

function updateBookmark(workoutDocID) {
    // currentUser.update({
    //     // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
    //     // This method ensures that the ID is added only if it's not already present, preventing duplicates.
    //     bookmarks: firebase.firestore.FieldValue.arrayUnion(workoutDocID)})
    currentUser.update({
        // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
        // This method ensures that the ID is added only if it's not already present, preventing duplicates.
        wbookmarks: firebase.firestore.FieldValue.arrayUnion(workoutDocID)
    })

    currentUser.get().then(userDoc => {
        let bookmarksNow = userDoc.data().wbookmarks;
        console.log(bookmarksNow)

        if (bookmarksNow.includes(workoutDocID)) {
            console.log("this workoutDocID exists in the database, shuld be removed")
            currentUser.update({
                wbookmarks: firebase.firestore.FieldValue.arrayRemove(workoutDocID)
            })
                .then(function () {
                    console.log("bookmark has been removed for" + workoutDocID);
                    let iconID = 'save-' + workoutDocID;
                    //console.log(iconID);
                    //this is to change the icon of the hike that was saved to "filled"
                    document.getElementById(iconID).innerText = 'bookmark_border';
                });
        }
        else {
            console.log("this workoutDocID does not exist, needs to be addded")
            currentUser.update({
                wbookmarks: firebase.firestore.FieldValue.arrayUnion(workoutDocID)
            })
                .then(function () {
                    console.log("bookmark has been saved for" + workoutDocID);
                    let iconID = 'save-' + workoutDocID;
                    //console.log(iconID);
                    //this is to change the icon of the hike that was saved to "filled"
                    document.getElementById(iconID).innerText = 'bookmark';

                });
        }

    })
}



function AddtoHistory() {
    console.log("function activated")
    let params = new URL(window.location.href);
    let workoutDocID = params.searchParams.get("docID");
    console.log(workoutDocID);
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user

            currentUser.update({

                WorkoutHistory: firebase.firestore.FieldValue.arrayUnion(workoutDocID)
            })
            currentUser.get().then(userDoc => {
                let completedNow = userDoc.data().WorkoutHistory;
                console.log(completedNow)
                if (completedNow.includes(workoutDocID)) {
                    console.log("this workoutDocID exists in the database")
                    currentUser.update({
                        WorkoutHistory: firebase.firestore.FieldValue.arrayRemove(workoutDocID)


                    })

                        .then(function () {
                            console.log("marked as incomplete" + workoutDocID);
                            // let iconID = 'save-' + workoutDocID;
                            //console.log(iconID);
                            //this is to change the icon of the hike that was saved to "filled"
                            document.getElementById('completed').innerText = 'Completed';
                        });
                }
                else {
                    console.log("this workoutDocID does not exist, needs to be addded")
                    currentUser.update({
                        WorkoutHistory: firebase.firestore.FieldValue.arrayUnion(workoutDocID)
                    })
                        .then(function () {
                            console.log("Workout completed" + workoutDocID);
                            // let iconID = 'save-' + workoutDocID;
                            //console.log(iconID);
                            //this is to change the icon of the hike that was saved to "filled"
                            document.getElementById('completed').innerText = 'Mark as incomplete';

                        });
                }

            })
        }
        else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })

}


