/*  
    AnimatedSprite object is a child object of the Sprite object.
    Its purpose is to show an image that have animations given a
    set of coordinates.
*/
AnimatedSprite.prototype = new Sprite("");

AnimatedSprite.prototype.constructor = AnimatedSprite;

function AnimatedSprite(source,w,h,f){
    Sprite.call(this,source);
    
    //The dimensions of each frame
    this.width = w;
    this.height = h;
    
    //The number of frames the sprite has
    this.frames = f;
    
    //Indicates the current frame
    this.index = 0;
    
    //Maximum number of ticks per frame
    this.maxTick = 100;
    
    //Current number of ticks of the current frame
    this.currTicks = 0;
    
    //Number of added ticks per update cycle
    this.addedTicks = 10;
}

AnimatedSprite.prototype.update = function() {
    if(this.currTicks == this.maxTick) {
        this.index++;  
        this.currTicks = 0;
    }
    if(this.index == this.frames) {
            this.index = 0;
    }
    this.currTicks += this.addedTicks; 
}

AnimatedSprite.prototype.draw = function(context,x,y,i,w,h) {
    /*  
        x - x-coordinate
        y - y-coordinate
        i - row index (for sprite sheets that have multiple rows)
        w - width of the sprite
        h - height of the sprite
    */
    context.drawImage(this.image,this.index * this.width,i,this.width,this.height,x,y,w,h);    
}