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


    cleanUp(){
        let newMat = []
        for (let y = 0; y < this.height; y++){
            newMat[y] = []
            for (let x = 0; x < this.width; x++){
                newMat[y][x] = this.matrix[y][x]
                let count = 0
                if (this.matrix[x][y] < .35)
                for (let i = -1; i <= 1; i++){
                    for (let j = -1; j <=1; j++){
                        let coord = new Vector2( x+i, y+j)
                        if (coord.x < 0 || coord.x >= this.width || coord.y < 0 || coord.y >= this.height ){
                            count++
                        } else if ( this.matrix[y][x] <= .98){
                            count  ++
                        }
                    }
                }
                if (count <= 3){
                    newMat[y][x] = .5
                } 

            }
        }

        
        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                this.matrix[y][x] = newMat[y][x]

            }
        }
    }

    averageSmooth(){
        let newMat = []
        for (let y = 0; y < this.height; y++){
            newMat[y] = []
            for (let x = 0; x < this.width; x++){
                let total = 0
                let count = 0
                for (let i = -1; i <= 1; i++){
                    for (let j = -1; j <=1; j++){
                        let coord = new Vector2( x+i, y+j)
                        if (coord.x < 0 || coord.x >= this.width || coord.y < 0 || coord.y >= this.height ){
                            continue
                        }
                        total += this.matrix[coord.y][coord.x]
                        count ++
                    }
                }
                newMat[y][x] = total/count 
            }
        }
         

        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                this.matrix[y][x] = newMat[y][x]
            }
        }

    }

    generateRoundedArea(adjust = 0) {
        let center = new Vector2(this.width/2, this.height/2)
        let noiseScale = 0.1 
        const maxDistance = Math.sqrt(center.x ** 2 + center.y ** 2);
        for (let x = 0; x < this.width; x++){
            for (let y = 0; y < this.height; y++){
                let noiseValue = noise(x * noiseScale + adjust, y * noiseScale + adjust)

                let distance = Math.sqrt((x-center.x) ** 2 + (y-center.y) ** 2)

                let gradient = 1 - (distance/ maxDistance) * .6;

                this.matrix[x][y] = noiseValue * gradient //Math.pow(noiseValue, 2)
            }
        }
    }


    generateNoise(adjust = 0) {
        let noiseScale = 0.1 
        for (let x = 0; x < this.width; x++){
            for (let y = 0; y < this.height; y++){
                let noiseValue = noise(x * noiseScale + adjust, y * noiseScale + adjust)
                this.matrix[x][y] = noiseValue//Math.pow(noiseValue, 2)
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

        for (let y = 0; y < this.height; y++){
            for (let x = 0; x< this.width; x++){

                this.matrix[y][x] =this.matrix[y][x]/max
            }
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

            if (value > 0.60) {
                fill(36, 32, 22);
                
            } else if (value > 0.56) {
                fill(51, 46, 32);
            }
            else if (value > 0.38) {
                fill(143, 134, 111);
            } else if (value > 0.35) {
                fill(51, 46, 32);
            } else {
                fill(36, 32, 22);
            }
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



