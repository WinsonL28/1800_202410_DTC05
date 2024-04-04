    function physicaltoggle() {
    $('#phys-input').removeClass("hidden");
    $('#phys-input').removeClass("hidden");
    $('#food-input').addClass("hidden");
    $('#phys-button').addClass("text-blue-600");
    console.log("physical toggled!")
}

function foodtoggle() {
    $('#food-input').removeClass("hidden");
    $('#phys-input').addClass("hidden");
    $('#food-button').addClass("text-blue-600");
    $('#phys-button').removeClass("text-blue-600");
    $('#phys-button').removeClass("border-b");
    console.log("food toggled!")
}

function setup (){
    $('#food-input').addClass("hidden");
    console.log("running setup!")

}
setup()