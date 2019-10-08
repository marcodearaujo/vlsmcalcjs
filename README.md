
# vlsmcalcjs
Lib to calc Variable Length Subnet Masking

## Install
npm install vlsmcalc

### Usage
new Subnet(a, b) where, a=subnet size array, b=major network

`var vlsmcalc = require("vlsmcalc")`

`var subnet = new vlsmcalc([20, 30], '192.168.1.0/24')`
