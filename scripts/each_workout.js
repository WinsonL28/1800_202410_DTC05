function displayWorkoutInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);
    console.log("hello");

    // doublecheck: is your collection called "Reviews" or "reviews"?
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
            let woExcercises1 = thisworkout.excercises
            // console.log(woExcercises1)
            


            

            // only populate title, and image
            document.getElementById("workoutName").innerHTML = workoutTitle;
            document.getElementById("workoutDetails").innerHTML = workoutDetails;
            document.getElementById("length").innerHTML = workoutLength + " min";
            document.getElementById("excercises").innerHTML = woExcercises1;
            let imgEvent = document.querySelector(".workout-img");
            imgEvent.src = "../images/" + workoutCode + ".jpg";
        });
    
    // console.log(currentUser);
    
}
displayWorkoutInfo();

// function saveHikeDocumentIDAndRedirect() {
//     let params = new URL(window.location.href) //get the url from the search bar
//     let ID = params.searchParams.get("docID");
//     localStorage.setItem('hikeDocID', ID);
//     window.location.href = 'review.html';
// }

// function populateReviews() {
//     // console.log("test");
//     let DetailsTemplate = document.getElementById("DetailsTemplate");
//     // let hikeCardGroup = document.getElementById("reviewCardGroup");

//     let params = new URL(window.location.href); // Get the URL from the search bar
//     let workoutID = params.searchParams.get("docID");
//     console.log(workoutID)


//     // Double-check: is your collection called "Reviews" or "reviews"?
//     db.collection("workouts")
//         // .where("workoutID", "==", hikeID)
//         .doc(workoutID)
//         .get()
//         .then((allReviews) => {
//             // reviews = allReviews.docs;
//             console.log(reviews);
//             reviews.forEach((doc) => {
//                 var title = doc.data().title;
//                 var level = doc.data().level;
//                 var season = doc.data().season;
//                 var description = doc.data().description;
//                 var flooded = doc.data().flooded;
//                 var scrambled = doc.data().scrambled;
//                 var time = doc.data().timestamp.toDate();
//                 var rating = doc.data().rating; // Get the rating value
//                 console.log(rating)

//                 console.log(time);

//                 let reviewCard = hikeCardTemplate.content.cloneNode(true);
//                 reviewCard.querySelector(".title").innerHTML = title;
//                 reviewCard.querySelector(".time").innerHTML = new Date(
//                     time
//                 ).toLocaleString();
//                 reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
//                 reviewCard.querySelector(".season").innerHTML = `Season: ${season}`;
//                 reviewCard.querySelector(".scrambled").innerHTML = `Scrambled: ${scrambled}`;
//                 reviewCard.querySelector(".flooded").innerHTML = `Flooded: ${flooded}`;
//                 reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;

//                 // Populate the star rating based on the rating value

//                 // Initialize an empty string to store the star rating HTML
//                 let starRating = "";
//                 // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
//                 for (let i = 0; i < rating; i++) {
//                     starRating += '<span class="material-icons">star</span>';
//                 }
//                 // After the first loop, this second loop runs from i=rating to i<5.
//                 for (let i = rating; i < 5; i++) {
//                     starRating += '<span class="material-icons">star_outline</span>';
//                 }
//                 reviewCard.querySelector(".star-rating").innerHTML = starRating;

//                 hikeCardGroup.appendChild(reviewCard);
//             });
//         });
// }

// populateReviews();