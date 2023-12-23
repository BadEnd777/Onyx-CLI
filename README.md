# Onyx CLI

Onyx CLI is a command-line interface tool that allows you to interact with various functions. It provides a simple and intuitive way to perform different tasks through a command-line interface.

## Development

To start Onyx CLI in development mode, run the following command:

- First, You need to clone the repository:

```bash
git clone https://github.com/BadEnd777/Onyx-CLI.git
cd Onyx-CLI # Change directory to the project folder
```

- Then, install the dependencies:

```bash
npm install # You can use your favorite package manager
```

- Finally, start the CLI:

```bash
npm run start # You can use your favorite package manager
```

## Project Structure

- **/src**: Directory containing the source code of the CLI.
- **/src/functions**: Directory containing the functions that can be executed.
- **/src/pages**: Directory containing the pages that can be displayed.
- **/src/utils**: Directory containing the utility functions.
- **/src/main.ts**: Main file of the CLI.

## Adding Custom Functions

To add a new function, create a TypeScript file in the `src/functions` directory.
The file should export a function with the following structure:

```typescript
export default async () => ({
    index: 0, // The index of the function in the list
    name: 'Function name', // The name of the function
    value: 'function-name', // The value of the function
    description: 'Function description', // The description of the function

    async execute(): Promise<void> {
        // The function code
    }
});
```

## Dependencies

Onyx CLI relies on the following dependencies:

- **[@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts):** Interactive command-line prompts for user input.
- **[colors](https://www.npmjs.com/package/colors):** Adds color to console output.
- **[module-alias](https://www.npmjs.com/package/module-alias):** Provides module path aliasing for cleaner imports.
- **[rimraf](https://www.npmjs.com/package/rimraf):** Cross-platform tool for removing files and directories.
- **[typescript](https://www.npmjs.com/package/typescript):** A superset of JavaScript that adds static typing.
- **[ytdl-core](https://www.npmjs.com/package/ytdl-core):** Latest version for YouTube video downloading.

### Development Dependencies

- **[@types/module-alias](https://www.npmjs.com/package/@types/module-alias):** TypeScript type definitions for module-alias.
- **[@types/node](https://www.npmjs.com/package/@types/node):** TypeScript type definitions for Node.js.
- **[@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin):**
  TypeScript support for ESLint.
- **[@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser):**
  Parses TypeScript code for ESLint.
- **[eslint](https://www.npmjs.com/package/eslint):** A pluggable and configurable linter tool for identifying and fixing code.
- **[pkg](https://www.npmjs.com/package/pkg):** Package your Node.js project into an executable.
- **[prettier](https://www.npmjs.com/package/prettier):** Opinionated code formatter.

Make sure to check the [package.json](package.json) file for the specific versions used in this project.

## Contributing

Contributions are welcome! If you have any improvements, bug fixes, or new features, feel free to submit a pull request.

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## License

This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details.