import { input, select, confirm } from '@inquirer/prompts';
import { getDownloadPath } from '@/utils/getDownloadPath';
import { formatName } from '@/utils/formatName';
import { duration } from '@/utils/duration';
import { createWriteStream, existsSync } from 'fs';
import { join } from 'path';
import ytdl from 'ytdl-core';
import 'colors';

export default async () => ({
    index: 0,
    name: 'Download YouTube MP3',
    value: 'download-youtube-mp3',
    description: 'Download any video from YouTube as MP3 file.',

    async execute(): Promise<void> {
        const url = await input({
            message: 'Enter the YouTube video URL:',
            validate: (value: string) => {
                if (value.length) return true;
                return 'Please enter a valid URL.';
            }
        });

        if (!ytdl.validateURL(url)) {
            console.warn('Invalid URL!', 'Please enter a valid URL.'.red);
            return await this.execute();
        }

        console.log('\nFetching video information...'.yellow);

        const { videoDetails, formats } = await ytdl.getInfo(url);
        const { title, author, lengthSeconds } = videoDetails;

        let line = '';
        for (let i = 0; i < title.length; i++) line += '─';

        console.log(`\n${line}`.cyan);
        console.log('Title:'.cyan.bold, title);
        console.log('Author:'.cyan.bold, author.name);
        console.log('Duration:'.cyan.bold, duration(Number(lengthSeconds)));
        console.log(`${line}\n`.cyan);

        const audioFormats = formats.filter((format) => format.hasAudio);

        const format = await select({
            message: 'Select the audio format:',
            choices: audioFormats.map((format) => ({
                name: `${format.audioBitrate}kbps, ${format.container}`,
                value: format
            }))
        });

        const { container } = format;
        const downloadPath = getDownloadPath();

        let name = formatName(title);

        if (existsSync(join(downloadPath, `${name}.${container}`))) {
            const overwrite = await select({
                message: 'A file with this name already exists. What do you want to do?',
                choices: [
                    { name: 'Overwrite', value: true },
                    { name: 'Rename', value: false }
                ]
            });

            if (!overwrite) {
                const newName = await input({
                    message: 'Enter a new name:',
                    validate: (value: string) => {
                        if (value.length) return true;
                        return 'Please enter a valid name.';
                    }
                });

                name = formatName(newName);
            }
        }

        const fileName = join(downloadPath, `${name}.${container}`);

        const confirmed = await confirm({
            message: 'Are you sure you want to download this video?'
        });

        if (!confirmed) {
            console.log('Aborted!'.red);
            this.execute();
            return;
        }

        const stream = ytdl(url, { format });
        const file = createWriteStream(fileName);

        stream.pipe(file);

        stream.on('progress', (_, downloaded: number, total: number) => {
            const percent = downloaded / total;
            const bar = '█'.repeat(Math.round(percent * 40));
            const empty = '░'.repeat(40 - bar.length);
            const progress = `${bar}${empty}`;

            process.stdout.cursorTo(0);
            process.stdout.write(`Progress: ${progress} ${Math.round(percent * 100)}%`);
        });

        stream.on('end', async () => {
            console.log('\n\nDownloaded!'.green);

            const again = await confirm({
                message: 'Do you want to download another video?'
            });

            if (again) {
                this.execute();
                return;
            }

            console.log('\nBye!'.cyan.bold);
        });

        stream.on('error', (error: Error) => {
            console.log('Error!'.red, error.message);
            this.execute();
        });
    }
});
