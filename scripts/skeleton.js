//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
async function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   
            //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#bottom_navbar').load('./text/bottom_nav.html'));
            console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer_after_login.html'));
        } else {
            // No user is signed in.
            console.log($('#bottom_navbar').load('./text/bottom_nav.html'));
            console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
            // change back to footer_before_login.html after we implement firebase
            console.log($('#footerPlaceholder').load('./text/footer_after_login.html'));
        }
    });

}


async function setup() {
    await loadSkeleton();
}

setup()
