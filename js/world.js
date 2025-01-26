class Vector2{
    constructor(x,y){
        this.x=x
        this.y=y
    }
    add(other){
        return new Vector2(this.x + other.x, this.y + other.y)
    }
}


class Drop{
    constructor(world, life,x,y){
        this.x= x
        this.y = y
        this.life = life
        this.world = world
    }



    tick(){
        this.world.incrementValue(this.x,this.y, -1)
        this.life--
        slide()
    }

    slide(){
        // n,s,e,w
        let lowestIndex = -1
        let lowestValue = Infinity
        for (let x = -1; x  <= 1; x++){
            for (let y = -1; y  <= 1; y++){
                if (this.world.getValue(this.x + x, this.y + y)){
                    
                }
            }

        }

    }


}

class World{
    constructor(width,height){
      this.width = width
      this.height = height


      this.matrix = []
      for (let i = 0; i < this.width; i++){
        this.matrix[i] = []
      }
  
    }

    getValue(x,y){
        return matrix[x][y]
    }

    setValue(x,y,value = 0){
        matrix[x][y] = value
    }

    incrementValue(x,y,add){
        matrix[x][y] += add
    }

    genMethodAcid(drops){
        
        // Fill the matrix to max height
        let max = 1000
        this.fillMatrix(max)

        for (let i = 0; i < drops; i++){
            this.matrix[getRandom()]
        }
    }


    fillMatrix(value){
        for (let x = 0; x  <width ; x++){
            for (let y = 0 ; y < this.height; y++){

                this.matrix[][y] 
            }
        }
    }
  }



function getRandom(max){
    return Math.floor(Math.random()) * max
}
function getRandomMin(min, max){
    return Math.floor( min +  Math.random() * (max - min) ) 
}