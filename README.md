# @esm-polyfill/scheduler@0.23.2

[scheduler](https://www.npmjs.com/package/scheduler) in ESM format.


## Install

Install:

```sh
npm i scheduler@esm-polyfill/scheduler
# specific version
npm i scheduler@esm-polyfill/scheduler#semver:^0.23.2
```

## Use 

Reference:

```ts
import Scheduler from 'scheduler'
import * as S from 'scheduler'

// ...

```

## How this package was created?



Dependencies for version 0.23.2 in `package.json` was added in
following manner:

```json
{
  "devDependencies": {
    "...": "...",

    "scheduler-0.23.2": "npm:scheduler@0.23.2",
    "@types/scheduler-0.23.2": "npm:@types/scheduler@18.3"
  }
}
```


Then orginal `package.json`'s, LICENSE's,.. etc. source files 
were copied to target directory:


```sh

mkdir -p scheduler-0.23.2

# copy .d.ts
cd node_modules/@types/scheduler-0.23.2
cp -n --parents *.d.ts ../../../scheduler-0.23.2
cd ../../../

# copy types license, package.json and readme
cp -n node_modules/@types/scheduler-0.23.2/package.json scheduler-0.23.2/package-types.json
cp -n node_modules/@types/scheduler-0.23.2/README.md    scheduler-0.23.2/README-types.md
cp -n node_modules/@types/scheduler-0.23.2/LICENSE      scheduler-0.23.2/LICENSE-types

# copy js license, package.json and readme
cp -n node_modules/scheduler-0.23.2/package.json scheduler-0.23.2/package-js.json
cp -n node_modules/scheduler-0.23.2/README.md    scheduler-0.23.2/README-js.md
cp -n node_modules/scheduler-0.23.2/LICENSE      scheduler-0.23.2/LICENSE-js



```

Then core cjs files are transformed by rollup
(see [rollup config file](./rollup.config-0.23.2.mjs)):


```sh

# transform cjs modules to mjs and save them to scheduler-0.23.2/esm
# (but only those without conditional requires which will be 
# transformed manually)
npx rollup -c rollup.config-0.23.2.mjs

```

Top level files were manually converted:

```sh

# copy modules which will be transformed manually
# (top level modules with conditional require's)
mkdir -p scheduler-0.23.2/production
cp -n node_modules/scheduler-0.23.2/*.js scheduler-0.23.2/production
mkdir -p scheduler-0.23.2/development
cp -n node_modules/scheduler-0.23.2/*.js scheduler-0.23.2/development

# unfortunately esm/scheduler.development.js and esm/scheduler.production.min.js
# must be manually edited to export namespace.
mkdir -p scheduler-0.23.2/esm-overrides
cp -n scheduler-0.23.2/esm/scheduler.*.js scheduler-0.23.2/esm-overrides

```

in every file abowe change:

```js

// from:
module.exports = require('./cjs/...')
// to:
export * from '../esm/...'
export { default } from '../esm/...'

// and from:
const Scheduler = require('@esm-polyfill/scheduler')
// to:
import * as S from '@esm-polyfill/scheduler'

```

`package.json` was edited to point to new `exports`, `dependencies`
and `devDependencies`.

```json
{
  "name": "@esm-polyfill/scheduler",
  "description": "scheduler in ESM format",
  "keywords": [
    "react", "esm", "dom"
  ],
  "version": "0.23.2",
  "repository": {
    "type": "git",
    "url": "https://github.com/esm-polyfill/scheduler"
  },
  "license": "MIT",
  "files": [
    "scheduler-0.23.2",
    "package.json",
    "README"
  ],
  "exports": "... nice scoped exports ...",
  "...": "..."
}
```

Why we ended with such dependencies? Because:

* `loose-envify` was used for `production` or `development` 
  contexts, but those was incorporated into package `exports`,
  so is not neccessary.



## Bugfixes

When fixing bug in polyfill, bugfixed commit must point 
to the same tag (unfortunately :( ), to do this:

```sh
git tag v0.23.2 -f
git push -f --tags
```