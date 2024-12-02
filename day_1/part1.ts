const solve = () : number => {
    const input =  Deno.readTextFileSync('F:/documents/Projects/aoc-2024/day_1/input.txt').split("\n").map((line) => line.replace("\r", ""));

    const left: Array<number> = [];
    const right: Array<number> = [];
    let total: number = 0;
    
    input.map((element) => {
        const parts = element.split("   ");
        left.push(parseInt(parts[0]));
        right.push(parseInt(parts[1]));
    });
    
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
    
    total = left.reduce((acc, leftValue, index) => acc + Math.abs(leftValue - right[index]), 0);
    
    return total;
};

console.log(solve());