import { permutations, substrings, readLines } from "./helpers.ts";

const getInput = async (prompt: string) => {
    const buf = new Uint8Array(1024);
    Deno.stdout.writeSync(new TextEncoder().encode(prompt));
    const n = await Deno.stdin.read(buf); 
    if (n == Deno.EOF) {
      return null;
    } else {
      const letters = new TextDecoder().decode(buf.subarray(0, n));
      return letters.trimEnd();
    }    
}

const loadDictionary = async () => {
    const lines = await readLines('words_alpha.txt');
    const words = new Set(lines);    
    return words;
}

const generatePossibilities = (letters: string) => {
    console.time('generatePossibilities');
    const results = permutations(Array.from(letters));
    const allPossibilites = new Set<string>();
    results.map(result => {
        const subs = substrings(result);
        subs.forEach(sub => allPossibilites.add(sub));
    });
    const response = Array.from(allPossibilites).filter(x => x.length >= 3);
    console.timeEnd('generatePossibilities');
    console.log(`${response.length} possibilities`);
    return response;
}

const main = async() => {
    const letters = await getInput('Enter Letters: ');
    if (letters === null) {
        console.error('no input received');
        return -1;
    }
    if (letters.length >= 10) {
        console.error('word too long. must be less than 10 characters');
        return;
    }

    const [words, possibilities] = await Promise.all([
        loadDictionary(),
        generatePossibilities(letters)
    ]);

    console.time('testwords');
    const actualWords = new Set([...possibilities].filter(x => words.has(x)));
    const finalList = Array
        .from(actualWords)
        .sort((a, b) => (a.length - b.length) || a.localeCompare(b));

    console.timeEnd('testwords');
    finalList.forEach(x => console.log(`${x.length}: ${x}`));
};

main();

