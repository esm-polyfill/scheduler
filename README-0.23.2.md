# @esm-polyfill/scheduler@0.23.2

Scheduler in ESM format.

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

// ...

```

## Internals info

### Main ESM transformation procedure

```sh
npm i --save-dev scheduler-0.23.2@npm:scheduler@0.23.2
npm i --save-dev scheduler-types-0.23@npm:@types/scheduler@0.23


mkdir scheduler-0.23.2

cd node_modules/scheduler-types-0.23
cp --parents *.d.ts **/*.d.ts ../../scheduler-0.23.2
cd ../../
cp node_modules/scheduler-types-0.23/package.json scheduler-0.23.2/package-types.json


cp node_modules/scheduler-0.23.2/package.json package-0.23.2.json
cp node_modules/scheduler-0.23.2/package.json scheduler-0.23.2
cp node_modules/scheduler-0.23.2/README.md scheduler-0.23.2
cp node_modules/scheduler-0.23.2/LICENSE scheduler-0.23.2


npx esbuild node_modules/scheduler-0.23.2/*.js \
    --outdir=scheduler-0.23.2/esm-development \
    --bundle \
    --charset=utf8 \
    --platform=node \
    --format=esm \
    --packages=external \
    --analyze \
    --define:process.env.NODE_ENV=\"development\" \
    --alias:scheduler=@esm-polyfill/scheduler

npx esbuild node_modules/scheduler-0.23.2/*.js \
    --outdir=scheduler-0.23.2/esm-production \
    --bundle \
    --charset=utf8 \
    --platform=node \
    --format=esm \
    --packages=external \
    --analyze \
    --define:process.env.NODE_ENV=\"production\" \
    --alias:scheduler=@esm-polyfill/scheduler


npx esbuild node_modules/scheduler-0.23.2/*.js \
    --outdir=scheduler-0.23.2/cjs-development \
    --bundle \
    --charset=utf8 \
    --platform=node \
    --format=cjs \
    --packages=external \
    --analyze \
    --define:process.env.NODE_ENV=\"development\" \
    --alias:scheduler=@esm-polyfill/scheduler

npx esbuild node_modules/scheduler-0.23.2/*.js \
    --outdir=scheduler-0.23.2/cjs-production \
    --bundle \
    --charset=utf8 \
    --platform=node \
    --format=cjs \
    --packages=external \
    --analyze \
    --define:process.env.NODE_ENV=\"production\" \
    --alias:scheduler=@esm-polyfill/scheduler
```




### Changes to package.json dependencies


#### js oryginal dependencies

```json
{
  "dependencies": {
    "loose-envify": "^1.1.0"
  }
}
```

#### dts oryginal dependencies

```json
{
 
}
```

#### esm'ed dependencies

```json
{
  "dependencies": {
    "scheduler": "git+file:///home/mk/github/esm-polyfill/scheduler#semver^0.23.2"
  },
  "devDependencies": {
    "esbuild": "^0.23.1",
    "scheduler-0.23.2": "npm:scheduler@^0.23.2",
    "scheduler-types-0.23": "npm:@types/scheduler@0.23"
  }
}
```

Why:

* `loose-envify` was used for `production` or `development` 
  contexts, but those was incorporated into package `exports`,
  so is not neccessary.

