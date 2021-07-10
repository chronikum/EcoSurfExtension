Surf sustainable. EcoSurf.  
Winner of the Google Challenge at Collabothon 2021.
# EcoSurf V1

**This is ecosurf V1!**  
In the hackathon beta, we did consider to built it in a privacy focused design.  
But we did not had enough time. So we thought about how to make it harder for us to track the user.  
We came up with an idea and this is the first implementation of it.  
Our implementation is heavily inspired by [haveibeenpwned](https://haveibeenpwned.com/Privacy) password handling.  
We will never see the hash of the full url you visited.  
This also increases the overhead of information sent back to you a little, but it is marginal.  
We implemented better compression to reduce to overhead.  
You can find out more about it on https://ecosurf.io/privacy-practices.  
It will be improved in the future if this should be necessary.  


This is a project work in progress developed during the hackathon https://collabothon.eu in 2021.  
Special thanks to the fantastic coding school [42heilbronn](https://42heilbronn.de), which provided the team EcoSurf not only with
room to hack in, but also with food, hardware and even dorms for a few people.

We welcome contribution to our project.

You can download the extension right here or soon in the Chrome Web Store.  
If you download it, select "Load unpacked extension".  

if you download it manually, we recommend you checking this site for updates regulary.  

Thank you for your interest in our work 🌍


## **Licenses:**

## Datasets

**Green Web Dataset**

The Green Web Datasets are being publicy offered by the thegreenwebfoundation.org.
You can find them here:

https://admin.thegreenwebfoundation.org/admin/green-urls


**HTTPArchive Dataset**

HTTPArchive also is a important part for our solution to the challenge.  
You can find their website here: https://httparchive.org  
We used this tutorial the make the data usable and we removed not important parts for us.  
We are planning to automate this, but it will take time.

https://github.com/HTTPArchive/httparchive.org/blob/main/docs/gettingstarted_bigquery.md

Also, you can find general information here:  
https://httparchive.org/reports/page-weight?start=2017_02_15&end=latest&view=list

## Third Party Code and Packages

Also, we are using different other open source projects we would like to attribute.
We will attribute every open source project we used.  
There can be duplicates inside.
**The table was created with a script**, so please be aware that we use information which can be automatically  
obtained by the package information file. It may contain errors.

Thank you very much for the contribution to open source!


module name                          |  license              |  repository
-------------------------------------|-----------------------|---------------------------------------------------------------
abbrev@1.1.1                         |  ISC                  |  https://github.com/isaacs/abbrev-js
ansi-styles@3.2.1                    |  MIT                  |  https://github.com/chalk/ansi-styles
array-find-index@1.0.2               |  MIT                  |  https://github.com/sindresorhus/array-find-index
asap@2.0.6                           |  MIT                  |  https://github.com/kriskowal/asap
balanced-match@1.0.2                 |  MIT                  |  https://github.com/juliangruber/balanced-match
brace-expansion@1.1.11               |  MIT                  |  https://github.com/juliangruber/brace-expansion
chalk@2.4.2                          |  MIT                  |  https://github.com/chalk/chalk
color-convert@1.9.3                  |  MIT                  |  https://github.com/Qix-/color-convert
color-name@1.1.3                     |  MIT                  |  https://github.com/dfcreative/color-name
concat-map@0.0.1                     |  MIT                  |  https://github.com/substack/node-concat-map
debug@3.2.7                          |  MIT                  |  https://github.com/visionmedia/debug
debuglog@1.0.1                       |  MIT                  |  https://github.com/sam-github/node-debuglog
dezalgo@1.0.3                        |  ISC                  |  https://github.com/npm/dezalgo
escape-string-regexp@1.0.5           |  MIT                  |  https://github.com/sindresorhus/escape-string-regexp
fs.realpath@1.0.0                    |  ISC                  |  https://github.com/isaacs/fs.realpath
function-bind@1.1.1                  |  MIT                  |  https://github.com/Raynos/function-bind
glob@7.1.7                           |  ISC                  |  https://github.com/isaacs/node-glob
graceful-fs@4.2.6                    |  ISC                  |  https://github.com/isaacs/node-graceful-fs
has-flag@3.0.0                       |  MIT                  |  https://github.com/sindresorhus/has-flag
has@1.0.3                            |  MIT                  |  https://github.com/tarruda/has
hosted-git-info@2.8.9                |  ISC                  |  https://github.com/npm/hosted-git-info
inflight@1.0.6                       |  ISC                  |  https://github.com/npm/inflight
inherits@2.0.4                       |  ISC                  |  https://github.com/isaacs/inherits
is-core-module@2.4.0                 |  MIT                  |  https://github.com/inspect-js/is-core-module
json-parse-even-better-errors@2.3.1  |  MIT                  |  https://github.com/npm/json-parse-even-better-errors
license-checker@25.0.1               |  BSD-3-Clause         |  https://github.com/davglass/license-checker
minimatch@3.0.4                      |  ISC                  |  https://github.com/isaacs/minimatch
minimist@1.2.5                       |  MIT                  |  https://github.com/substack/minimist
mkdirp@0.5.5                         |  MIT                  |  https://github.com/substack/node-mkdirp
ms@2.1.3                             |  MIT                  |  https://github.com/vercel/ms
nopt@4.0.3                           |  ISC                  |  https://github.com/npm/nopt
normalize-package-data@2.5.0         |  BSD-2-Clause         |  https://github.com/npm/normalize-package-data
npm-normalize-package-bin@1.0.1      |  ISC                  |  https://github.com/npm/npm-normalize-package-bin
once@1.4.0                           |  ISC                  |  https://github.com/isaacs/once
os-homedir@1.0.2                     |  MIT                  |  https://github.com/sindresorhus/os-homedir
os-tmpdir@1.0.2                      |  MIT                  |  https://github.com/sindresorhus/os-tmpdir
osenv@0.1.5                          |  ISC                  |  https://github.com/npm/osenv
path-is-absolute@1.0.1               |  MIT                  |  https://github.com/sindresorhus/path-is-absolute
path-parse@1.0.7                     |  MIT                  |  https://github.com/jbgutierrez/path-parse
read-installed@4.0.3                 |  ISC                  |  https://github.com/isaacs/read-installed
read-package-json@2.1.2              |  ISC                  |  https://github.com/npm/read-package-json
readdir-scoped-modules@1.1.0         |  ISC                  |  https://github.com/npm/readdir-scoped-modules
resolve@1.20.0                       |  MIT                  |  https://github.com/browserify/resolve
semver@5.7.1                         |  ISC                  |  https://github.com/npm/node-semver
slide@1.1.6                          |  ISC                  |  https://github.com/isaacs/slide-flow-control
spdx-compare@1.0.0                   |  MIT                  |  https://github.com/kemitchell/spdx-compare.js
spdx-correct@3.1.1                   |  Apache-2.0           |  https://github.com/jslicense/spdx-correct.js
spdx-exceptions@2.3.0                |  CC-BY-3.0            |  https://github.com/kemitchell/spdx-exceptions.json
spdx-expression-parse@3.0.1          |  MIT                  |  https://github.com/jslicense/spdx-expression-parse.js
spdx-license-ids@3.0.9               |  CC0-1.0              |  https://github.com/jslicense/spdx-license-ids
spdx-ranges@2.1.1                    |  (MIT AND CC-BY-3.0)  |  https://github.com/kemitchell/spdx-ranges.js
spdx-satisfies@4.0.1                 |  MIT                  |  https://github.com/kemitchell/spdx-satisfies.js
supports-color@5.5.0                 |  MIT                  |  https://github.com/chalk/supports-color
treeify@1.1.0                        |  MIT                  |  https://github.com/notatestuser/treeify
util-extend@1.0.3                    |  MIT                  |  https://github.com/isaacs/util-extend
validate-npm-package-license@3.0.4   |  Apache-2.0           |  https://github.com/kemitchell/validate-npm-package-license.js
wrappy@1.0.2                         |  ISC                  |  https://github.com/npm/wrappy
