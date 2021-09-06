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
  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate sint tempore eos fuga! Ut id dolore reiciendis
  <na-tooltip v-bind='args'>
    <b>aperiam</b>
  </na-tooltip>, distinctio voluptate facilis tempore nemo ex ea ab blanditiis repellat! Saepe, rerum.
  
  `,
})

export const Tooltip = Template.bind({})
Tooltip.args = {
  position: 'top',
}
