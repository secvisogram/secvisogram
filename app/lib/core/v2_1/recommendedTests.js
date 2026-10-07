/**
 * @file Bundles the CSAF 2.1 recommended tests used by the browser bundle.
 *
 * Each test is imported directly from its own file instead of via the
 * `recommendedTests.js` barrel file of `@secvisogram/csaf-validator-lib`.
 * That barrel file re-exports every recommended test, including
 * `recommendedTest_6_2_55`, which must be excluded here (see note below).
 * Importing it transitively via the barrel would still make Webpack
 * discover and try to build it, even if the resulting binding is never used.
 */

import { recommendedTest_6_2_1 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_1.js'
import { recommendedTest_6_2_2 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_2.js'
import { recommendedTest_6_2_3 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_3.js'
import { recommendedTest_6_2_4 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_4.js'
import { recommendedTest_6_2_5 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_5.js'
import { recommendedTest_6_2_6 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_6.js'
import { recommendedTest_6_2_7 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_7.js'
import { recommendedTest_6_2_8 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_8.js'
import { recommendedTest_6_2_9 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_9.js'
import { recommendedTest_6_2_10 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_10.js'
import { recommendedTest_6_2_11 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_11.js'
import { recommendedTest_6_2_12 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_12.js'
import { recommendedTest_6_2_13 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_13.js'
import { recommendedTest_6_2_14 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_14.js'
import { recommendedTest_6_2_15 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_15.js'
import { recommendedTest_6_2_16 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_16.js'
import { recommendedTest_6_2_17 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_17.js'
import { recommendedTest_6_2_18 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_18.js'
import { recommendedTest_6_2_19 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_19.js'
import { recommendedTest_6_2_21 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_21.js'
import { recommendedTest_6_2_22 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_22.js'
import { recommendedTest_6_2_23 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_23.js'
import { recommendedTest_6_2_25 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_25.js'
import { recommendedTest_6_2_27 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_27.js'
import { recommendedTest_6_2_28 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_28.js'
import { recommendedTest_6_2_29 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_29.js'
import { recommendedTest_6_2_30 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_30.js'
import { recommendedTest_6_2_32 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_32.js'
import { recommendedTest_6_2_33 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_33.js'
import { recommendedTest_6_2_36 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_36.js'
import { recommendedTest_6_2_38 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_38.js'
import { recommendedTest_6_2_39_2 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_2.js'
import { recommendedTest_6_2_39_3 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_3.js'
import { recommendedTest_6_2_39_4 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_4.js'
import { recommendedTest_6_2_39_5 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_5.js'
// import { recommendedTest_6_2_39_6 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_6.js'
// import { recommendedTest_6_2_39_7 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_7.js'
// import { recommendedTest_6_2_39_8 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_8.js'
// import { recommendedTest_6_2_39_9 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_9.js'
// import { recommendedTest_6_2_39_10 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_10.js'
// import { recommendedTest_6_2_39_11 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_11.js'
// import { recommendedTest_6_2_39_12 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_12.js'
// import { recommendedTest_6_2_39_13 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_39_13.js'
import { recommendedTest_6_2_40 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_40.js'
import { recommendedTest_6_2_41 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_41.js'
import { recommendedTest_6_2_42 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_42.js'
import { recommendedTest_6_2_43 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_43.js'
import { recommendedTest_6_2_47 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_47.js'
import { recommendedTest_6_2_48 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_48.js'
import { recommendedTest_6_2_49 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_49.js'
import { recommendedTest_6_2_52 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_52.js'
import { recommendedTest_6_2_53 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_53.js'
import { recommendedTest_6_2_54_3 } from '@secvisogram/csaf-validator-lib/csaf_2_1/recommendedTests/recommendedTest_6_2_54_3.js'
// Note: `recommendedTest_6_2_55` is intentionally NOT imported here (and must
// not be imported via the `recommendedTests.js` barrel file either, which
// re-exports it). It transitively imports `testURL.js`, which dynamically
// imports `node:module` to read a User-Agent header. Webpack statically
// discovers and tries to build that module for the browser bundle regardless
// of whether the test is actually invoked, which fails with
// `ERROR in node:module ... UnhandledSchemeError`.

/** @type {import('@secvisogram/csaf-validator-lib/lib/shared/types.js').DocumentTest[]} */
export const recommendedTests = [
  recommendedTest_6_2_1,
  recommendedTest_6_2_2,
  recommendedTest_6_2_3,
  recommendedTest_6_2_4,
  recommendedTest_6_2_5,
  recommendedTest_6_2_6,
  recommendedTest_6_2_7,
  recommendedTest_6_2_8,
  recommendedTest_6_2_9,
  recommendedTest_6_2_10,
  recommendedTest_6_2_11,
  recommendedTest_6_2_12,
  recommendedTest_6_2_13,
  recommendedTest_6_2_14,
  recommendedTest_6_2_15,
  recommendedTest_6_2_16,
  recommendedTest_6_2_17,
  recommendedTest_6_2_18,
  recommendedTest_6_2_19,
  recommendedTest_6_2_21,
  recommendedTest_6_2_22,
  recommendedTest_6_2_23,
  recommendedTest_6_2_25,
  recommendedTest_6_2_27,
  recommendedTest_6_2_28,
  recommendedTest_6_2_29,
  recommendedTest_6_2_30,
  recommendedTest_6_2_32,
  recommendedTest_6_2_33,
  recommendedTest_6_2_36,
  recommendedTest_6_2_38,
  recommendedTest_6_2_39_2,
  recommendedTest_6_2_39_3,
  recommendedTest_6_2_39_4,
  recommendedTest_6_2_39_5,
  // recommendedTest_6_2_39_6,
  // recommendedTest_6_2_39_7,
  // recommendedTest_6_2_39_8,
  // recommendedTest_6_2_39_9,
  // recommendedTest_6_2_39_10,
  // recommendedTest_6_2_39_11,
  // recommendedTest_6_2_39_12,
  // recommendedTest_6_2_39_13,
  recommendedTest_6_2_40,
  recommendedTest_6_2_41,
  recommendedTest_6_2_42,
  recommendedTest_6_2_43,
  recommendedTest_6_2_47,
  recommendedTest_6_2_48,
  recommendedTest_6_2_49,
  recommendedTest_6_2_52,
  recommendedTest_6_2_53,
  recommendedTest_6_2_54_3,
]
