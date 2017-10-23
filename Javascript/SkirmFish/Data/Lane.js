/*
    The lane object abstracts a lane of the game.
    Both players' fish go here to do battle. Algae
    also spawn in a lane. Up to 20 algae can be
    spawned by a lane
*/

Lane.prototype = new GameObject();

Lane.prototype.constructor = Lane;

function Lane(index) {
    //Set the starting locations of the fishes depending on the lane index
    switch(index) {
            case 1: this.leftLocation = new Vector(100,100);
                    this.rightLocation = new Vector(800,100);
                    break;
            case 2: this.leftLocation = new Vector(100,300);
                    this.rightLocation = new Vector(800,300);
                    break;
            case 3: this.leftLocation = new Vector(100,500);
                    this.rightLocation = new Vector(800,500);
                    break;
            default: this.leftLocation = new Vector(0,0);
                     this.rightLocation = new Vector(1000,0);
                     console.log("No index was given");
                     break;
    }
    
    //Set a reference to the damage multipliers
    this.multiplier = null;
    
    //Set a reference to the players
    this.player1 = null;
    this.player2 = null;
    
    //Create an empty array to contain the fish objects
    this.fishes = [];
    
    //Create the algae pool objects
    this.algaePool = new AlgaePool(this.leftLocation.y);
}

Lane.prototype.update = function() {
    if(this.fishes.length > 0) {
         for(i = 0; i < this.fishes.length; i++) {
            if(this.fishes.length > 1) {
                for(j = 0; j < this.fishes.length; j++) {
                    //Check whether a fish has collided with an opposing fish
                    if(this.fishes[j].hitbox.isIntersects(this.fishes[i].hitbox) && this.fishes[j].index != this.fishes[i].index &&                                         this.fishes[i].state.name == "Moving" && this.fishes[j].state.name != "Defeated") {
                                this.fishes[i].changeState("Attack");
                                this.fishes[i].state.setOpponent(this.fishes[j]);
                                this.fishes[i].attackMultiplier = this.multiplier[this.getMultiplier(this.fishes[i].type)]                                                                                         [this.getMultiplier(this.fishes[j].type)];
                    }
                }
            }
            //Check whether a fish of player 1 has collided with player 2 
            if(this.fishes[i].index == 1) {
                if(this.fishes[i].hitbox.isIntersects(this.player2.hitbox) && this.fishes[i].state.name == "Moving") {
                    this.fishes[i].changeState("Attack");
                    this.fishes[i].state.setOpponent(this.player2);
                }
            }
            //Check whether a fish of player 2 has collided with player 1 
            if(this.fishes[i].index == 2) {
                if(this.fishes[i].hitbox.isIntersects(this.player1.hitbox) && this.fishes[i].state.name == "Moving") {
                    this.fishes[i].changeState("Attack");
                    this.fishes[i].state.setOpponent(this.player1);
                }
            } 
            this.fishes[i].update();
        }
         
    }
    this.checkFish();
    if(this.fishes.length > 1) {
        for(i = 0; i < this.algaePool.pool.length; i++) {
            for(j = 0; j < this.fishes.length; j++) {
                if(this.fishes[j].hitbox.isIntersects(this.algaePool.pool[i].hitbox) && this.algaePool.pool[i].state.name == "Active" &&                            this.fishes[j].state.name != "Defeated") {
                    this.fishes[j].giveAlgae(this.algaePool.pool[i]);
                    this.algaePool.pool[i].changeState("Deactivate");
                }
            }
        }      
    }
    this.algaePool.update();
    
}

Lane.prototype.draw = function(context) {
    this.algaePool.draw(context);
    if(this.fishes.length > 0)
        for(i = 0; i < this.fishes.length; i++) {
            this.fishes[i].draw(context);
        }
    
}

Lane.prototype.reset = function() {
    this.fishes = [];
    this.algaePool.reset();
}

Lane.prototype.addFish = function(fish) {
    if(fish != null) {
        if(fish.index == 1) {
            fish.location.x = this.leftLocation.x;
            fish.location.y = this.leftLocation.y;
        }
        else if(fish.index == 2) {
            fish.location.x = this.rightLocation.x;
            fish.location.y = this.rightLocation.y;
        }
        this.fishes.push(fish);
    }
}

Lane.prototype.checkFish = function() {
    if(this.fishes.length > 0) {
        for(i = 0; i < this.fishes.length; i++) {
            if(this.fishes[i].state.name == "Attacking") {
                if(this.fishes[i].state.opponent.currHealthpoints <= 0) {
                    this.fishes[i].changeState("Move");
                }
            }
            if(this.fishes[i].currHealthpoints <= 0 && this.fishes[i].state.name != "Defeated") {
                this.fishes[i].changeState("Defeat");
            }
            if(this.fishes[i].state.name == "Defeated") {
                if(this.fishes[i].state.sprite.index == 3 && this.fishes[i].state.sprite.currTicks == 150) {
                    this.fishes.splice(i,1);
                }
            }
        }
    }
}

Lane.prototype.getMultiplier = function(str) {
    if(str != null) {
        switch(str) {
            case "Snapper": return 0;break;
            case "Lobster": return 1;break;
            case "Cuttlefish": return 2;break;
        }
    }
}