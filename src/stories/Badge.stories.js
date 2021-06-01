import { NaBadge } from '../components/na-badge'

const sizes = ['small', 'default', 'large']

export default {
  title: 'Components/Badge',
  component: NaBadge,
  argTypes: {
    size: {
      options: sizes,
      control: {
        type: 'radio',
      },
    },
  },
}

const Template = (args) => ({
  components: { NaBadge },
  setup() {
    return { args }
  },
  template: /*html*/ `<na-badge v-bind='args'></na-badge>`,
})

export const Badge = Template.bind({})

Badge.args = {
  value: 100,
  size: 'default',
  inverse: false,
}
