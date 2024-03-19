function writeUserData(userId, height, weight, gender) {
    firebase.database().ref('users/' + userId).set({
        height: height,
        weight: weight,
        gender: gender
    });
}


function setup() {


}


$("document").ready(setup);