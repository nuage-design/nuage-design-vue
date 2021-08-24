import { NaTooltip } from '../components/na-tooltip'

export default {
  title: 'Components/Tooltip',
  component: NaTooltip,
}

const Template = (args) => ({
  components: { NaTooltip },
  setup() {
    return { args }
  },
  template: /* html */ `
    <na-tooltip>Tooltip 1</na-tooltip>
  `,
})

export const Tooltip = Template.bind({})
