import { NaRadio } from '../components/na-radio'

export default {
  title: 'Components/Radio',
  component: NaRadio,
}

const Template = (args) => ({
  components: { NaRadio },
  setup() {
    return { args }
  },
  template: /* html */ `
    <na-radio name='test' v-bind="args">Radio 1</na-radio><br>
    <na-radio name='test' disabled v-bind="args">Radio 2</na-radio><br>
    <na-radio name='test' v-bind="args">Radio 3</na-radio><br>
    <na-radio name='test' v-bind="args">Radio 4</na-radio><br>
    <na-radio name='test' v-bind="args"></na-radio><br>
    <na-radio name='test' v-bind="args"></na-radio>
  `,
})

export const Radio = Template.bind({})
Radio.args = {
  value: '',
}
