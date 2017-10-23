/*  GameObject is the base object for objects that contains the
    update and draw methods.
    Its purpose is to be a template for other objects.
*/

function GameObject() {
}

GameObject.prototype.update = function() {
    //Create update algorithm here.
    console.log("Update function");
}

GameObject.prototype.draw = function(context) {
    //Create draw algorithm here.
    console.log("Draw function");
}