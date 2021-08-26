import { NaTooltip } from '../components/na-tooltip'

const positions = ['top', 'bottom', 'right', 'left']

export default {
  title: 'Components/Tooltip',
  component: NaTooltip,
  argTypes: {
    position: {
      options: positions,
      control: {
        type: 'radio',
      },
    },
  },
}

const Template = (args) => ({
  components: { NaTooltip },
  setup() {
    return { args }
  },
  template: /* html */ `
    <na-tooltip v-bind='args'>Текст текст текст текст текст</na-tooltip>
  `,
})

export const Tooltip = Template.bind({})
Tooltip.args = {
  position: 'top',
}
