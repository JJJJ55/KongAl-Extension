// // postcss.config.js
// import prefixer from 'postcss-prefix-selector'
// import tailwindcss from '@tailwindcss/postcss'

// export default {
//   plugins: [
//     tailwindcss(),
//     prefixer({
//       prefix: '#kong-app', // 원하는 클래스명으로 변경
//       transform(prefix, selector, prefixedSelector) {
//         // html, body, :root를 :host로 변경하여 스코프 적용
//         if ([':root', ':host', 'html', 'body'].includes(selector)) {
//           return ':host'
//         }
//         return prefixedSelector
//       },
//     }),
//   ],
// }

import postcssRemToPx from '@thedutchcoder/postcss-rem-to-px'
import postcssPrefixSelector from 'postcss-prefix-selector'
import tailwindcss from '@tailwindcss/postcss'

/**
 * Transforms a CSS selector based on a given prefix.
 * @param {string} prefix - The prefix to apply to the selector.
 * @param {string} selector - The original CSS selector.
 * @param {string} prefixedSelector - The CSS selector with the prefix applied.
 * @returns {string} The transformed CSS selector.
 */
function transformSelector(prefix, selector, prefixedSelector) {
  if ([':root', ':host', 'html', 'body'].includes(selector)) {
    return ':host'
  }
  if (['[data-theme]', '[data-theme=light]', '[data-theme=dark]'].includes(selector)) {
    return `:host ${selector}`
  }
  return prefixedSelector
}

const postcssConfig = {
  plugins: [
    tailwindcss(),
    postcssPrefixSelector({
      prefix: '#kong-app',
      transform: transformSelector,
    }),
    postcssRemToPx(),
  ],
}

export default postcssConfig
