//---------------------------------
// Your own functions here
//---------------------------------

function sayHello() {
	//do something
}
//sayHello();    //invoke function

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			// Sign-out successful.
			console.log("logging out user");
			location.href = "index.html"
		})
		.catch((error) => {
			// An error happened.
		});
}


