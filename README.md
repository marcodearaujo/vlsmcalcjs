# vlsmcalcjs
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/vlsmcalc" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/vlsmcalc.svg" alt="NPM downloads" /></a></span>
[![Build Status](https://travis-ci.org/marcoaraujojunior/vlsmcalcjs.svg?branch=master)](https://travis-ci.org/marcoaraujojunior/vlsmcalcjs)
[![Coverage Status](https://coveralls.io/repos/github/marcoaraujojunior/vlsmcalcjs/badge.svg?branch=master)](https://coveralls.io/github/marcoaraujojunior/vlsmcalcjs?branch=master)

Lib to calc Variable Length Subnet Masking



## Install
npm install vlsmcalc

### Usage
new vlsmcalc(a, b) where, a=subnet size array, b=major network

`var vlsmcalc = require("vlsmcalc")`

`var subnet = new vlsmcalc([20, 30], '192.168.1.0/24')`

