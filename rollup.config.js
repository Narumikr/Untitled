import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import svgr from '@svgr/rollup'
import copy from 'rollup-plugin-copy'
import tsconfigPaths from 'rollup-plugin-tsconfig-paths'
import babel from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))

/**
 * Automatically adds 'use client' directive to modules matching specific patterns
 */
const includePatterns = [/[\/\\]components[\/\\]/, /[\/\\]hooks[\/\\]/]
const excludePatterns = [/\.module\.scss$/, /\.scss$/]
const setUseClientDirective = () => {
  return {
    name: 'set-use-client',
    renderChunk(code, chunk) {
      const shouldExclude = excludePatterns.some((pattern) =>
        pattern.test(chunk.facadeModuleId || ''),
      )

      if (shouldExclude) {
        return null
      }

      const needsUseClient = includePatterns.some((pattern) =>
        pattern.test(chunk.facadeModuleId || ''),
      )

      if (needsUseClient) {
        return {
          code: `'use client';\n${code}`,
          map: null,
        }
      }
      return null
    },
  }
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    external: (id) => {
      if (id.endsWith('.css') || id.endsWith('.scss')) return false
      return [
        ...Object.keys(pkg.devDependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ...Object.keys(pkg.dependencies || {}),
        /@babel\/runtime\//,
      ].some((dep) => (typeof dep === 'string' ? id.startsWith(dep) : dep.test(id)))
    },
    plugins: [
      tsconfigPaths(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.build.json', declaration: false }),
      babel({
        babelHelpers: 'runtime',
        presets: ['@babel/preset-react'],
        extensions: ['.ts', '.tsx'],
      }),
      postcss({
        extract: 'sekai-style.css',
        modules: {
          auto: /\.module\.scss$/,
        },
        include: ['**/*.css', '**/*.scss', '**/*.module.scss'],
        inject: false,
        use: {
          sass: {
            implementation: (await import('sass')).default,
            silenceDeprecations: ['legacy-js-api'],
          },
        },
        plugins: [(await import('autoprefixer')).default],
      }),
      image(),
      svgr(),
      setUseClientDirective(),
      copy({
        targets: [{ src: 'src/styles/sekai-colors.css', dest: 'dist/color' }],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [
      tsconfigPaths(),
      resolve(),
      dts({
        tsconfig: './tsconfig.build.json',
      }),
      {
        name: 'ignore-css',
        resolveId(source) {
          if (source.endsWith('.css') || source.endsWith('.scss')) return source
        },
        load(id) {
          if (id.endsWith('.css') || id.endsWith('.scss')) return ''
        },
      },
    ],
  },
]
