
function writeUserData(uheight, uweight, ugender, ufirstName, ulastName) {
    var currentUser = db.collection("users").doc(user.uid);

    currentUser.set({
        firstName: ufirstName,
        lastName: ulastName,
        height: uheight,
        weight: uweight,
        gender: ugender
    });
}


function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //enter code here
    // how to retrieve info from front end
    var first_Name = $("first_name").val();      //get the value of the field with id="nameInput"
    var last_Name = $("last_name").val();       //get the value of the field with id="nameInput"
    var uHeight = $("height").val();        //get the value of the field with id="nameInput"
    var uWeight = $("weight").val();            //get the value of the field with id="nameInput"
    var uGender = $("gender").val();        //get the value of the field with id="nameInput"

    //a) get user entered values
    // how to store info in back end
    console.log(first_Name);
    console.log(last_Name);
    console.log(uHeight);
    console.log(uWeight);
    console.log(uGender);
    firebase.auth().onAuthStateChanged((user) => {
        
        console.log(user.uid)
        db.collection("users").doc(user.uid).set({
            firstName: first_Name,
            lastName: last_Name,
            height: uHeight,
            weight: uWeight,
            gender: uGender
        })
    })
}

// testing function
function displayuserid() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid)
    })
}

// function redirect() {
//     document.getElementById("submithandler").onclick = function () {
//         saveUserInfo()
//             .then(() => {
//                 location.href = "main.html";
//             })
//     };
// }

function submithandler() {
    $("#submithandler").onclick = saveUserInfo();
}


function setup() {
    submithandler();
}
setup();
