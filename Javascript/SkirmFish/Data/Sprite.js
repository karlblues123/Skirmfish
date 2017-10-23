/*  Sprite object is a child object of the GameObject object.
    Its purpose is to show an image given a set of coordinates.
*/

Sprite.prototype = new GameObject();

Sprite.prototype.constructor = Sprite;

function Sprite(source) {
    if(typeof(source) == "string") {
        this.image = new Image(); 
        this.image.src = source;
    }
    else if(source instanceof Image) {
        this.image = source;
    }
}

Sprite.prototype.draw = function(context,x,y,cw,ch,w,h) {
    context.drawImage(this.image,0,0,cw,ch,x,y,w,h);
    /*  x - x-coordinate
        y - y-coordinate
    */
}