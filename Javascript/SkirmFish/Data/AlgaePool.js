/* AlgaePool is an object pool for the
   Algae object
*/

AlgaePool.prototype = new GameObject();

AlgaePool.prototype.constructor = AlgaePool;

function AlgaePool(y) {
    this.pool = [];
    this.pool.length = 20;
    
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i] = new Algae((Math.round((Math.random() * 600) + 200)),y);
    }
        
}

AlgaePool.prototype.update = function() {
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i].update();
    }
}

AlgaePool.prototype.draw = function(context) {
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i].draw(context);
    }
}

AlgaePool.prototype.reset = function() {
    for(i = 0; i < this.pool.length; i++) {
        this.pool[i].changeState("Deactivate");
    }
}