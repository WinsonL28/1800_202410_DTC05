

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


function profile_redirect(){

}

// function setup(){
//     firebase.auth().onAuthStateChanged(user => {
//         if(user)
//     })
// }
// setup()

