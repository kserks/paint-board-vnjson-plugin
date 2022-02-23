import styles           from 'rollup-plugin-styles'
import resolve          from '@rollup/plugin-node-resolve';
import babel            from '@rollup/plugin-babel';


let production = false

export default [

  {
    input: './src/main.js',
    output: [
      {
        file: './public/app.js',
        format: 'iife',
        name: 'paint_board'
      }
    ],
    plugins: [

      styles(),
      resolve(),
      babel({ babelHelpers: 'bundled' })
    ],
    watch: ['./src']

  }


]