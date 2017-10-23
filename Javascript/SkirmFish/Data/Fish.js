/*  
    Fish object is the object that represents the
    units of a player can summon in the field.
    There are three different types of fish units
    namely Snapper, Lobster, and Cuttlefish
    The fishes follow a rock-paper-scissor kind
    of relationship. Snappers represent Paper.
    Cuttlefishes represent Rock. Lobsters
    represent Scissors.
*/

Fish.prototype = new GameObject();

Fish.prototype.constructor = Fish;

function Fish(type,owner) {
    //Vector properties
    this.location = new Vector(0,0);
    this.speed = new Vector(1,0);
    
    //Hitbox of the fish
    this.hitbox = new Hitbox(this,80,50);
    
    //Type of fish (Snapper,Lobster,Cuttlefish)
    if(typeof(type) == "string") {
        this.type = type;
       
    }
    else if(type instanceof Image){
        if(type.src.indexOf("Lobster") != -1) {
            this.type = "Lobster";
        }
        else if(type.src.indexOf("Cuttlefish") != -1) {
            this.type = "Cuttlefish";
        }
        else if(type.src.indexOf("Snapper") != -1) {
            this.type = "Snapper";
        }
    }
    
    //Set the reference to the owner of the fish
    this.owner = owner;
    this.index = this.owner.index;
    
    //Set the healthpoints of the fish
    this.maxHealthpoints = 200;
    this.currHealthpoints = 200;

    //Set the damage of the fish;
    this.attackDamage = 20;
    this.attackMultiplier = 1;
    
    //Set the moving state of a fish
    this.movingState = new State(this,"Moving");
    
    //Create healthbar sprite
    this.healthSprite = new Sprite("Data/Art/Fish_Healthbar.png");
    
    //Set the animated sprite used in the moving state
    this.movingState.sprite = new AnimatedSprite("Data/Art/" + this.type + "" + this.index +".png",this.hitbox.width,this.hitbox.height,4);
    
    this.movingState.update = function() {
        if(this.owner.index == 1) {
            this.owner.location.add(this.owner.speed);
            this.owner.hitbox.location.add(this.owner.speed);
        }
        else if(this.owner.index == 2) {
            this.owner.location.subtract(this.owner.speed);
            this.owner.hitbox.location.subtract(this.owner.speed);
        }
        this.sprite.update();
        
    }
    this.movingState.draw = function(context) {
        this.sprite.draw(context,this.owner.location.x,this.owner.location.y,0,this.owner.hitbox.width,this.owner.hitbox.height);
        this.owner.healthSprite.draw(context,this.owner.location.x,this.owner.location.y + 60,this.owner.hitbox.width *                                                                       (this.owner.currHealthpoints/this.owner.maxHealthpoints),10,this.owner.hitbox.width *                                                              (this.owner.currHealthpoints/this.owner.maxHealthpoints),10);
    }
    this.movingState.close = function() {
        this.sprite.index = 0;
        this.sprite.currTicks = 0;
    }
    
    //Set the current state of the fish to moving state upon initialization
    this.state = this.movingState;
    
    //Set the attacking state of the fish
    this.attackingState = new State(this,"Attacking");
    
    //Set the animated sprite used in the attacking state
    this.attackingState.sprite = new AnimatedSprite("Data/Art/" + this.type + "" + this.index +                                                                                                       "_Attack.png",this.hitbox.width,this.hitbox.height,6);
    this.attackingState.sprite.maxTick = 50;
    
    //Set the opponent the fish will attack
    this.attackingState.opponent = null;
    this.attackingState.setOpponent = function(opp) {
        this.opponent = opp;
    }
    
    //Attack the opponent the fish has locked on
    this.attackingState.attackOpponent = function() {
        if(this.opponent != null) {
             this.opponent.currHealthpoints -= this.owner.attackDamage * this.owner.attackMultiplier;
             if(this.opponent.currHealthpoints < 0) {
                 this.opponent.currHealthpoints == 0;
             }  
        }
    }
    this.attackingState.update = function() {
        if(this.sprite.index == 3 && this.sprite.currTicks == 10) {
            this.attackOpponent();
        }
        this.sprite.update();
    }
    this.attackingState.draw = function(context) {
        this.sprite.draw(context,this.owner.location.x,this.owner.location.y,0,this.owner.hitbox.width,this.owner.hitbox.height);
        this.owner.healthSprite.draw(context,this.owner.location.x,this.owner.location.y + 60,this.owner.hitbox.width *                                                                       (this.owner.currHealthpoints/this.owner.maxHealthpoints),10,this.owner.hitbox.width *                                                              (this.owner.currHealthpoints/this.owner.maxHealthpoints),10);
    }
    this.attackingState.close = function() {
        this.sprite.index = 0;
        this.sprite.currTicks = 0;
        this.owner.attackMultiplier = 1;
        this.opponent = null;
    }
    
    //Set the defeated state of the fish
    this.defeatState = new State(this,"Defeated");
    this.defeatState.sprite = new AnimatedSprite("Data/Art/" + this.type + "" + this.index +                                                                                                      "_Defeat.png",this.hitbox.width,this.hitbox.height,4);
    this.defeatState.sprite.maxTick = 150;
    this.defeatState.update = function() {
        this.sprite.update();
    }
    this.defeatState.draw = function(context) {
        this.sprite.draw(context,this.owner.location.x,this.owner.location.y,0,this.sprite.width,this.sprite.height);
    }
    this.defeatState.close = function() {
        this.sprite.index = 0;
        this.sprite.currTicks = 0;
    }
}

Fish.prototype.update = function() {
    this.state.update();
}

Fish.prototype.draw = function(context) {
    this.state.draw(context);
}

Fish.prototype.changeState = function(state) {
    this.state.close();
    if(state instanceof State) {
        this.state = state;
    }
    else if(typeof(state) == "string") {
        switch(state) {
            case "Move" : this.state = this.movingState;break;
            case "Attack" : this.state = this.attackingState;break;
            case "Defeat" : this.state = this.defeatState;break;
        }
    }
}

//Give the collected algae to its owner
Fish.prototype.giveAlgae = function(algae) {
    this.owner.algae += algae.value;
}