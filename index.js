const fs = require('fs');

const NAME_FOLDER_FROM_TAKE_BRANCH = process.argv[2] || '';
const GIT_DIRECTORY_NAME = `.git`;


/**
 * Search `NAME_FOLDER_FROM_TAKE_BRANCH` in folder outside
 */
const getFolderPath = (searchFolder = NAME_FOLDER_FROM_TAKE_BRANCH) => {
	if (searchFolder === '') {
		return `${__dirname}/${GIT_DIRECTORY_NAME}`;
	}

	const currentDirName = __dirname;
	const indexIncludeSearchFolderInParentDirectoryList = currentDirName.indexOf(searchFolder);
	let returnDirName = '';

	if (indexIncludeSearchFolderInParentDirectoryList > -1) {
		let tempPath = currentDirName
			.slice(0, indexIncludeSearchFolderInParentDirectoryList + searchFolder.length);

		returnDirName = `${tempPath}/${GIT_DIRECTORY_NAME}`;
	} else {
		throw Error('Folder is not found in parent directory names');
	}

	return returnDirName;
};

const CURRENT_GIT_DIRECTORY = getFolderPath();


/**
 * Read file
 * @param {string} directory Path to file
 */
let readFile = (directory = false) => {
	if (!directory) throw Error('Variable directory name is empty');

	try {
		return fs.readFileSync(directory, { encoding: 'utf8', flag: 'r' });
	} catch (error) {
		throw Error('Error in times read file. Check the data in the variable "NAME_FOLDER_FROM_TAKE_BRANCH"');
	}
};


/** 
 * Get name of the branch that is connected to the head
 */
const getNameHeadBranch = () => {
	const nameBranch = readFile(`${CURRENT_GIT_DIRECTORY}/HEAD`)
		.split('/')
		.pop()
		.trim();

	return nameBranch;
};


/**
 * Get the current hash of a branch
 * @param {string} branch Name branch
 */
const LastGitHash = (branch = false) => {
	if (!branch) {
		branch = getNameHeadBranch();
	}

	const hash = readFile(`${CURRENT_GIT_DIRECTORY}/refs/heads/${branch}`);

	return hash;
};


module.exports = { LastGitHash };
