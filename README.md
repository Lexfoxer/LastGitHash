# LastGitHash (last-git-hash)
NodeJS module for get hash checksum in current project without install git (as a rule for use in project generating in docker).

## Usage

#### Import
```javascript
const LGH = require('last-git-hash');
```

#### Get hash for current head
```javascript
const getLastHashForCurrentHead = LGH();
```

#### Get hash by name branch
```javascript
const getHeadHashFromMaster = LGH('master');
```

#### Get hash by name branch and name parent folder (if `.git` folder out current package)
```javascript
const getHeadHashFromMasterInCustomFolder = LGH('master', 'last-git-hash');
```

### CLI
```bash
node index.js branch folder
```
- `branch` – Name branch (require if use `folder`, by default optional);
- `folder` – Name folder from list parent folders (optional).
