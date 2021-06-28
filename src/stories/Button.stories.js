import { NaButton } from '../components/na-button'

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

const ButtonTemplate = (args) => ({
  components: { NaButton },
  setup() {
    return { args }
  },
  template: /* html */ `
  <na-button v-bind="args">
    <span>Кнопка</span>
  </na-button>
  `,
})

export const Button = ButtonTemplate.bind({})
