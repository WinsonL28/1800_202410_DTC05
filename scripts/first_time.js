
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

function saveUserInfo(user) {
    //enter code here
    // how to retrieve info from front end
    first_Name = document.getElementById('first_name').value;      //get the value of the field with id="nameInput"
    last_Name = document.getElementById('last_name').value;       //get the value of the field with id="nameInput"
    uHeight = document.getElementById('height').value;          //get the value of the field with id="nameInput"
    uWeight = document.getElementById('weight').value;          //get the value of the field with id="nameInput"
    uGender = document.getElementById('gender').value;          //get the value of the field with id="nameInput"

    //a) get user entered values
    // how to store info in back end

    console.log(user.uid)
    db.collection("users").doc(user.uid).set({
        firstName: first_Name,
        lastName: last_Name,
        height: uHeight,
        weight: uWeight,
        gender: uGender
    })
        .then(() => {
            console.log("Document successfully updated!");

        })
    //b) update user's document in Firestore

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
    window.location.assign("main.html");

}
firebase.auth().onAuthStateChanged((user) => {
    saveUserInfo(user);
})
