// This patch is run from post-install script and it is a temporary hack until a pending PR is merged
// More details here: 
// https://github.com/vuejs/vue-apollo/issues/1011

const fs = require('fs')
const path = require('path')

const loadTrackingPath = path.resolve(
  __dirname,
  '../node_modules/@vue/apollo-composable/dist/util/loadingTracking.js'
)

fs.writeFileSync(
  loadTrackingPath,
  fs.readFileSync(loadTrackingPath, 'utf8').replace(/\.\$root/m, '.root')
)

const useQueryPath = path.resolve(
  __dirname,
  '../node_modules/@vue/apollo-composable/dist/useQuery.js'
)

fs.writeFileSync(
  useQueryPath,
  fs
    .readFileSync(useQueryPath, 'utf8')
    .replace(/(^.*onServerPrefetch)/m, '$1=()=>{}; $1')
    .replace(/(.* require\("vue"\);)/m, '')
    .replace(/^.*(nextTick)/m, 'vue_demi_1.$1')
)