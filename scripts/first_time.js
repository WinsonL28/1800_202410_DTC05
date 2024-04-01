

function writeUserData(uheight, uweight, ugender, ufirstName, ulastName) {
    var currentUser = db.collection("users").doc(user.uid);

    currentUser.set({
        wbookmarks: [],
        dbookmarks: [],
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
    var ufirst_Name = $("#first_name").val();      //get the value of the field with id="nameInput"
    var ulast_Name = $("#last_name").val();       //get the value of the field with id="nameInput"
    var uHeight = $("#height").val();        //get the value of the field with id="nameInput"
    var uWeight = $("#weight").val();            //get the value of the field with id="nameInput"
    var uGender = $("#gender").val();        //get the value of the field with id="nameInput"

    //a) get user entered values
    // how to store info in back end
    console.log(ufirst_Name);
    console.log(ulast_Name);
    console.log(uHeight);
    console.log(uWeight);
    console.log(uGender);

    firebase.auth().onAuthStateChanged((user) => {


        // console.log(user.uid)
        db.collection("users").doc(user.uid).set({
            firstName: ufirst_Name,
            lastName: ulast_Name,
            height: uHeight,
            weight: uWeight,
            gender: uGender
        })

            .then(
            location.href = "main.html"
        )
    })
}


function populateUserInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        db.collection("users").doc(user.uid).get()
            .then(userDoc => {
                let ufirst_Name = userDoc.data().firstName
                let ulast_Name = userDoc.data().lastName
                let uHeight = userDoc.data().height
                let uWeight = userDoc.data().weight
                let uGender = userDoc.data().gender

                if (ufirst_Name != null) {
                    $("#first_name").val(ufirst_Name);
                }
                if (ulast_Name != null) {
                    $("#last_name").val(ulast_Name);
                }
                if (uHeight != null) {
                    $("#height").val(uHeight);
                    $("#termsandcons").toggle();
                }
                if (uWeight != null) {
                    $("#weight").val(uWeight);
                }
                if (uGender != null) {
                    $("#gender").val(uGender);
                }
            })
    })
}
populateUserInfo()