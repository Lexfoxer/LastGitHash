const LGH = require('./index');

/** Test: 1 */
const getLastHashFromHead = LGH();
console.log(`getLastHashFromHead: ${getLastHashFromHead}`);

/** Test: 2 */
const getHeadHashFromMaster = LGH('master');
console.log(`getHeadHashFromMaster: ${getHeadHashFromMaster}`);

/** Test: 3 */
const getHeadHashFromMasterInCustomFolder = LGH('master', 'last-git-hash');
console.log(`getHeadHashFromMasterInCustomFolder: ${getHeadHashFromMasterInCustomFolder}`);
