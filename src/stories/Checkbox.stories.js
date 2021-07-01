import { NaCheckbox } from '../components/na-checkbox'

export default {
  title: 'Components/Checkbox',
  component: NaCheckbox,
}

const Template = (args) => ({
  components: { NaCheckbox },
  setup() {
    return { args }
  },
  template: /* html */ `
    <na-checkbox v-bind="args">Checkbox 1</na-checkbox><br>
    <na-checkbox v-bind="args">Checkbox 2</na-checkbox><br>
    <na-checkbox v-bind="args">Checkbox 3</na-checkbox><br>
    <na-checkbox v-bind="args">Checkbox 4</na-checkbox>
  `,
})

export const Checkbox = Template.bind({})
Checkbox.args = {
  checked: false,
  disabled: false,
  value: '',
}
