class Vector2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    add(other) {
      return new Vector2(this.x + other.x, this.y + other.y);
    }
  
    set(x, y) {
      this.x = x;
      this.y = y;
    }
  
    dupe() {
      return new Vector2(this.x, this.y);
    }
  }
  
  
class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => Math.floor(Math.random() * 100)));
    }

    palettes = [
        {
            'wall' : [143, 134, 111],
            'light-wall' : [51, 46, 32],
            'floor' : [36, 32, 22]
        },
        {
            'wall' : '#45050C',
            'light-wall' : '#720E07',
            'floor' : '#7F3814'
        }
    ]  


    generateWorld(method, seed){
        switch(method){
            case "noise":
                this.genMethodNoise(seed)
            
        }
    }


    getValue(pos) {
        return this.matrix[pos.y][pos.x];
    }

    setValue(pos, value = 0) {
        this.matrix[pos.y][pos.x] = value;
    }

    incrementValue(pos, add) {
        this.matrix[pos.y][pos.x] += add;
    }

    cleanUp() {
        const newMat = this.matrix.map((row, y) => row.map((cell, x) => {
        let count = 0;
        if (cell < 0.35) {
            for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const coord = new Vector2(x + i, y + j);
                if (coord.x < 0 || coord.x >= this.width || coord.y < 0 || coord.y >= this.height) count++;
                else if (this.matrix[y][x] <= 0.98) count++;
            }
            }
        }
        return count <= 3 ? 0.5 : cell;
        }));
        this.matrix = newMat;
    }

    applySmooth() {
        const newMat = this.matrix.map((row, y) => row.map((cell, x) => {
        let total = 0, count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
            const coord = new Vector2(x + i, y + j);
            if (coord.x < 0 || coord.x >= this.width || coord.y < 0 || coord.y >= this.height) continue;
            total += this.matrix[coord.y][coord.x];
            count++;
            }
        }
        return total / count;
        }));
        this.matrix = newMat;
    }

    genMethodNoise(seed = 0) {
        const noiseScale = 0.1;
        for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
            const noiseValue = noise(x * noiseScale + seed, y * noiseScale + seed);
            this.matrix[x][y] = noiseValue;
        }
        }
    }

    applyGradient() {
        const center = new Vector2(this.width / 2, this.height / 2);
        const maxDistance = Math.sqrt(center.x ** 2 + center.y ** 2);

        for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
            const distance = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);
            const gradient =  2 * distance/maxDistance;
            this.matrix[x][y] = (this.matrix[x][y] * gradient);
        }
        }
    }

    render() {
        const tileWidth = width / this.width;
        const tileHeight = height / this.height;

        for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            const value = this.getValue(new Vector2(x, y));
            fill(this.getTileColor(value));
            noStroke();
            rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
        }
        }
    }

    getTileColor(value) {
        let currentPalette = this.palettes[1]
        if (value > 0.60) return currentPalette['wall'];
        if (value > 0.50) return currentPalette['light-wall'];
        return currentPalette['floor'];
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function getRandomMin(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}



