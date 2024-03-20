function writeUserData(userId, height, weight, gender) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    db.database().ref(userID).set({
        height: height,
        weight: weight,
        gender: gender
    });
}


function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //enter code here
    // how to retrieve info from front end
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userSchool = document.getElementById().value;     //get the value of the field with id="schoolInput"
    userCity = document.getElementById().value;       //get the value of the field with id="cityInput"

    console.log(userName, userSchool, userCity);
    //a) get user entered values
    // how to store info in back end
    currentUser.update({
        name: userName,
        school: userSchool,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    //b) update user's document in Firestore

    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}