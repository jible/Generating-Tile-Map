class Vector2{
    constructor(x,y){
        this.x=x
        this.y=y
    }
    add(other){
        return new Vector2(this.x + other.x, this.y + other.y)
    }
    set(x,y){
        this.x = x
        this.y = y
    }
    dupe(){
        return new Vector2(this.x, this.y)
    }
}


class Drop{
    constructor(world, life,pos){
        this.pos = pos.dupe()
        this.life = life
        this.world = world
    }


    release(){
        while (this.life > 0){
            this.tick()
        }
    }

    tick(){
        this.world.incrementValue(this.pos, -1)
        this.life--
        if (this.life > 0){
            this.slide()
        }
        
    }

    slide(){
        // n,s,e,w
        let lowestPos = new Vector2(null, null)
        let lowestValue = Infinity

        for (let x = -1; x  <= 1; x++){
            for (let y = -1; y  <= 1; y++){
                let lookPos = new Vector2(this.pos.x + x, this.pos.y + y)
                if (lookPos.x < 0 || lookPos.x >= this.world.width || lookPos.y < 0 || lookPos.y >= this.world.height) continue
                let lookValue = this.world.getValue(lookPos) + random(-.5, .5)
                if ( lookValue < lowestValue){
                    lowestValue = lookValue
                    lowestPos = lookPos
                }
            }
        }
        this.x  = lowestPos.x
        this.y = lowestPos.y

    }


}

class World{
    constructor(width,height){
      this.width = width
      this.height = height


      this.matrix = []
      for (let i = 0; i < this.width; i++){
        this.matrix[i] = []
        for (let j = 0; j < this.height; j++){
            this.matrix[i][j] = 0
        }
      }
  
    }


    render(){
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(this.matrix[x][y]); // Access transposed elements
            }
            console.log(row.join(' '));
        }
    }

    getValue(pos){
        return this.matrix[pos.x][pos.y]
    }

    setValue(pos,value = 0){
        this.matrix[pos.x][pos.y] = value
    }

    incrementValue(pos,add){
        this.matrix[pos.x][pos.y] += add
    }

    genMethodDrop(max,drops,life){
        
        // Fill the matrix to max height

        this.fillMatrix(max)

        for (let i = 0; i < drops; i++){
            let dropPosition = new Vector2(getRandom(this.width), getRandom(this.height))
            let drop = new Drop(this,life, dropPosition.dupe())
            drop.release()
        }
    }


    fillMatrix(value){
        for (let x = 0; x  < this.width ; x++){
            for (let y = 0 ; y < this.height; y++){
                this.matrix[x][y] = value
            }
        }
    }
  }



function getRandom(max){
    return Math.floor(Math.random() * max) 
}
function getRandomMin(min, max){
    return Math.floor( min +  Math.random() * (max - min) ) 
}



