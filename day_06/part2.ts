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

function isLoop(grid: string[][], startPos: number[], startDir: number[], directionMap:  Record<string, [number, number]>): boolean {
    const visited = new Set<string>();
    let pos = [...startPos];
    let dir = [...startDir];

    while (true) {
        const posKey = `${pos[0]},${pos[1]},${dir[0]},${dir[1]}`;
        if (visited.has(posKey)) {
            return true;
        }
        visited.add(posKey);

        const hit = raycast(grid, pos, dir);
        if (!hit) return false;

        pos = [hit[0] - dir[0], hit[1] - dir[1]];

        // turn right
        if (dir[0] === 0 && dir[1] === 1) {
            dir = directionMap['v'];
        } else if (dir[0] === 0 && dir[1] === -1) {
            dir = directionMap['^'];
        } else if (dir[0] === 1 && dir[1] === 0) {
            dir = directionMap['<'];
        } else if (dir[0] === -1 && dir[1] === 0) {
            dir = directionMap['>'];
        }
    }
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
    
    let count = 0;
    const gridCopy = input.map(row => [...row]);
    
    // Find starting position and direction
    let startPos: number[] = [0, 0];
    let startDir: number[] = [0, 1];
    
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if ('^>v<'.includes(input[i][j])) {
                startPos = [i, j];
                startDir = directionMap[input[i][j]];
                break;
            }
        }
    }

    // Try adding # at each empty position
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === '.' && !(i === startPos[0] && j === startPos[1])) {
                gridCopy[i][j] = '#';
                if (isLoop(gridCopy, startPos, startDir, directionMap)) {
                    count++;
                }
                gridCopy[i][j] = '.';
            }
        }
    }

    console.timeEnd('Solve');

    return count;
}

console.log('Day 6, Part 1: ' + solve());