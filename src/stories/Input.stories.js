import { NaInput } from '../components/na-input'
import { NaButton } from '../components/na-button'
import { ref } from 'vue'

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
  components: { NaInput, NaButton },
  setup() {
    const value = ref('')

    return { args, value }
  },
  template: /*html*/ `
  <na-input v-bind='args' v-model="value" style="width: 200px">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Danger!</template>
    <template #left-side>
      <i class='bx bxs-lock-alt'></i>
    </template>
    <template #right-side>
      <na-button equal size="small" type="transparent">
        <i class="bx bx-low-vision"></i>
      </na-button>
    </template>
  </na-input>

  <p>Value: {{ value }}</p>
  `,
})

export const Input = Template.bind({})

Input.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  state: 'default',
}
