import { NaInput } from '../components/na-input'
const states = ['default', 'success', 'warning', 'danger']

export default {
  title: 'Components/Input',
  component: NaInput,
  argTypes: {
    state: {
      options: states,
      control: {
        type: 'radio',
      },
    },
  },
}

const Template = (args) => ({
  components: { NaInput },
  setup() {
    return { args }
  },
  template: /*html*/ `
  <na-input v-bind='args' style="width: 200px">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Danger!</template>
  </na-input>`,
})

export const Input = Template.bind({})

Input.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  state: 'default',
}
