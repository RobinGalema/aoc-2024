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

const reOrderInvalidLines = (line: number[], rules: number[][]): number[] | undefined => {
    if (isLineValid(line, rules)) {
        return undefined;
    }

    let currentLine : number[] = [...line];
    
    while (true) {
        // Create positions map for current state
        const positions = new Map<number, number>();
        currentLine.forEach((num, idx) => positions.set(num, idx));
        
        let foundViolation: boolean = false;
        
        for (const [first, second] of rules) {
            const firstPos = positions.get(first);
            const secondPos = positions.get(second);
            
            if (firstPos !== undefined && secondPos !== undefined && firstPos >= secondPos) {
                // Found a violation, swap positions
                const newLine = [...currentLine];
                newLine[firstPos] = currentLine[secondPos];
                newLine[secondPos] = currentLine[firstPos];
                
                currentLine = newLine;
                foundViolation = true;
                break; // Start checking rules again with new arrangement
            }
        }
        
        if (!foundViolation) {
            return currentLine; // All rules satisfied
        }
    }
};

export const solve = (): number => {
    console.time('Solve');

    const input = Deno.readTextFileSync(new URL('./input.txt', import.meta.url));
    const [part1, part2] = input.trim().split('\n\n');
    
    const rules = part1.split('\n').map(line => line.trim()).map(line => line.split('|').map(Number));
    const paths = part2.split('\n').map(line => line.trim().split(',').map(Number));

    const updatedPaths = paths.map(path => reOrderInvalidLines(path, rules)).filter(num => num !== undefined);

    const result =  updatedPaths.reduce((acc, path) => acc + path[Math.floor(path.length / 2)], 0);

    console.timeEnd('Solve');
    return result;
}

console.log('Day 5, Part 2: ' + solve());