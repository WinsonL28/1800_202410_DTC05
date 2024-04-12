function physicaltoggle() {
    $('#phys-input').toggle(true);
    $('#food-input').toggle(false);
}

function foodtoggle() {
    $('#phys-input').toggle(false);
    $('#food-input').toggle(true);
}


function foodSubmit() {
    firebase.auth().onAuthStateChanged((user) => {
        var currentdb = db.collection("users").doc(user.uid).collection("food-input");
        console.log("running");

        var uFoodName = $("#food_name").val();
        var uDate = $("#date-picker").val();
        var uCalories = $("#calories").val();
        var uFats = $("#fats").val();
        var uCarbs = $("#carbs").val();
        var uProteins = $("#proteins").val();

        currentdb.add({
            foodIntake: [
                uFoodName,
                uDate,
                uCalories,
                uFats,
                uCarbs,
                uProteins
            ]
        })
            .then(function () {
                location.href = "main.html"
            })
    })
}

function physicalSubmit() {
    firebase.auth().onAuthStateChanged((user) => {
        var currentdb = db.collection("users").doc(user.uid).collection("phys-input");
        console.log("running");
        var uExercise = $("#exercise-name").val();
        var uDate = $("#date-picker").val();
        var uIntensity = $("#intensity").val();
        var uStartTime = $("#start-time").val();
        var uEndTime = $("#end-time").val();

        currentdb.add({
            physData: [
                uExercise,
                uDate,
                uIntensity,
                uStartTime,
                uEndTime
            ]
        })
            .then(function () {
                location.href = "main.html"
            })
    })
}


function setup() {
    $('#food-input').toggle(false);

}
setup();