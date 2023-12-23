import 'colors';

export default async () => ({
    index: 999,
    name: 'Exit',
    value: 'exit',
    description: 'Exit the program.',

    async execute(): Promise<void> {
        console.log('Bye!'.green);
        process.exit();
    }
});
