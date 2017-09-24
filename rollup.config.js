
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    globals: {
      'google-map-service': 'MapService',
      'html-helper': 'Html',
    }
  }
}
