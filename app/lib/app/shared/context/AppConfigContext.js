import React from 'react'

/**
 * @typedef {object} AppConfigContext
 *
 * @property {boolean} loginAvailable
 * @property {string} loginUrl
 * @property {string} logoutUrl
 * @property {string} userInfoUrl
 * @property {string} validatorUrl
 * @property {KeyBindings} keyBindings
 * @property {boolean} configLoaded
 */

/**
 * @typedef {object} KeyBindings
 *
 * @property {string} keySave
 * @property {string} keyValidate
 * @property {string} keyExport
 * @property {string} keyNew
 * @property {string} keyExportStripped
 * @property {string} keyExportNotStripped
 * @property {string} keyExportHtml
 * @property {string} keyExportPdf
 * @property {string} keyFormEditorTab
 * @property {string} keyJsonEditorTab
 * @property {string} keyPreviewTab
 * @property {string} keyCsafDocumentTab
 * @property {string} keyRelevanceLevelMandatory
 * @property {string} keyRelevanceLevelBestPractice
 * @property {string} keyRelevanceLevelWantToHave
 * @property {string} keyRelevanceLevelNiceToKnow
 * @property {string} keyRelevanceLevelOptional
 * @property {string} keyNextError
 */

/** @type {AppConfigContext} */
const defaultValue = {
  loginAvailable: false,
  loginUrl: '',
  logoutUrl: '',
  userInfoUrl: '',
  validatorUrl: '',
  configLoaded: false,
  keyBindings: {
    keySave: 'ctrl+s',
    keyValidate: 'ctrl+alt+v',
    keyExport: 'ctrl+alt+e',
    keyNew: 'ctrl+o',
    keyExportStripped: 'ctrl+e',
    keyExportNotStripped: 'ctrl+shift+e',
    keyExportHtml: 'ctrl+p',
    keyExportPdf: 'ctrl+alt+p',
    keyFormEditorTab: 'ctrl+1',
    keyJsonEditorTab: 'ctrl+2',
    keyPreviewTab: 'ctrl+3',
    keyCsafDocumentTab: 'ctrl+4',
    keyRelevanceLevelMandatory: 'ctrl+shift+1',
    keyRelevanceLevelBestPractice: 'ctrl+shift+2',
    keyRelevanceLevelWantToHave: 'ctrl+shift+3',
    keyRelevanceLevelNiceToKnow: 'ctrl+shift+4',
    keyRelevanceLevelOptional: 'ctrl+shift+5',
    keyNextError: 'f8',
  },
}

export default React.createContext(defaultValue)
