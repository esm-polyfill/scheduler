import { defineConfig } from 'rollup'
import alias from '@rollup/plugin-alias'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import {globSync} from 'glob'
import path from 'node:path'



const commonjsOptions = {
    // strictRequires: 'debug',
    esmExternals: true,
    defaultIsModuleExports: false,
    requireReturnsDefault: 'namespace',
}

const aliasOptions = {
    entries: [
        { find: 'scheduler', replacement: '@esm-polyfill/scheduler' },
    ]
}

const externalOptions = [
    '@esm-polyfill/scheduler',
]

const inputDev = Object.fromEntries(
    globSync('node_modules/scheduler-0.23.2/cjs/*.development.js')
    .map((file) => [
        path.relative('node_modules/scheduler-0.23.2/cjs', file,).slice(0, -3),
        file
    ])
)



const confDev = defineConfig({
    external: externalOptions,
    input: {
        ...inputDev,
    },
    output: {
        exports: 'named',
        dir: 'scheduler-0.23.2/esm',
        format: 'esm'
    },
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        alias(aliasOptions),
        commonjs(commonjsOptions),
    ]
})



const inputPro = Object.fromEntries(
    globSync([
        'node_modules/scheduler-0.23.2/cjs/*.production.min.js',
        'node_modules/scheduler-0.23.2/cjs/react-dom.profiling.min.js',
    ])
    .map((file) => [
        path.relative('node_modules/scheduler-0.23.2/cjs', file,).slice(0, -3),
        file
    ])
)


const confPro = defineConfig({
    external: externalOptions,
    input: {
        ...inputPro,
    },
    output: {
        exports: 'named',
        dir: 'scheduler-0.23.2/esm',
        format: 'esm'
    },
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        alias(aliasOptions),
        commonjs(commonjsOptions),
    ]
})

export default [confDev, confPro]