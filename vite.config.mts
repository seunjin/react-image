import {defineConfig} from 'vite'
import pkg from './package.json'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import browserslistToEsbuild from 'browserslist-to-esbuild'
import preserveDirectives from 'rollup-preserve-directives'
import {babel} from '@rollup/plugin-babel'
const SUPPORT_TARGETS = browserslistToEsbuild()
export default defineConfig({
    plugins: [
        babel({
            babelHelpers: 'runtime',
            plugins: [
                ['@babel/plugin-transform-runtime'],
                [
                    'babel-plugin-polyfill-corejs3',
                    {
                        method: 'usage-pure',
                        version: pkg.dependencies['core-js-pure'],
                        proposals: true,
                    },
                ],
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            exclude: 'node_modules/**',
        }),
        react(),
        tsconfigPaths(),
        preserveDirectives(),
    ],

    build: {
        target: SUPPORT_TARGETS,
        outDir: 'dist',
        sourcemap: true,
        lib: {
            entry: {
                index: './src/index.ts',
                react: './src/react.tsx',
                next: './src/next.tsx',
                utils: './src/utils/index.ts',
                types: './src/types/index.ts',
            },
        },
        rollupOptions: {
            external: [
                ...Object.keys(pkg.dependencies),
                ...Object.keys(pkg.peerDependencies).flatMap((dep) => [dep, new RegExp(`^${dep}/.*`)]),
            ],
            output: [
                {
                    format: 'es',
                    dir: 'dist/esm',
                },
                {
                    format: 'cjs',
                    dir: 'dist/cjs',
                },
            ],
        },
    },
})
