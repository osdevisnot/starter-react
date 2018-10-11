/**
 * Note: IMPORTANT !!! IMPORTANT !!! IMPORTANT !!!
 * Generally including babel-polyfill will add all ES6 and ES7 polyfills.
 * But this increases the bundle size too much
 * Hence we prefer selectively importing ONLY needed polyfills here...
 * Please prefer importing polyfill rathen than writing the function definition inline
 */

import 'core-js/modules/es6.string.includes.js'
import 'core-js/modules/es7.string.pad-start.js'
import 'core-js/modules/es6.array.find.js'

import 'url-search-params-polyfill'
import 'react-app-polyfill/ie11'

/**
 * Promise.finally is at proposal stage 4, which is why core-js does not polyfill it by default
 * The conditional check here is needed since promise does not conditionally apply finally polyfill
 */
if (
  typeof Promise === 'undefined' ||
  typeof Promise.prototype === 'undefined' ||
  typeof Promise.prototype.finally === 'undefined'
) {
  require('core-js/modules/es7.promise.finally')
}

const svgClassList = () => {
  if (!('classList' in SVGElement.prototype)) {
    Object.defineProperty(SVGElement.prototype, 'classList', {
      get() {
        return {
          contains: className => {
            return this.className.baseVal.split(' ').indexOf(className) !== -1
          }
        }
      }
    })
  }
}

svgClassList()
