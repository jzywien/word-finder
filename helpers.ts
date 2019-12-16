export const permutations = <T>(inputArray: Array<T>): T[][] => {
    return inputArray.reduce(function permute(res: T[], item, key, arr) {
        return res
            .concat(arr.length > 1 && arr.slice(0, key)
            .concat(arr.slice(key + 1)).reduce(permute, [])
            .map((perm: T) => [item].concat(perm)) || item);
    }, []);
};

export const substrings = (inputArray: string[]) => {
    const values = [];
    inputArray.reduce((item, accum) => {
        values.push(item + accum);
        return item + accum;
    }, '');
    return values;
};

export const readLines = async (fileName: string) => {
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(await Deno.readFile(fileName));
    const lines = text.split(/\s+/g).filter(w => /[a-z0-9]/.test(w));
    return lines;
}