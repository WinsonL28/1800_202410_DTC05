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

function writeDiets() {
    //define a variable for the collection you want to create in Firestore to populate data
    var dietRef = db.collection("diet_plans");

    dietRef.add({
        title: "Fast Breakfast",
        dietcode: "DPBR01",
        name: "Fruit Smoothie with Protein", //replace with your own city?
        details: "Low calorie, protein rich",
        calories: 370,

        recipe: [
            "1 cup frozen berries",
            "1/2 banana",
            "8 ounces of low - or fat - free milk",
            "1 scoop protein powder",
            "1 tbsp flax seeds"
        ],

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    dietRef.add({
        title: "Quick Lunch",
        dietcode: "DPLN01",
        name: "Chicken Salad", //replace with your own city?
        details: "Low calorie, protein rich",
        calories: 550,

        recipe: [
            "4 ounces shredded skinless roast chicken breast",
            "1/4 cup sliced red grapes",
            "1 tablespoon slivered almonds or nuts of choice",
            "1/4 cup chopped celery",
            "1 tablespoon mayonnaise",
            "1 tablespoon plain, unsweetened Greek yogurt"            
        ],

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    dietRef.add({
        title: "Lite Dinner",
        dietcode: "DPDN01",
        name: "Jambalaya", //replace with your own city?
        details: "Low calorie, protein rich, fibre rich",
        calories: 850,

        recipe: [
            "3/4 cup cooked brown rice",
            "1/2 cup corn",
            "2 ounces cooked sliced turkey sausage",
            "1/3 cup salsa",
            "1/4 cup black or pinto beans"
        ],

        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

}

// writeWorkouts()


function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("DietCardTemplate"); // Retrieve the HTML element with the ID "WorkCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "workouts"
        .then(allworkouts => {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allworkouts.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;       // get value of the "name" key
                var name = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var dietCode = doc.data().dietcode;    //get unique ID to each hike to be used for fetching right image
                var caloriecount = doc.data().calories;    //get unique ID to each hike to be used for fetching right image
                // var workoutLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
                console.log(doc)
                console.log(docID)


                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                // newcard.querySelector('.card-length').innerHTML = workoutLength + "min";
                newcard.querySelector('.card-name').innerHTML = name;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-cal').innerHTML = caloriecount + " calories";
                newcard.querySelector('.card-image').src = `./images/${dietCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "each_meal.html?docID=" + docID;
                // newcard.querySelector('i').id = "save-" + docID;
                // newcard.querySelector('i').onclick = () => updateBookmark(docID);// for Backend part

                // currentUser.get().then(userDoc => {
                //     //get the user name
                //     var bookmarks = userDoc.data().wbookmarks;
                //     if (bookmarks.includes(docID)) {
                //         document.getElementById('save-' + docID).innerText = 'bookmark';
                //     }
                // })

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

displayCardsDynamically("diet_plans");  //input param is the name of the collection


// function updateBookmark(workoutDocID) {
//     // currentUser.update({
//     //     // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
//     //     // This method ensures that the ID is added only if it's not already present, preventing duplicates.
//     //     bookmarks: firebase.firestore.FieldValue.arrayUnion(workoutDocID)})
//     currentUser.update({
//         // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
//         // This method ensures that the ID is added only if it's not already present, preventing duplicates.
//         wbookmarks: firebase.firestore.FieldValue.arrayUnion(workoutDocID)
//     })

//     currentUser.get().then(userDoc => {
//         let bookmarksNow = userDoc.data().wbookmarks;
//         console.log(bookmarksNow)

//         if (bookmarksNow.includes(workoutDocID)) {
//             console.log("this workoutDocID exists in the database, shuld be removed")
//             currentUser.update({
//                 wbookmarks: firebase.firestore.FieldValue.arrayRemove(workoutDocID)
//             })
//                 .then(function () {
//                     console.log("bookmark has been removed for" + workoutDocID);
//                     let iconID = 'save-' + workoutDocID;
//                     //console.log(iconID);
//                     //this is to change the icon of the hike that was saved to "filled"
//                     document.getElementById(iconID).innerText = 'bookmark_border';
//                 });
//         }
//         else {
//             console.log("this workoutDocID does not exist, needs to be addded")
//             currentUser.update({
//                 wbookmarks: firebase.firestore.FieldValue.arrayUnion(workoutDocID)
//             })
//                 .then(function () {
//                     console.log("bookmark has been saved for" + workoutDocID);
//                     let iconID = 'save-' + workoutDocID;
//                     //console.log(iconID);
//                     //this is to change the icon of the hike that was saved to "filled"
//                     document.getElementById(iconID).innerText = 'bookmark';

//                 });
//         }

//     })
// }
// updateBookmark(docID)
