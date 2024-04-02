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

    document.getElementById("profile-redirect").onclick = function () {
        location.href = "profile.html";
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

                console.log(ufirst_Name)
                console.log(ulast_Name)
                console.log(uHeight)
                console.log(uWeight)
                console.log(uGender)    

                if (ufirst_Name == null && ulast_Name == null && uHeight == null && uWeight == null && uGender == null) {

                    location.href = "profile.html"
                }
            })
    })
}
profile_redirect()