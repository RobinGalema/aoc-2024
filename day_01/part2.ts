const solve = () : number => {
    const input =  Deno.readTextFileSync('F:/documents/Projects/aoc-2024/day_1/input.txt').split("\n").map((line) => line.replace("\r", ""));

    const left: Array<number> = [];
    const right: Array<number> = [];
    
    input.map((element) => {
        const parts = element.split("   ");
        left.push(parseInt(parts[0]));
        right.push(parseInt(parts[1]));
    });

    let total: number = 0;

    left.forEach((element) => {
        const occurences = right.filter((rightElement) => rightElement === element).length;
        total += occurences * element;
    });

    return total;
};

console.log(solve());