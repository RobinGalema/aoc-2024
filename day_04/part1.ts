const countWordIn2DArray = (grid: string[][], word: string): number => {
    const rows: number = grid.length;
    const cols: number = grid[0].length;

    const directions: number[][] = [
        [0, 1],   // right
        [1, 0],   // down
        [1, 1],   // diagonal down-right
        [1, -1],  // diagonal down-left
    ];

    const isInBounds = (x: number, y: number): boolean =>
        x >= 0 && x < rows && y >= 0 && y < cols;

    const countFrom = (x: number, y: number, word: string): number => {
        let count = 0;

        for (const [dx, dy] of directions) {
            let found = true;

            for (let i = 0; i < word.length; i++) {
                const newX = x + i * dx;
                const newY = y + i * dy;

                if (!isInBounds(newX, newY) || grid[newX][newY] !== word[i]) {
                    found = false;
                    break;
                }
            }

            if (found) count++;
        }

        return count;
    }

    let totalCount = 0;
    const reversedWord = word.split('').reverse().join(''); // Reverse the word to check for backwards words

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (grid[x][y] === word[0]) {
                totalCount += countFrom(x, y, word);
            }
            else if (grid[x][y] === reversedWord[0]) {
                totalCount += countFrom(x, y, reversedWord);
            }
        }
    }

    return totalCount;
}

export const solve = (): number => {
    const input = Deno.readTextFileSync(new URL('./input.txt', import.meta.url)).split('\n');
    console.time('countWordIn2DArray');
    const grid = input.map(row => row.split(''));

    const result = countWordIn2DArray(grid, 'XMAS');
    console.timeEnd('countWordIn2DArray');

    return result;

}

console.log('Day 4, Part 1: ' + solve());