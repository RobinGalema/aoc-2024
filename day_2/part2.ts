const isValid = (report: number[]): boolean => {
    if (report.length < 2) return true;

    let direction = 0; // 1: increasing, -1: decreasing

    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];

        if (Math.abs(diff) > 3 || diff === 0) {
            return false;
        }

        if (direction === 0) {
            direction = diff > 0 ? 1 : -1;
        } else if ((direction === 1 && diff < 0) || (direction === -1 && diff > 0)) {
            return false;
        }
    }

    return true;
};

const solve = (): number => {
    const input = Deno.readTextFileSync('F:/documents/Projects/aoc-2024/day_2/input.txt').split('\n');
    let validReports = 0;

    for (const line of input) {
        const report = line.trim().split(' ').map(Number);

        if (isValid(report)) {
            validReports++;
        } else {
            for (let i = 0; i < report.length; i++) {
                const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
                if (isValid(modifiedReport)) {
                    validReports++;
                    break;
                }
            }
        }
    }

    return validReports;
};

console.log(solve());