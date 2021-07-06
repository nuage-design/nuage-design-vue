import { NaSwitch } from '../components/na-switch'

export default {
  title: 'Components/Switch',
  component: NaSwitch,
}

const Template = (args) => ({
  components: { NaSwitch },
  setup() {
    return { args }
  },
  template: /* html */ `
    <na-switch v-bind="args">Switch 1</na-switch><br>
    <na-switch disabled v-bind="args">Switch 2</na-switch><br>
    <na-switch v-bind="args">Switch 3</na-switch><br>
    <na-switch v-bind="args">Switch 4</na-switch><br>
    <na-switch v-bind="args"></na-switch><br>
    <na-switch v-bind="args"></na-switch>
  `,
})

export const Switch = Template.bind({})
Switch.args = {
  value: '',
}
