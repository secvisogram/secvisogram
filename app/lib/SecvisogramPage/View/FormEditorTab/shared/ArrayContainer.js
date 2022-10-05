import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton.js'
import Container from './shared/Container.js'

/** @type {import('../../../../SecvisogramPage').ValidationError[]} */
const EMPTY_ARRAY = []

/**
 * @typedef {Object} ChildProps
 * @property {unknown} value
 * @property {number} index
 * @property {string} instancePath
 * @property {import('../../../../shared/validationTypes').ValidationError[]} validationErrors
 * @property {() => V} defaultValue
 * @property {(instancePath: string, update: {}) => void} onUpdate
 * @template V
 */

/**
 * Calculates the child props and provides controls to add new items.
 *
 * @param {{
 *   value: unknown
 *   instancePath: string
 *   label: string
 *   description: string
 *   collapsible?: boolean
 *   validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *   defaultItemValue(): V
 *   onUpdate(instancePath: string, update: {}): void
 *   onDelete?(): void
 *   children(props: ChildProps<V>): JSX.Element
 * }} props
 * @template V
 */
export default function ArrayContainer({ children, ...props }) {
  /**
   * @param {unknown} v
   * @returns {v is Array<unknown>}
   */
  const isValid = (v) => Array.isArray(v)

  /**
   * Is a memoized map of all validation errors for its children.
   */
  const validationErrorCache = React.useMemo(() => {
    /** @type {Map<number, import('../../../../SecvisogramPage').ValidationError[]>} */
    const c = new Map()
    for (const e of props.validationErrors) {
      if (e.instancePath.startsWith(props.instancePath + '/')) {
        const index = Number(
          parse(e.instancePath)[parse(props.instancePath).length]
        )
        c.set(index, (c.get(index) ?? []).concat([e]))
      }
    }
    return c
  }, [props.instancePath, props.validationErrors])

  return (
    <Container
      {...props}
      defaultValue={() => [props.defaultItemValue()]}
      isValid={isValid}
    >
      {({ value: array }) => (
        <>
          {array.map((value, index) => (
            <div key={index} className="mt-2 first:mt-0">
              {children({
                instancePath: `${props.instancePath}/${index}`,
                value,
                index,
                onUpdate: props.onUpdate,
                defaultValue: props.defaultItemValue,
                validationErrors:
                  validationErrorCache.get(index) ?? EMPTY_ARRAY,
              })}
            </div>
          ))}
          { !(props.section === "Document" && props.isNote) &&
            (
              <div className="mb-2">
              <DefaultButton
                onClick={() => {
                  props.onUpdate(props.instancePath, {
                    $push: [props.defaultItemValue()],
                  })
                }}
              >
              <FontAwesomeIcon icon={faPlus} />
              </DefaultButton>
              </div>
            )
          }          
        </>
      )}
    </Container>
  )
}
