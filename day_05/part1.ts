const isLineValid = (line: number[], rules: number[][]): boolean => {
    const positions = new Map<number, number>();
    line.forEach((num, idx) => positions.set(num, idx));
    
    for (const [first, second] of rules) {
        const firstPos = positions.get(first);
        const secondPos = positions.get(second);
        if (firstPos !== undefined && secondPos !== undefined && firstPos >= secondPos) {
            return false;
        }
    }
    return true;
}

export const solve = (): number => {
    console.time('Solve');
    
    const input = Deno.readTextFileSync(new URL('./input.txt', import.meta.url));
    const [part1, part2] = input.trim().split('\n\n');
    
    const rules = part1.split('\n').map(line => line.trim()).map(line => line.split('|').map(Number));
    const paths = part2.split('\n').map(line => 
        line.trim().split(',').map(Number)
    );

    const validPaths = paths.filter(path => isLineValid(path, rules));

    const result =  validPaths.reduce((acc, path) => acc + path[Math.floor(path.length / 2)], 0);

    console.timeEnd('Solve');
    return result;
}

console.log('Day 5, Part 1: ' + solve());