/*  
    Player object is a child object of the GameObject.
    It abstracts the players of the game. A player can
    summon 3 types of fishes that will do battle for him
    or her into a lane of his or her choosing. A player
    must be the opposing player via sending fishes to
    attack him or her. A player can regenerate Algae, the
    currency of the game needed to summon a unit. All types
    of fishes have the same cost to summon.
*/

Player.prototype = new GameObject();

Player.prototype.constructor = Player;

function Player(index) {
    //Index should be 1 for Player 1 or 2 for Player 2
    this.index = index;
    
    //Creates a specified vector to be used as the location for the player
    if(this.index == 1) {
        this.location = new Vector(0,0);
    }
    else if(this.index == 2) {
        this.location = new Vector(900,0);
    }
    
    //Player Sprite
    this.sprite = new Sprite("Data/Art/" + "Player" + this.index + ".png");
    
    //Healthbar Sprite
    this.healthSprite = new Sprite("Data/Art/Player_Healthbar.png");
    
    //Starting currency for the player
    this.algae = 250;
    
    //Health points for the player
    this.maxHealthpoints = 1500;
    this.currHealthpoints = 1500;
    
    //The cost for creating a fish
    this.cost = 50;
    
    //The hitbox of the player, containing the dimensions and collision detection function
    this.hitbox = new Hitbox(this,100,600);
    
    //Delay for generating Algae in milliseconds
    this.algaeDelay = 5000;
    
    //Player's input
    this.laneInput = 0;
    this.fishInput = "";
    
    //Visual indicators
    this.bubbleIndicator = new Sprite("Data/Art/Bubble.png");
    this.snapperIndicator = new AnimatedSprite("Data/Art/Snapper" + "" + this.index +".png",80,50,4);
    this.lobsterIndicator = new AnimatedSprite("Data/Art/Lobster" + "" + this.index +".png",80,50,4);
    this.cuttlefishIndicator = new AnimatedSprite("Data/Art/Cuttlefish" + "" + this.index +".png",80,50,4);
}

//Players will naturally generate the currency, Algae
Player.prototype.regenAlgae = function() {
    if(this.algaeDelay <= 0) {
        this.algae += 10;
        this.algaeDelay = 5000;
    }     
    else
        this.algaeDelay -= 100;
}

//Used to create a fish to be sent to the lane
Player.prototype.summonFish = function(type) {
    var newFish = null;
    if(this.algae >= this.cost) {
        newFish = new Fish(type,this);
        newFish.changeState("Move");
        this.algae -= this.cost;
    }
    return newFish;
}

Player.prototype.update = function() {
    this.regenAlgae();
    if(this.fishInput != "") {
        switch(this.fishInput) {
                case "Snapper": this.snapperIndicator.update();break;
                case "Lobster": this.lobsterIndicator.update();break;
                case "Cuttlefish": this.cuttlefishIndicator.update();break;
        }
    }
}

Player.prototype.draw = function(context) {
    this.sprite.draw(context,this.location.x,this.location.y,this.hitbox.width,this.hitbox.height,this.hitbox.width,this.hitbox.height);
    context.font = "40px gameFont";
    context.fillStyle = "rgb(77,175,124)";
    context.fillText("" + this.algae,this.location.x + 25,this.location.y + 40);
    this.healthSprite.draw(context,this.location.x,this.location.y,this.hitbox.width *                                                                                      (this.currHealthpoints/this.maxHealthpoints),10,this.hitbox.width * (this.currHealthpoints/this.maxHealthpoints),10);
    if(this.fishInput != "") {
        switch(this.fishInput) {
                case "Snapper": this.snapperIndicator.draw(context,this.location.x + 10,this.location.y + 250,0,80,50);break;
                case "Lobster": this.lobsterIndicator.draw(context,this.location.x + 10,this.location.y + 250,0,80,50);break;
                case "Cuttlefish": this.cuttlefishIndicator.draw(context,this.location.x + 10,this.location.y + 250,0,80,50);break;
        }
        this.bubbleIndicator.draw(context,this.location.x,this.location.y + 225,100,100,100,100);
    }
}

Player.prototype.reset = function() {
    this.currHealthpoints = this.maxHealthpoints;
    this.algae = 250;
    this.laneInput = 0;
    this.fishInput = "";
    this.algaeDelay = 5000;
}
