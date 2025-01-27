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
        if (this.world.getValue(this.pos) > 0){
            this.world.incrementValue(this.pos, -1)
        }
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
      for (let i = 0; i < this.height; i++){
        this.matrix[i] = []
        for (let j = 0; j < this.width; j++){
            this.matrix[i][j] = Math.floor(Math.random() * 100)
        }
      }
  
    }


    string_to_grid(input){
        console.log("string to grid")
        let rows = input.split("\n")
        rows.pop(); // adjust for last newline
        console.log(rows)

        for ( let i = 0; i < rows.length; i++){
            let col = rows[i].split(" ");
            col.pop(); // adjust for last space
            for (let j = 0; j < col.length; j++){
                console.log(this.matrix[i][j], col[j])
                this.matrix[i][j] = col[j]
            }
        }

    }

    grid_to_string(){
        let output = ''
        // console.log(this.height)
        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                output += `${this.matrix[y][x]} `
            }
            output += '\n'
        }
        // console.log(output)
        return output
    }

    getValue(pos){
        return this.matrix[pos.y][pos.x]
    }

    setValue(pos,value = 0){
        this.matrix[pos.y][pos.x] = value
    }

    incrementValue(pos,add){
        this.matrix[pos.y][pos.x] += add
    }

    generateNoise(adjust = 0) {
        let noiseScale = 0.1 
        for (let x = 0; x < this.width; x++){
            for (let y = 0; y < this.height; y++){
                this.matrix[x][y] = noise(x * noiseScale + adjust, y * noiseScale + adjust) * 100;
            }
        }
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
  

    render() {
        const tileWidth = width / world.width; // Width of each tile
        const tileHeight = height / world.height; // Height of each tile

        for (let y = 0; y < world.height; y++) {
            for (let x = 0; x < world.width; x++) {
            const value = world.getValue(new Vector2(x, y)); // Get the matrix value
            const shade = map(value, 0, 100, 255, 0); // Map the value to a shade (0 = black, 255 = white)

            fill(shade);
            noStroke();
            rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight); // Draw the tile
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



