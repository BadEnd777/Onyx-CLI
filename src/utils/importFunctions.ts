import { readdirSync } from 'fs';
import { join } from 'path';

export const importFunctions = async () => {
    const functionsDir = join(__dirname, '../functions');
    const files = readdirSync(functionsDir);

    const functions = await Promise.all(
        files.map(async (file) => {
            const func = await import(join(functionsDir, file));
            return func.default();
        })
    );

    return functions.sort((a, b) => a.index - b.index);
};
