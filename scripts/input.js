function toggleinputs() {
    console.log("working")
    document.querySelector('#physical-tag').addEventListener('onclick', physicaltoggle());
};
toggleinputs();

function physicaltoggle() {
    $('#physical-tag').toggle();
    $('#physical-input').toggle();
}

function foodtoggle() {
    $('#food-tag').toggle();
    $('#food-input').toggle();
}
