import DocumentEditorContext from '#lib/app/SecvisogramPage/View/shared/DocumentEditorContext.js'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import { action } from 'storybook/actions'
import { fn } from 'storybook/test'
import IdAttribute from './IdAttribute'

const replaceDoc = action('replaceDoc')
const updateDoc = action('updateDoc')

const meta = {
  title: 'attributes/IdAttribute',
  component: IdAttribute,

  args: {
    description: 'Some description',
    disabled: false,
    instancePath: ['prop'],
    label: 'Test',
    property: {
      fullName: ['prop'],
      key: 'prop',
      metaInfo: {},
      type: 'STRING',
    },
    value: 'one',
    onCollectIds: fn(() => {
      return Promise.resolve([
        { id: 'one', name: 'one' },
        { id: 'two', name: 'two' },
        { id: 'three', name: 'three' },
      ])
    }),
  },

  decorators: [
    (Story) => (
      <DocumentEditorContext.Provider
        value={{
          doc: {},
          collectIds: {
            groupIds: () => {
              action('groupIds')()
              return Promise.resolve([
                { id: 'one', name: 'one' },
                { id: 'two', name: 'two' },
                { id: 'three', name: 'three' },
              ])
            },
            productIds: () => {
              action('groupIds')()
              return Promise.resolve([
                { id: 'one', name: 'one' },
                { id: 'two', name: 'two' },
                { id: 'three', name: 'three' },
              ])
            },
          },
          uiSchemaVersion: 'v2.0',
          errors: [],
          replaceDoc,
          updateDoc,
        }}
      >
        <Story />
      </DocumentEditorContext.Provider>
    ),
  ],
} satisfies Meta<typeof IdAttribute>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
