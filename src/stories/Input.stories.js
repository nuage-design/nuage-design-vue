import { NaInput } from '../components/na-input'

export default {
  title: 'Components/Input',
  component: NaInput,
}

const Template = (args) => ({
  components: { NaInput },
  setup() {
    return { args }
  },
  template: /*html*/ `<na-input v-bind='args'></na-input>`,
})

export const Input = Template.bind({})

Input.args = {
  label: 'Label',
  placeholder: 'Placeholder',
}
