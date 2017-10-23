/*
    Algae object is a game object that serves as the
    currency of the game. A fish can pickup an algae
    to be given to its owner
*/

Algae.prototype = new GameObject();

Algae.prototype.constructor = Algae;

function Algae(x,y) {
    //Vector properties
    this.location = new Vector(x,y);
    
    //Hitbox of an algae
    this.hitbox = new Hitbox(this,50,50);
    
    //Randomize the value of the algae when initializing
    this.value = Math.round(Math.random() * 5 + 1) * 10;
    
    /*
        Create the active state of the algae.
        Only when the algae is active can
        a fish pick it up
    */
    this.activeState = new State(this,"Active");
    //Animated sprite of the algae
    this.activeState.sprite =  new AnimatedSprite("Data/Art/Algae.png",this.hitbox.width,this.hitbox.height,4);
    this.activeState.update = function() {
        this.sprite.update();
    }
    this.activeState.draw = function(context) {
        this.sprite.draw(context,this.owner.location.x,this.owner.location.y,0,this.owner.hitbox.width,this.owner.hitbox.height);
    }
    this.activeState.close = function() {
        this.sprite.index = 0;
        this.sprite.currTicks = 0;
    }
    
    /*
        Create the inactive state of the fish.
        Inactive algae cannot be picked up
        by a fish.
    */
    this.inactiveState = new State(this,"Inactive");
    
    //Randomize the delay before an algae can become active again
    this.inactiveState.delay = Math.round(Math.random() * 6 + 1) * 100000;
    this.inactiveState.update = function() {
        if(this.delay <= 0)
            this.owner.changeState("Activate");
        else
            this.delay -= 100;
    }
    this.inactiveState.close = function() {
        //Randomize the next location the algae will become active
        this.owner.location.x = Math.round(Math.random() * 600 + 200);
        
        //Randomize the next value of the algae
        this.owner.value = Math.round(Math.random() * 5 + 1) * 10;
        
        //Randomize the next amount ot time the algae will stay inactive
        this.delay = Math.round(Math.random() * 6 + 1) * 100000;
    }
    
    //Set the current state to inactive state
    this.state = this.inactiveState;
}

Algae.prototype.update = function() {
    this.state.update();
}

Algae.prototype.draw = function(context) {
    this.state.draw(context);
}

Algae.prototype.changeState = function(state) {
    this.state.close();
    if(state instanceof State) {
        this.state = state;
    }
    else if(typeof(state) == "string") {
        switch(state) {
                case "Activate": this.state = this.activeState;break;
                case "Deactivate": this.state = this.inactiveState;break;
        }
    }
}