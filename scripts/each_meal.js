function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().firstName;
                console.log(userName);

            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();

function displayRecipeInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    console.log(ID);
    console.log("hello");

    db.collection("diet_plans")
        .doc(ID)
        .get()
        .then(doc => {
            thisrecipe = doc.data();
            recipeCal = thisrecipe.calories;
            recipeDetails = thisrecipe.details;
            recipeTitle = thisrecipe.title;
            recipeName = thisrecipe.name;
            recipeCode = thisrecipe.dietcode;
 

            var docID = doc.id;

            var recipeitem0 = document.createElement("p");
            recipeitem0.textContent = thisrecipe.recipe[0]

            var recipeitem1 = document.createElement("p");
            recipeitem1.textContent = thisrecipe.recipe[1]
            var recipeitem2 = document.createElement("p");
            recipeitem2.textContent = thisrecipe.recipe[2]
            var recipeitem3 = document.createElement("p");
            recipeitem3.textContent = thisrecipe.recipe[3]
            var recipeitem4 = document.createElement("p")
            recipeitem4.textContent = thisrecipe.recipe[4]
            var recipeitem5 = document.createElement("p");
            recipeitem5.textContent = thisrecipe.recipe[5]


            // only populate title, and image
            document.getElementById("recipeTitle").innerHTML = recipeTitle;
            document.getElementById("RecipeDetails").innerHTML = recipeDetails;
            document.getElementById("RecipeName").innerHTML = recipeName;
            document.getElementById("Cal").innerHTML = recipeCal + " kcal";
            document.getElementById("recipeitems").appendChild(recipeitem0);
            document.getElementById("recipeitems").appendChild(recipeitem1);
            document.getElementById("recipeitems").appendChild(recipeitem2);
            document.getElementById("recipeitems").appendChild(recipeitem3);
            document.getElementById("recipeitems").appendChild(recipeitem4);
            document.getElementById("recipeitems").appendChild(recipeitem5);
            let imgEvent = document.querySelector(".recipe-img");
            imgEvent.src = "../images/" + recipeCode + ".jpg";


            document.querySelector('i').id = "save-" + docID;
            document.querySelector('i').onclick = () => updateBookmarkrecipe(docID);// for Backend part

            currentUser.get().then(userDoc => {
                //get the user name
                var bookmarks = userDoc.data().dbookmarks;
                if (bookmarks.includes(docID)) {
                    document.getElementById('save-' + docID).innerText = 'bookmark';
                }
                // var completedNow = userDoc.data().WorkoutHistory;
                // console.log(completedNow)
                // let complete = document.getElementById('completed');
                // if (completedNow.includes(docID)) {
                //     complete.innerHTML = "Mark as incomplete";
                // }
            })




        });

    // console.log(currentUser);

}
displayRecipeInfo();

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