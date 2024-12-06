const visited = new Set<string>();

function raycast(grid: string[][], position: number[], direction: number[]) {
    const currentDirection = direction;
    let currentPosition : number[] = position;

    // while in the grid
    while (currentPosition[0] >= 0 && currentPosition[0] < grid.length && currentPosition[1] >= 0 && currentPosition[1] < grid[0].length) {
        if (grid[currentPosition[0]][currentPosition[1]] === '#') {
            return currentPosition;
        }

        visited.add(`${currentPosition[0]},${currentPosition[1]}`);

        currentPosition = [currentPosition[0] + currentDirection[0], currentPosition[1] + currentDirection[1]];
    }

    return null;
}

export const solve = (): number => {
    console.time('Solve');
    
    const input = Deno.readTextFileSync(new URL('./input.txt', import.meta.url)).split('\n').map(line => line.split(''));

    const directionMap: Record<string, [number, number]> = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1]
    };

    // find the statring position and coorinates
    let position: number[] = [0, 0];
    let direction: number[] = [0, 1];

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === '^' || input[i][j] === '>' || input[i][j] === 'v' || input[i][j] === '<') {
                position = [i, j];
                direction = directionMap[input[i][j]];
                break;
            }
        }
    }

    while (raycast(input, position, direction) != null) {
        const hit = raycast(input, position, direction);

        // set the position to one step before the hit
        position = [hit![0] - direction[0], hit![1] - direction[1]];

        // turn right
        if (direction[0] === 0 && direction[1] === 1) {
            direction = directionMap['v'];
        } else if (direction[0] === 0 && direction[1] === -1) {
            direction = directionMap['^'];
        } else if (direction[0] === 1 && direction[1] === 0) {
            direction = directionMap['<'];
        } else if (direction[0] === -1 && direction[1] === 0) {
            direction = directionMap['>'];
        }
    }

    console.timeEnd('Solve');
    return visited.size;
}

console.log('Day 6, Part 1: ' + solve());