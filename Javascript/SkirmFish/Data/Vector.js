/*  Vector object is the object that contains two
    numbers which can be either be an integer
    or a floating-point.
    Its purpose is to simply calculations using a set
    of two numbers.
*/
function Vector(x,y) {
    this.x = x;
    this.y = y;
    
    this.add = function(vector) {
        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
    }
    
    this.subtract = function(vector) {
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
    }
    
    this.multiply = function(number) {
        this.x = this.x * number;
        this.y = this.y * number;
    }
    
    this.divide = function(number) {
        this.x = this.x / number;
        this.y = this.y / number;
    }
    
    this.magnitude = function() {
        return Math.sqrt(((this.x * this.x) + (this.y * this.y)));
    }
    
    this.normalize = function() {
        var mag = this.magnitude();
        if(mag != 0)
            this.divide(mag);
    }
    
    this.limit = function(max) {
        if(this.magnitude() > max) {
            this.normalize();
            this.multiply(max);
        }
    }
}

Vector.add = function(v1,v2) {
    return new Vector(v1.x + v2.x , v1.y + v2.y);
}

Vector.subtract = function(v1,v2) {
    return new Vector(v1.x - v2.x , v1.y - v2.y);   
}

Vector.multiply = function(vector,number) {
    return new Vector(vector.x * number , vector.y * number);
}

Vector.divide = function(vector,number) {
    return new Vector(vector.x / number , vector.y / number);   
}