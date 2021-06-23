import { NaBadge } from '../components/na-badge'
import { html } from 'lit-html'

export default {
  title: 'Components/Badge',
  component: NaBadge,
}

const Template = (args) => ({
  components: { NaBadge },
  setup() {
    return { args }
  },
  template: (args) => html`
    <na-badge v-bind="${args}"></na-badge>
  `,
})

export const Badge = Template.bind({})

Badge.args = {
  value: 100,
  size: 'default',
  inverse: false,
}
