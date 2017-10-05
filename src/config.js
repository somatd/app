// const config = __APP_CONFIG__;
//
// export default config;
const ENV = process.env.NODE_ENV;
let config = {};

const appConfigLocal = require('../config/local.js');
const appConfigDev = require('../config/dev.js');

window.configs = {};

if (window.deploy_env !== null ){
  if(window.deploy_env === 'dev_local'){
    config = appConfigDev;
  }
  if(window.deploy_env === 'local'){
    config = appConfigLocal;
  }
}

export default config;
