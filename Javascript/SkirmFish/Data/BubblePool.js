BubblePool.prototype = new GameObject();

BubblePool.prototype.constructor = BubblePool;

function BubblePool(n) {
    this.pool = [];
    this.pool.length = n;
    
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i] = new BubbleParticle();
    }
}

BubblePool.prototype.update = function() {
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i].update();
    }
}

BubblePool.prototype.draw = function(context) {
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i].draw(context);
    }
}

BubblePool.prototype.reset = function() {
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i].location.y = 600;
        this.pool[i].changeState("Accelerating");
    }
}