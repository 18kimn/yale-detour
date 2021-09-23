const {override, addBundleVisualizer} = require('customize-cra')

module.exports = override(addBundleVisualizer({openAnalyzer: false}))
