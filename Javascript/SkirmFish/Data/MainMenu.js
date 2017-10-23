MainMenu.prototype = new GameObject();

MainMenu.prototype.constructor = MainMenu;

function MainMenu() {
    
    //Main State
    this.mainState = new State(this,"Main");
    this.mainState.logo = new Sprite("Data/Art/Logo.png");
    this.mainState.background = new Sprite("Data/Art/Menu.jpg");
    this.mainState.startSign = "Start";
    this.mainState.mechanicsSign = "Mechanics";
    this.mainState.controlsSign = "Controls";
    this.mainState.logoLocation = new Vector(250,0);
    this.mainState.startLocation = new Vector(350,400);
    this.mainState.mechanicsLocation = new Vector(350,450);
    this.mainState.controlsLocation = new Vector(350,500);
    this.mainState.arrow = new Sprite("Data/Art/BubbleArrow.png");
    this.mainState.arrowLocation = this.mainState.startLocation;
    this.mainState.index = 1;
    this.mainState.draw = function(context) {
        this.background.draw(context,0,0,1000,600,1000,600);
        context.font = "50px gameFont";
        context.fillStyle = "rgb(0,106,99)";
        this.logo.draw(context,this.logoLocation.x,this.logoLocation.y,450,300,450,300);
        context.fillText("[1] " + this.startSign,this.startLocation.x,this.startLocation.y);
        context.fillText("[2] " + this.mechanicsSign,this.mechanicsLocation.x,this.mechanicsLocation.y);
        context.fillText("[3] " + this.controlsSign,this.controlsLocation.x,this.controlsLocation.y);
        context.font = "20px gameFont";
        context.fillText("Programming by: Karl Frederick P. Unabia",10,580);
        context.fillText("Art by: Dyan Raisa L. Nieva",710,580);
        this.arrow.draw(context,this.arrowLocation.x - 50,this.arrowLocation.y - 30,25,25,25,25);
    }
    this.mainState.eventHandler = function(event) {
        switch (event.keyCode) {
            case 49: this.arrowLocation = this.startLocation;this.index = 1;break;
            case 50: this.arrowLocation = this.mechanicsLocation;this.index = 2;break;
            case 51: this.arrowLocation = this.controlsLocation;this.index = 3;break;
            case 13: if(this.index == 1) this.owner.isClosed = true;
                     else if(this.index == 2) this.owner.changeState("Mechanics");
                     else if (this.index == 3) this.owner.changeState("Controls");
                     break; 
        }
    }

    this.state = this.mainState;
    
    this.mechanicsState = new State(this,"Mechanics");
    this.mechanicsState.page = new Sprite("Data/Art/Mechanics.jpg");
    this.mechanicsState.draw = function(context) {
        this.page.draw(context,0,0,1000,600,1000,600);
        context.font = "20px gameFont";
        context.fillStyle = "rgb(0,106,99)";
        context.fillText("[ENTER] Back to Main Menu",110,570);        
    }
    this.mechanicsState.eventHandler = function(event) {
        switch (event.keyCode) {
                case 13: this.owner.changeState("Main");break;
        }
    }
    
    this.controlsState = new State(this,"Controls");
    this.controlsState.page = new Sprite("Data/Art/Controls.jpg");
    this.controlsState.draw = function(context) {
        this.page.draw(context,0,0,1000,600,1000,600);
        context.font = "20px gameFont";
        context.fillStyle = "rgb(0,106,99)";
        context.fillText("[ENTER] Back to Main Menu",110,570);
    }
    this.controlsState.eventHandler = function(event) {
        switch (event.keyCode) {
                case 13: this.owner.changeState("Main");break;
        }
    }
    
    
    this.isClosed = false;
}

MainMenu.prototype.draw = function(context) {
    this.state.draw(context);
}

MainMenu.prototype.eventHandler = function(event) {
    this.state.eventHandler(event);    
}

MainMenu.prototype.changeState = function(state) {
    this.state.close();
    if(state instanceof State) {
        this.state = state;
    }
    else if(typeof(state) == "string") {
        switch(state) {
            case "Main" : this.state = this.mainState;break;
            case "Mechanics" : this.state = this.mechanicsState;break;
            case "Controls" : this.state = this.controlsState;break;
        }
    }
}