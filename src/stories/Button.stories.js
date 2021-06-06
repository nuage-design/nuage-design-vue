import { NaButton, NaButtonGroup } from '../components/na-button'
import 'boxicons'

const shapes = ['rounded', 'rect', 'circle']
const styles = ['solid', 'border', 'transparent']
const sizes = ['small', 'default', 'large', 'xl']

export default {
  title: 'Components/Button',
  component: NaButton,
  argTypes: {
    shape: {
      options: shapes,
      control: {
        type: 'radio',
      },
    },
    type: {
      options: styles,
      control: {
        type: 'radio',
      },
    },
    size: {
      options: sizes,
      control: {
        type: 'radio',
      },
    },
  },
}

export const Button = (args) => ({
  components: { NaButton },
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
    <i class='bx bx-heart' />
  </na-button>
  `,
})

Button.args = {
  text: 'Button',
}

export const ButtonGroup = (args) => ({
  components: { NaButton, NaButtonGroup },
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
      <i class='bx bx-heart' />
    </na-button>
  </na-button-group>
  `,
})

ButtonGroup.args = {
  text: 'Button',
  vertical: false,
}
