State.prototype = new GameObject();

State.prototype.constructor = State;

function State(owner,name) {
    this.owner = owner;
    this.name = name;
}

State.prototype.update = function() {
    //Create update state algorithm here
    //console.log("State pattern Update function");
}

State.prototype.draw = function() {
    //Create draw state algorithm here
    //console.log("State pattern Draw function");
}

State.prototype.close = function() {
    //Create close state algorithm here
    //console.log("State pattern Close function");
}