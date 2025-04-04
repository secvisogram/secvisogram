import addFormats from 'ajv-formats'
import Ajv2020 from 'ajv/dist/2020.js'
import cvss_v2_0 from './csafAjv/cvss-v2.0.js'
import cvss_v3_0 from './csafAjv/cvss-v3.0.js'
import cvss_v3_1 from './csafAjv/cvss-v3.1.js'
import cvss_v4_0 from './csafAjv/cvss-v4.0.js'

const csafAjv = new Ajv2020({ strict: false, allErrors: true })
addFormats(csafAjv)
csafAjv.addSchema(cvss_v2_0, 'https://www.first.org/cvss/cvss-v2.0.json')
csafAjv.addSchema(cvss_v3_0, 'https://www.first.org/cvss/cvss-v3.0.json')
csafAjv.addSchema(cvss_v3_1, 'https://www.first.org/cvss/cvss-v3.1.json')
csafAjv.addSchema(cvss_v4_0, 'https://www.first.org/cvss/cvss-v4.0.json')

export default csafAjv
