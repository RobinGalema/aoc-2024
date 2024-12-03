export const solve = (): number => {
    const input = Deno.readTextFileSync(new URL('./input.txt', import.meta.url)).replaceAll('\r\n', '');
    
    const regex = /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g;
    const validCommands= input.match(regex);

    let total: number = 0;
    let enabled: boolean = true;

    validCommands?.forEach(command => {
        if (command === 'do()') {
            enabled = true;
        } else if (command === 'don\'t()') {
            enabled = false;
        } else if (enabled && command.startsWith('mul')) {
            const nums = command.match(/\d{1,3}/g)?.map(Number);
            const product = nums?.reduce((acc, curr) => acc * curr);
            total += product ?? 0;
        }
    });

    return total;
}

console.log(solve());