/*
    The hitbox object is a child object
    the game object. It contains the
    dimensions of its owner as well as
    a function to check whether its owner
    has collided with another object.
*/


Hitbox.prototype = new GameObject();

Hitbox.prototype.constructor = Hitbox;

function Hitbox(owner,w,h) {
    this.owner = owner;
    this.location = owner.location;
    this.width = w;
    this.height = h;
}

Hitbox.prototype.isIntersects = function(hitbox) {
    return (hitbox.location.x + hitbox.width) > (this.location.x) && (hitbox.location.y + hitbox.height) > (this.location.y) 
    && (this.location.x + this.width) > (hitbox.location.x) && (this.location.y + this.height) > (hitbox.location.y);
}