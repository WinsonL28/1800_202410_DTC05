
// testing function
function displayuserid() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid)
    })
}


function redirect() {
    document.getElementById("workout-redirect").onclick = function () {
        location.href = "workouts.html";
    };

    document.getElementById("food-redirect").onclick = function () {
        location.href = "diet_recomendation.html";
    };

    // document.getElementById("profile-redirect").onclick = function () {
    //     location.href = "profile.html";
    // };


    // document.getElementById("physical_his-redirect").onclick = function () {
    //     location.href = "phys-history.html";
    // };

    // document.getElementById("diet-his-redirect").onclick = function () {
    //     location.href = "diet-history.html";
    // };
}



function profile_redirect() {
    firebase.auth().onAuthStateChanged((user) => {
        db.collection("users").doc(user.uid).get()
            .then(userDoc => {
                ufirst_Name = userDoc.data().firstName
                ulast_Name = userDoc.data().lastName
                uHeight = userDoc.data().height
                uWeight = userDoc.data().weight
                uGender = userDoc.data().gender

                console.log(ufirst_Name)
                console.log(ulast_Name)
                console.log(uHeight)
                console.log(uWeight)
                console.log(uGender)
            })
            .then(function () {
                if (ufirst_Name == null && ulast_Name == null && uHeight == null && uWeight == null && uGender == null) {
                    console.log("want to redirect")
                    location.href = "profile.html"
                }
            })

    })
}


function setup() {
    displayuserid()
    redirect()
    profile_redirect()
}

setup()