function SkirmFish(canvas) {
    GameObject.call(this,"");
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    
    //The Main Menu
    this.menuState = new State(this,"Menu");
    this.menuState.menu = new MainMenu();
    this.menuState.update = function() {
        if(this.menu.isClosed) {
            this.menu.isClosed = false;
            this.owner.changeState("Game");
        }
    }
    this.menuState.draw = function(context) {
        this.menu.draw(context);
    }
    this.menuState.close = function() {
        this.menu.index = 1;
    }
    this.menuState.eventHandler = function(event) {
        this.menu.eventHandler(event);
    }
    
    this.state = this.menuState;
    
    //The Game Proper
    this.gameState = new State(this,"Game");
    this.gameState.game = new GameProper();
    this.gameState.update = function() {
        this.game.update();
        if(this.game.isClosed) {
            this.owner.changeState("Menu");
        }
    }
    this.gameState.draw = function(context) {
        this.game.draw(context);
    }
    this.gameState.close = function() {
        this.game.isClosed = false;
        this.game.changeState("Countdown");
    }
    this.gameState.eventHandler = function(event) {
        this.game.eventHandler(event);
    }
}

SkirmFish.prototype = Object.create(GameObject.prototype);

SkirmFish.prototype.constructor = SkirmFish;

SkirmFish.prototype.update = function() {
    this.state.update();
}

SkirmFish.prototype.draw = function() {
    this.state.draw(this.context);
}

SkirmFish.prototype.changeState = function(state) {
    this.state.close();
    if(state instanceof State) {
        this.state = state;
    }
    else if(typeof(state) == "string") {
        switch(state) {
            case "Menu" : this.state = this.menuState;break;
            case "Game" : this.state = this.gameState;break;
        }
    }
}

SkirmFish.prototype.eventHandler = function(event) {
    this.state.eventHandler(event);
}


