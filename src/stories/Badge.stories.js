import NaBadge from '../components/na-badge'

const sizes = ['small', 'default', 'large', 'xl']
const colors = ['primary', 'success', 'info', 'warning', 'danger', 'dark']

export default {
  title: 'Components/Badge',
  component: NaBadge,
  argTypes: {
    size: {
      options: sizes,
      control: {
        type: 'select',
      },
    },
    color: {
      options: colors,
      control: {
        type: 'select',
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
  color: 'primary',
  inverse: false,
}
