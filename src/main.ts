import 'module-alias/register';

import { mainPage } from '@/pages';
import 'colors';

(async () => {
    console.log('Welcome to Onyx CLI!\n'.cyan.bold);
    await mainPage();
})();
