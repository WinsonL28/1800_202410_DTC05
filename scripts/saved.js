async function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection('users').doc(user.uid);
            console.log(currentUser)
            insertNameFromFirestore(user);
            getBookmarks(user)
        } else {
            console.log("No user is signed in");
        }
    });
}
doAll();


async function insertNameFromFirestore(user) {
    db.collection("users").doc(user.uid).get().then(userDoc => {

        // console.log(currentUser)

        userName = userDoc.data().firstName;
        console.log(userName)
        document.getElementById("name-goes-here").innerHTML = userName + "'s";
    })

}

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks) 
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

            // Get the Array of bookmarks
            var wbookmarks = userDoc.data().wbookmarks;
            // var dbookmarks = userDoc.data().dbookmarks;
            console.log(wbookmarks);

            // Get pointer the new card template
            let newcardTemplate = document.getElementById("savedCardTemplate");

            // Iterate through the ARRAY of bookmarked hikes (document ID's)
            wbookmarks.forEach(workoutID => {
                console.log(workoutID);
                db.collection("workouts").doc(workoutID).get().then(doc => {
                    let title = doc.data().title;
                    console.log(title) // get value of the "name" key
                    var workoutCode = doc.data().workoutcode; //get unique ID to each hike to be used for fetching right image
                    var workoutLength = doc.data().length; //gets the length field
                    var docID = doc.id;  //this is the autogenerated ID of the document

                    //clone the new card
                    let newcard = newcardTemplate.content.cloneNode(true);

                    //update title and some pertinant information
                    newcard.querySelector('.card-title').innerHTML = title;
                    // newcard.querySelector('.card-length').innerHTML = workoutLength + "min";
                    newcard.querySelector('.card-image').src = `./images/${workoutCode}.jpg`; //Example: NV01.jpg
                    newcard.querySelector('a').href = "each_workout.html?docID=" + docID;
                    newcard.querySelector('i').id = "save-" + docID;
                    newcard.querySelector('i').onclick = () => updateBookmark(docID);
                    //NEW LINE: update to display length, duration, last updated

                    newcard.querySelector('.card-length').innerHTML =
                        "Length: " + workoutLength + " min <br>"

                    currentUser.get().then(userDoc => {
                        //get the user name
                        var bookmarks = userDoc.data().wbookmarks;
                        if (bookmarks.includes(docID)) {
                            document.getElementById('save-' + docID).innerText = 'bookmark';
                        }
                    })
                    //Finally, attach this new card to the gallery
                    workoutCard.appendChild(newcard);
                })
            });
        })

    db.collection("users").doc(user.uid).get()
        .then(userDoc => {

            var dbookmarks = userDoc.data().dbookmarks
            console.log(dbookmarks)
            let recipecardtemplate = document.getElementById("RecipeCardTemplate");

            dbookmarks.forEach(recipeID =>{
                console.log(recipeID)
                db.collection("diet_plans").doc(recipeID).get().then(doc =>{
                    thisrecipe = doc.data();
                    recipeCal = thisrecipe.calories;
                    recipeDetails = thisrecipe.details;
                    recipeTitle = thisrecipe.title;
                    recipeName = thisrecipe.name;
                    recipeCode = thisrecipe.dietcode;
                    var docID = doc.id;


                    let recipecard = recipecardtemplate.content.cloneNode(true);

                    recipecard.querySelector('.card-title').innerHTML = recipeTitle;
                    // newcard.querySelector('.card-length').innerHTML = workoutLength + "min";
                    recipecard.querySelector('.card-name').innerHTML = recipeName;
                    recipecard.querySelector('.card-text').innerHTML = recipeDetails;
                    recipecard.querySelector('.card-cal').innerHTML = recipeCal + " calories";
                    recipecard.querySelector('.card-image').src = `./images/${recipeCode}.jpg`; //Example: NV01.jpg
                    recipecard.querySelector('a').href = "each_meal.html?docID=" + docID;
                    
                    recipeCard.appendChild(recipecard)


                } )
            })
            

        })

    
}


async function updateBookmark(workoutDocID) {

    currentUser.update({

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

                    document.getElementById(iconID).innerText = 'bookmark';

                });
        }

    })
}

function updateBookmarkrecipe(recipeDocID) {

    currentUser.update({

        dbookmarks: firebase.firestore.FieldValue.arrayUnion(recipeDocID)
    })

    currentUser.get().then(userDoc => {
        let bookmarksNow = userDoc.data().dbookmarks;
        console.log(bookmarksNow)

        if (bookmarksNow.includes(recipeDocID)) {
            console.log("this workoutDocID exists in the database, shuld be removed")
            currentUser.update({
                dbookmarks: firebase.firestore.FieldValue.arrayRemove(recipeDocID)
            })
                .then(function () {
                    console.log("bookmark has been removed for" + recipeDocID);
                    let iconID = 'save-' + recipeDocID;

                    document.getElementById(iconID).innerText = 'bookmark_border';
                });
        }
        else {
            console.log("this workoutDocID does not exist, needs to be addded")
            currentUser.update({
                dbookmarks: firebase.firestore.FieldValue.arrayUnion(recipeDocID)
            })
                .then(function () {
                    console.log("bookmark has been saved for" + recipeDocID);
                    let iconID = 'save-' + recipeDocID;
                    //console.log(iconID);

                    document.getElementById(iconID).innerText = 'bookmark';

                });
        }

    })
}