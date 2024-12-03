export const solve = (): number => {
    const input = Deno.readTextFileSync(new URL('./input.txt', import.meta.url)).replaceAll('\r\n', '');
    
    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const validMults = input.match(regex);

    let total: number = 0;

    validMults?.forEach(mult => {
        const nums = mult.match(/\d{1,3}/g)?.map(Number);

        const product = nums?.reduce((acc, curr) => acc * curr);
        total += product ?? 0;
    });

    return total;
}

console.log(solve());