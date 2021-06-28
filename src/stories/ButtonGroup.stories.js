import { NaButton, NaButtonGroup } from '../components/na-button'

export default {
  title: 'Components/Button/Button Group',
  component: NaButtonGroup,
  argTypes: {
    vertical: {
      control: {
        type: 'boolean',
      },
    },
    block: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const template = (type) => /* html */ `
  <na-button-group v-bind="args">
    <na-button type='${type}'>
      <span>Кнопка 1</span>
    </na-button>
    <na-button type='${type}'>
      <span>Кнопка 2</span>
    </na-button>
    <na-button type='${type}'>
      <span>Кнопка 3</span>
    </na-button>
    <na-button type='${type}'>
      <span>Кнопка 4</span>
    </na-button>
  </na-button-group>
  `

const ButtonGroupSolid = (args) => ({
  components: { NaButton, NaButtonGroup },
  setup() {
    return { args }
  },
  template: template('solid'),
})

export const Solid = ButtonGroupSolid.bind({})
Solid.args = {
  vertical: false,
  block: false,
}

const ButtonGroupBorder = (args) => ({
  components: { NaButton, NaButtonGroup },
  setup() {
    return { args }
  },
  template: template('border'),
})

export const Border = ButtonGroupBorder.bind({})
Border.args = {
  vertical: false,
  block: false,
}
