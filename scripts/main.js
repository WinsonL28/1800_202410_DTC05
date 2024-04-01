// testing function
function displayuserid() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid)
    })
}


function redirect() {
    document.getElementById("workout-redirect").onclick = function () {
        location.href = "each_workout.html";
    };

    document.getElementById("food-redirect").onclick = function () {
        location.href = "diet_recomendation.html";
    };

    // document.getElementById("physical_his-redirect").onclick = function () {
    //     location.href = "phys-history.html";
    // };

    // document.getElementById("diet-his-redirect").onclick = function () {
    //     location.href = "diet-history.html";
    // };
}
redirect();


function profile_redirect() {
    firebase.auth().onAuthStateChanged((user) => {
        db.collection("users").doc(user.uid).get()
            .then(userDoc => {
                let ufirst_Name = userDoc.data().firstName
                let ulast_Name = userDoc.data().lastName
                let uHeight = userDoc.data().height
                let uWeight = userDoc.data().weight
                let uGender = userDoc.data().gender

                if (ufirst_Name != null && ulast_Name != null && uHeight != null && uWeight != null && uGender != null) {

                    location.href = "first_time_login.html"
                }
            })
    })
}