/*  
    GameProper is a child object of the GameObject.
    This is mostly a wrapper object that has all
    of the necessary objects for the game to run.
*/

GameProper.prototype = new GameObject();

GameProper.prototype.constructor = GameProper;

function GameProper() {
    //Create new players
    this.player1 = new Player(1);
    this.player2 = new Player(2);
    
    //Create the lanes
    this.lane1 = new Lane(1);
    this.lane2 = new Lane(2);
    this.lane3 = new Lane(3);
    
    //Create the background
    this.battleBG = new Sprite("Data/Art/Background.jpg");
    
    //Create the damage multiplier
    this.multiplier = [[1,0.5,2],[2,1,0.5],[0.5,2,1]];
    
    //Set the damage multiplier to the lanes
    this.lane1.multiplier = this.multiplier;
    this.lane2.multiplier = this.multiplier;
    this.lane3.multiplier = this.multiplier;
    
    //Set the players to the lane
    this.lane1.player1 = this.player1;
    this.lane1.player2 = this.player2;
    this.lane2.player1 = this.player1;
    this.lane2.player2 = this.player2;
    this.lane3.player1 = this.player1;
    this.lane3.player2 = this.player2;
    
    //Particle pool
    this.bubblePool = new BubblePool(10);
    
    //Winner of the match
    this.winner = "";
    
    this.isClosed = false;
    
    this.countdownState = new State(this,"Countdown");
    this.countdownState.delay = 6000;
    this.countdownState.update = function() {
        if(this.delay <= 0) {
            this.owner.changeState("Proper");
        }
        else {
            this.delay -= 16;
        }
        
    }
    this.countdownState.draw = function(context) {
        this.owner.battleBG.draw(context,0,0,1000,600,1000,600);
        context.font = "100px gameFont";
        context.fillStyle = "rgb(77,175,124)";
        if(this.delay >= 1000) {
            context.fillText("" + Math.floor(this.delay / 1000),450,300);
        }
        else {
            context.fillText("Go!",400,300);
        }
    }
    this.countdownState.close = function() {
        this.delay = 6000;
    }
    this.countdownState.eventHandler = function(event) {
        
    }
    
    this.state = this.countdownState;
    
    this.properState = new State(this,"Proper");
    this.properState.update = function() {
        this.owner.bubblePool.update();
        this.owner.player1.update();
        this.owner.player2.update();
        this.owner.lane1.update();
        this.owner.lane2.update();
        this.owner.lane3.update();
        this.owner.checkPlayers();
    }
    this.properState.draw = function(context) {
        this.owner.battleBG.draw(context,0,0,1000,600,1000,600);
        this.owner.bubblePool.draw(context);
        this.owner.player1.draw(context);
        this.owner.player2.draw(context);
        this.owner.lane1.draw(context);
        this.owner.lane2.draw(context);
        this.owner.lane3.draw(context);
    }
    this.properState.close = function() {
        this.owner.bubblePool.reset();
        this.owner.player1.reset();
        this.owner.player2.reset();
        this.owner.lane1.reset();
        this.owner.lane2.reset();
        this.owner.lane3.reset();
    }
    this.properState.eventHandler = function(event) {
        switch(event.keyCode) {
            //Player 1 controls
            case 81:
            case 113: this.owner.player1.fishInput = "Snapper";break;
            case 87:
            case 119: this.owner.player1.fishInput = "Lobster";break;
            case 69:
            case 101: this.owner.player1.fishInput = "Cuttlefish";break;
            case 49: this.owner.player1.laneInput = 1;break;
            case 50: this.owner.player1.laneInput = 2;break;
            case 51: this.owner.player1.laneInput = 3;break;
            
            //Player 2 controls
            case 73:
            case 105: this.owner.player2.fishInput = "Snapper";break;
            case 79:
            case 111: this.owner.player2.fishInput = "Lobster";break;
            case 80:
            case 112: this.owner.player2.fishInput = "Cuttlefish";break;
            case 56: this.owner.player2.laneInput = 1;break;
            case 57: this.owner.player2.laneInput = 2;break;
            case 48: this.owner.player2.laneInput = 3;break;
        }
    
        /*
            Check whether player 1 has selected the type of fish to summon
            and the lane where to place the fish
        */
        if(this.owner.player1.laneInput > 0 && this.owner.player1.fishInput != "") {
            this.owner.processInput(this.owner.player1);
        }
    
    
        /*
            Check whether player 2 has selected the type of fish to summon
            and the lane where to place the fish
        */
        if(this.owner.player2.laneInput > 0 && this.owner.player2.fishInput != "") {
            this.owner.processInput(this.owner.player2);
        }
    }
    
    this.finishState = new State(this,"Finish");
    this.finishState.draw = function(context) {
        context.fillStyle = "black";
        context.globalAlpha = "0.25";
        context.fillRect(0,0,1000,600);
        context.globalAlpha = "1";
        context.font = "60px gameFont";
        context.fillStyle = "rgb(77,175,124)";
        context.fillText(this.owner.winner + " is the Winner!",130,300);
        context.font = "30px gameFont";
        context.fillStyle = "white";
        context.fillText("[Enter] Back to Main Menu",100,450);
        context.fillText("[R] Rematch",650,450);
    }
    this.finishState.close = function() {
        this.owner.winner = "";
    }
    this.finishState.eventHandler = function(event) {
        switch(event.keyCode) {
                case 114:
                case 82: this.owner.changeState("Countdown");break;
                case 13: this.owner.isClosed = true;break;
        }
    }
}

GameProper.prototype.update = function() {
   this.state.update();
}

GameProper.prototype.draw = function(context) {
    this.state.draw(context)
}

GameProper.prototype.checkPlayers = function() {
    if(this.player2.currHealthpoints <= 0) {
        this.winner = "Player 1";
        this.changeState("Finish");
    }
    else if(this.player1.currHealthpoints <= 0) {
        this.winner = "Player 2";
        this.changeState("Finish");
    }
    
}

GameProper.prototype.processInput = function(player) {
    switch(player.laneInput) {
            case 1: this.lane1.addFish(player.summonFish(player.fishInput));break;
            case 2: this.lane2.addFish(player.summonFish(player.fishInput));break;
            case 3: this.lane3.addFish(player.summonFish(player.fishInput));break;
    }
    player.fishInput = "";
    player.laneInput = 0;
}

GameProper.prototype.eventHandler = function(event) {
    this.state.eventHandler(event);
}

GameProper.prototype.changeState = function(state) {
    this.state.close();
    if(state instanceof State) {
        this.state = state;
    }
    else if(typeof(state) == "string") {
        switch(state) {
            case "Countdown" : this.state = this.countdownState;break;
            case "Proper" : this.state = this.properState;break;
            case "Finish" : this.state = this.finishState;break;
        }
    }
}

