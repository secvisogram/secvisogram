import { getTranslationInMap } from '../lib/shared/languageSpecificTranslation.js'
import { expect } from 'chai'

describe('test language specific translation', function () {
  it('test getTranslationInMap', function () {
    const translationMaps = new Map([
      ['de', new Map([['I18nTestKey', 'translationDe']])],
      ['de-AT', new Map([['I18nTestKey', 'translationAT']])],
      ['en', new Map([['I18nTestKey', 'translationEn']])],
      ['zh-Hans-CN', new Map([['I18nTestKey', 'translationZh-Hans-CN']])],
      ['sr', new Map([['I18nTestKey', 'translationSr']])],
    ])

    expect(
      getTranslationInMap('de', 'I18nTestKey', translationMaps),
      'Translate language code de'
    ).to.equal('translationDe')
    expect(
      getTranslationInMap('de-AT', 'I18nTestKey', translationMaps),
      'Translate language and region code'
    ).to.equal('translationAT')
    expect(
      getTranslationInMap('en', 'I18nTestKey', translationMaps),
      'Translate language code en'
    ).to.equal('translationEn')
    expect(
      getTranslationInMap('en-US', 'I18nTestKey', translationMaps),
      'Fallback to language code en on region us'
    ).to.equal('translationEn')
    expect(
      getTranslationInMap('zh-Hans-CN', 'I18nTestKey', translationMaps),
      'Translate language, region and script code'
    ).to.equal('translationZh-Hans-CN')
    expect(
      getTranslationInMap('sr-Cyrl-RS', 'I18nTestKey', translationMaps),
      'Fallback to language code en on region an sript code'
    ).to.equal('translationSr')
  })
})
