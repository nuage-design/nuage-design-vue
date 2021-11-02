import { NaBadge } from '../components/na-badge'

export default {
  title: 'Components/Badge',
  component: NaBadge,
}

const Template = (args) => ({
  components: { NaBadge },
  setup() {
    return { args }
  },
  template: /* html */ `
    <na-badge v-bind="args"></na-badge>
  `,
})

export const Badge = Template.bind({})

Badge.args = {
  value: 100,
  inverse: false,
}
