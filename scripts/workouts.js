var currentUser;
console.log(currentUser)

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
                document.getElementById("name-goes-here").innerText = "Welcome " + userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();



function writeWorkouts() {
    //define a variable for the collection you want to create in Firestore to populate data
    var workoutRef = db.collection("workouts");

    workoutRef.add({
        title: "Upper Body, Day A",
        workoutcode: "WOUB01",
        name: "Upper Body 1.1", //replace with your own city?
        level: "easy",
        details: "Upper body strength training",
        length: 45,          //number value

        excercises: ['Diamond (close-grip) pushups - 3 x 12',
            'Wide-grip pushups - 3 x 12',
            'Pike pushup - 3 x 8',
            'Extended tricep pushups - 3 x 10',
            'Wide-grip pullups - 3 x 12',
            'Neutral-grip pullups - 3 x 12'],


        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    workoutRef.add({
        title: "Upper Body, Day B",
        workoutcode: "WOUB02",
        name: "Upper Body 1.2", //replace with your own city?
        level: "easy",
        details: "Upper body strength training",
        length: 45,          //number value

        excercises: [
            'Archer pushups - 3 x 12',
            'Wall walks - 3 x 4',
            'Corkscrew pushups - 3 x 8',
            'Staggered pushups - 3 x 12',
            'Chin-ups - 3 x 12',
            'Commando pullups - 3 x 12'
        ],

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    workoutRef.add({
        title: "Lower Body, Day A",
        workoutcode: "WOLB01",
        name: "Lower Body 1.1", //replace with your own city?
        level: "easy",
        details: "Lower body strength training",
        length: 45,          //number value

        excercises: [
            'Hip thrusts - 3 x 12',
            'Alternate split squats - 3 x 10(each side)',
            'Heel elevated weighted squats - 3 x 8',
            'Weighted lunges - 3 x 12',
            'Hip extensions (knees up) - 2 x 10(each side)',
            'Calf raises - 2 x 18(each side)'
        ],

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
                var title = doc.data().title;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var WorkoutCode = doc.data().workoutcode;    //get unique ID to each hike to be used for fetching right image
                var workoutLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                console.log(doc)
                console.log(docID)


                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = workoutLength + "min";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${WorkoutCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "each_workout.html?docID=" + docID;
                newcard.querySelector('i').id = "save-" + docID;
                newcard.querySelector('i').onclick = () => updateBookmark(docID);// for Backend part

                currentUser.get().then(userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().wbookmarks;
                    if (bookmarks.includes(docID)) {
                        document.getElementById('save-' + docID).innerText = 'bookmark';
                    }
                })

                // let bookmarksNow = userDoc.data().wbookmarks;

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


//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
// function saveBookmark(workoutDocID) {
//     // Manage the backend process to store the hikeDocID in the database, recording which hike was bookmarked by the user.
//     currentUser.update({
//         // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
//         // This method ensures that the ID is added only if it's not already present, preventing duplicates.
//         bookmarks: firebase.firestore.FieldValue.arrayUnion(workoutDocID)
//     })
//         // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
//         .then(function () {
//             console.log("bookmark has been saved for" + workoutDocID);
//             let iconID = 'save-' + workoutDocID;
//             //console.log(iconID);
//             //this is to change the icon of the hike that was saved to "filled"
//             document.getElementById(iconID).innerText = 'bookmark';
//         });
// }

// saveBookmark()

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
// updateBookmark(docID)
displayCardsDynamically("workouts");  //input param is the name of the collection