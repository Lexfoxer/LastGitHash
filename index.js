const fs = require('fs');
const GIT_DIRECTORY_NAME = `.git`;
const BRANCH_FROM_ENV = process.argv[2] || false;
const NAME_FOLDER_FROM_ENV = process.argv[3] || false;
const NAME_FOLDER_NODE_MODULES = 'node_modules';


/**
 * If module use in node_modules, we go up to the package that we connected
 */
const getDirNameAndCheckNodeModules = () => {
	let initDirectoryName = __dirname;
	
	if (initDirectoryName.indexOf(NAME_FOLDER_NODE_MODULES) > -1) {
		const dirNameAsArray = initDirectoryName.split('/');

		if (dirNameAsArray[dirNameAsArray.length - 2] === NAME_FOLDER_NODE_MODULES) {
			// Remove two directory `node_modules/last-git-hash`
			const leftPart = dirNameAsArray.splice(0, dirNameAsArray.length - 2);

			initDirectoryName = leftPart.join('/');
		} else {
			throw Error('When connecting a module through node_modules, position it so: ".../you_project_name/node_modules/last-git-hash/index.js"');
		}
	}

	return initDirectoryName;
};

let dirname = getDirNameAndCheckNodeModules();


/**
 * Search `NAME_FOLDER_FROM_TAKE_BRANCH` in folder outside
 */
const getFolderPath = (searchFolder) => {
	if (!searchFolder) {
		return `${dirname}/${GIT_DIRECTORY_NAME}`;
	}

	const currentDirName = dirname;
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
const getNameHeadBranch = (directory) => {
	const nameBranch = readFile(`${directory}/HEAD`)
		.split('/')
		.pop()
		.trim();

	return nameBranch;
};


/**
 * Get the current hash of a branch
 * @param {string} branch Name branch
 * @param {string} parentFolderName Folder from list directory beginning with this module
 */
const LastGitHash = (branch = BRANCH_FROM_ENV, parentFolderName = NAME_FOLDER_FROM_ENV) => {
	const currentGitDirectory = getFolderPath(parentFolderName);

	if (!branch) {
		branch = getNameHeadBranch(currentGitDirectory);
	}

	return readFile(`${currentGitDirectory}/refs/heads/${branch}`);
};


/** SUPPORT CLI */
if (BRANCH_FROM_ENV || NAME_FOLDER_FROM_ENV) {
	if (BRANCH_FROM_ENV) {
		console.log(LastGitHash(BRANCH_FROM_ENV));
	} else if (BRANCH_FROM_ENV && NAME_FOLDER_FROM_ENV) {
		console.log(LastGitHash(BRANCH_FROM_ENV, NAME_FOLDER_FROM_ENV));
	}
}


module.exports = LastGitHash;
