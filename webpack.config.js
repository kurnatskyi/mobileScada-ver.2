const path =  require('path')

module.exports = {
    mode: 'production',
    entry: {
        filename: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'future__project/data/js'),
        filename: 'script.js'
    }
}