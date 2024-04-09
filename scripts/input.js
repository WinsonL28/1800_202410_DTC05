function physicaltoggle() {
    $('#phys-input').toggle(true);
    $('#food-input').toggle(false);
}

function foodtoggle() {
    $('#phys-input').toggle(false);
    $('#food-input').toggle(true);
}

var foodcounter;
var physcounter; 

function foodSubmit() {
    firebase.auth().onAuthStateChanged((user) => {
        var currentdb = db.collection("food-input").doc(user.uid);
        foodcounter = currentdb.count();
        
        var ufood_name = $("#food-input").val();
        var ucalories = $("#calories").val();
        var ufats = $("#fats").val();
        var ucarbs = $("#carbs").val();
        var uproteins = $("#proteins").val();
        var udate = $("#date-picker").val();

        currentdb.add({
            foodcounter:[
                udate,
                ufood_name,
                ucalories,
                ufats,
                ucarbs,
                uproteins
            ]
        })
            .then(function () {
                location.href = "main.html"
            })
    })
}

function physicalSubmit() {
    firebase.auth().onAuthStateChanged((user) => {
        var currentdb = db.collection("food-input").doc(user.uid);

        var ufood_name = $("#food-input").val();
        var ucalories = $("#calories").val();
        var ufats = $("#fats").val();
        var ucarbs = $("#carbs").val();
        var uproteins = $("#proteins").val();
        var udate = $("#date-picker").val();
        currentdb.set({
            food_name: ufood_name,
            calories: ucalories,
            fats: ufats,
            carbs: ucarbs,
            proteins: uproteins
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