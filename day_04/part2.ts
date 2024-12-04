const countWordIn2DArray = (grid: string[][]): number => {
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

    let totalCount = 0;

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            if (grid[x][y] === 'A') {
                // Check NW to SE diagonal
                const nw_x = x - 1, nw_y = y - 1;
                const se_x = x + 1, se_y = y + 1;
                
                // Check NE to SW diagonal
                const ne_x = x - 1, ne_y = y + 1;
                const sw_x = x + 1, sw_y = y - 1;
            
                if (!isInBounds(nw_x, nw_y) || !isInBounds(se_x, se_y) ||
                    !isInBounds(ne_x, ne_y) || !isInBounds(sw_x, sw_y)) continue;
            
                const word1 = grid[nw_x][nw_y] + 'A' + grid[se_x][se_y];
                const word2 = grid[ne_x][ne_y] + 'A' + grid[sw_x][sw_y];
            
                const isValid1 = word1 === 'MAS' || word1 === 'SAM';
                const isValid2 = word2 === 'MAS' || word2 === 'SAM';
            
                if (isValid1 && isValid2) {
                    totalCount++;
                }
            }
        }
    }

    return totalCount;
}

export const solve = (): number => {
    const input = Deno.readTextFileSync(new URL('./input.txt', import.meta.url)).split('\n');
    console.time('countWordIn2DArray');
    const grid = input.map(row => row.split(''));

    const result = countWordIn2DArray(grid);
    console.timeEnd('countWordIn2DArray');

    return result;

}

console.log('Day 4, Part 1: ' + solve());