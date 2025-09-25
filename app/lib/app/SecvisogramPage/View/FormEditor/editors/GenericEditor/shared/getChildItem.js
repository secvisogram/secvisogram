import { useUniqueGroupId } from '../../../shared/fillFieldFunctions.js'

function usePrefilledObject() {
  const { uniqueGroupId } = useUniqueGroupId()

  /**
   * @param {import('../../../shared/types').Property} property
   */
  const getPrefilledObject = (property) => {
    const uiType = property.metaData?.uiType
    if (uiType === 'WITH_GENERATED_GROUP_ID') {
      return { group_id: uniqueGroupId() }
    }
    let obj = {}

    property.metaInfo.arrayType?.metaInfo.propertyList?.forEach((p) => {
      if (p.metaData?.uiType === 'WITH_GENERATED_GROUP_ID') {
        // @ts-ignore
        obj[p.key] = { group_id: uniqueGroupId() }
      }
    })

    return obj
  }

  return { getPrefilledObject }
}

export default function useChildItem() {
  const { getPrefilledObject } = usePrefilledObject()

  /**
   * @param {import('../../../shared/types').Property} property
   * @param {string} childType
   */
  const getChildItem = (property, childType) => {
    return childType === 'OBJECT'
      ? getPrefilledObject(property)
      : childType === 'ARRAY'
      ? []
      : childType === 'STRING'
      ? ''
      : null
  }

  return { getChildItem }
}
