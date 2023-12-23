import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import 'colors';

export const getDownloadPath = (): string => {
    const path = join(homedir(), 'Downloads');

    if (!existsSync(path)) {
        mkdirSync(path);
        console.log('Created a new folder in your Downloads folder called "YouTube MP3".'.yellow);
    }

    return path;
};
