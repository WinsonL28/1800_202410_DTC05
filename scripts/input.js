function physicaltoggle() {
    $('#phys-input').toggle(true);
    $('#food-input').toggle(false);
    $('#phys-input').addClass("text-blue-600");
    $('#food-input').removeClass("text-blue-600");
}

function foodtoggle() {
    $('#phys-input').toggle(false);
    $('#food-input').toggle(true);
    $('#food-input').addClass("text-blue-600");
    $('#phys-input').removeClass("text-blue-600");
}

function foodSubmit() {
    alert("Sucessful!")
    location.href = "main.html"
}

function physicalSubmit() {

}

function setup() {
    $('#food-input').toggle(false);
    
}
setup();

function return_current_date(){
    const date = new Date();
    return 
}