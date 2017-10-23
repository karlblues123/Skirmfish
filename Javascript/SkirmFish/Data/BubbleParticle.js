BubbleParticle.prototype = new GameObject();

BubbleParticle.prototype.constructor = BubbleParticle;

function BubbleParticle() {
    this.location = new Vector(Math.random() * 900 + 1,600);
    this.velocity = new Vector(0,-(Math.random() + 0.5));
    this.acceleration = new Vector(Math.random() * 0.05 + 0.01,0);
    this.bubbleSprite = new Sprite("Data/Art/Bubble_Particle.png");
    
    //Set the right movement of the bubble
    this.acceleratingState = new State(this);
    this.acceleratingState.name = "Accelerating";
    this.acceleratingState.update = function() {
        this.owner.location.add(this.owner.velocity);
        this.owner.velocity.add(this.owner.acceleration);
        if(this.owner.location.y <= 0) {
            this.owner.location.y = 600;
            this.owner.location.x = Math.random() * 900 + 1;
        }
         if(this.owner.velocity.magnitude() > 3)
            this.owner.changeState("Deccelerating");
    }
    this.acceleratingState.close = function() {
        this.owner.velocity.limit(5);
    }
    
    //Set the default state to the right movement
    this.state = this.acceleratingState;
    
    //Set the left movement of the bubble
    this.decceleratingState = new State(this);
    this.decceleratingState.name = "Deccelerating";
    this.decceleratingState.update = function() {
        this.owner.location.add(this.owner.velocity);
        this.owner.velocity.subtract(this.owner.acceleration);
        if(this.owner.location.y <= 0) {
            this.owner.location.y = 600;
            this.owner.location.x = Math.random() * 900 + 1;
        }
        if(this.owner.velocity.magnitude() > 3)
            this.owner.changeState("Accelerating");
    }
    this.decceleratingState.close = function() {
        this.owner.velocity.limit(5);
    }
}

BubbleParticle.prototype.update = function() {
    this.state.update();
}

BubbleParticle.prototype.draw = function(context) {
    this.bubbleSprite.draw(context,this.location.x,this.location.y,10,10,10,10);
}

BubbleParticle.prototype.changeState = function(state) {
    this.state.close();
    if(state instanceof State) {
        this.state = state;
    }
    else if(typeof(state) == "string") {
        switch(state) {
                case "Accelerating": this.state = this.acceleratingState;break;
                case "Deccelerating": this.state = this.decceleratingState;break;
        }
    }
}