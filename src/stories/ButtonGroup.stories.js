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
    <na-button v-for="item in [1, 2, 3, 4]" :key="item.id" type='${type}'>
      <span>Кнопка {{item}}</span>
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

const ButtonGroupTransparent = (args) => ({
  components: { NaButton, NaButtonGroup },
  setup() {
    return { args }
  },
  template: template('transparent'),
})

export const Transparent = ButtonGroupTransparent.bind({})
Transparent.args = {
  vertical: false,
  block: false,
}
