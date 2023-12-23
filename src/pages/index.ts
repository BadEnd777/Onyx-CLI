import { select } from '@inquirer/prompts';
import { importFunctions } from '@/utils/importFunctions';

export const mainPage = async () => {
    const functions = await importFunctions();

    const answer = await select({
        message: 'What do you want to do?',
        choices: functions
    });

    const func = functions.find((func) => func.value === answer);

    if (func) {
        await func.execute();
    } else {
        console.log('Error: Invalid function.', answer);
        await mainPage();
    }
};
