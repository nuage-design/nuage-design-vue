import { NaButton, NaButtonGroup } from '../components/na-button'
import NaBadge from '../components/na-badge'
import 'boxicons'

const types = ['rounded', 'rect', 'circle']
const styles = ['solid', 'border', 'transparent']
const colors = ['primary', 'success', 'info', 'warning', 'danger', 'dark']
const sizes = ['small', 'default', 'large', 'xl']

export default {
  title: 'Components/Button',
  component: NaButton,
  argTypes: {
    type: {
      options: types,
      control: {
        type: 'radio',
      },
    },
    buttonStyle: {
      options: styles,
      control: {
        type: 'radio',
      },
    },
    color: {
      options: colors,
      control: {
        type: 'select',
      },
    },
    size: {
      options: sizes,
      control: {
        type: 'select',
      },
    },
  },
}

export const Button = (args) => ({
  components: { NaButton, NaBadge },
  setup() {
    return { args }
  },
  template: /*html*/ `
  <na-button v-bind="args">
    <span>${args.text}</span>
  </na-button>
  <br/>
  <na-button v-bind="args" disabled>
    <span>${args.text}</span>
  </na-button>
  <br/>
  <na-button v-bind="args">
    <i class='bx bx-heart' />
    <span>${args.text}</span>
  </na-button>
  <br/>
  <na-button v-bind="args">
    <span>${args.text}</span>
    <na-badge :value="100" :color="args.color" :size="args.size" />
  </na-button>
  `,
})

Button.args = {
  text: 'Button',
}

export const ButtonGroup = (args) => ({
  components: { NaButton, NaButtonGroup, NaBadge },
  setup() {
    return { args }
  },
  template: /*html*/ `
  <na-button-group :vertical="args.vertical">
    <na-button v-bind="args">
      <span>${args.text}</span>
    </na-button>
    <na-button v-bind="args" disabled>
      <span>${args.text}</span>
    </na-button>
    <na-button v-bind="args">
      <i class='bx bx-heart' />
      <span>${args.text}</span>
    </na-button>
    <na-button v-bind="args">
      <span>${args.text}</span>
      <na-badge :value="100" :color="args.color" :size="args.size" />
    </na-button>
  </na-button-group>
  `,
})

ButtonGroup.args = {
  text: 'Button',
  vertical: false,
}
