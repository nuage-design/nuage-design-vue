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
  <br><br><br><br>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi placeat omnis, quis, doloremque, alias id quas illum <na-tooltip v-bind='args'>
      <template #message>Lorem ipsum</template>
       <b>DOLOR</b>
        </na-tooltip> animi excepturi perspiciatis. Minima accusamus nesciunt corrupti sequi nulla sapiente, adipisci quaerat.
        <na-tooltip v-bind='args'>
      <template #message>Lorem ipsum</template>
       
    </na-tooltip>
  `,
})

export const Tooltip = Template.bind({})
Tooltip.args = {
  position: 'top',
}
