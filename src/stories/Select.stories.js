import { NaSelect, NaOption, NaOptionGroup } from '../components/na-select'
import 'boxicons'
import { ref } from 'vue'

const states = ['default', 'success', 'warning', 'danger']

export default {
  title: 'Components/Select',
  component: NaSelect,
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
  components: { NaSelect, NaOption, NaOptionGroup },
  setup() {
    const value1 = ref('')
    const value2 = ref('')
    const items = ref([
      { icon: 'bx bxl-html5', value: 'HTML' },
      { icon: 'bx bxl-css3', value: 'CSS' },
      { icon: 'bx bxl-javascript', value: 'JavaScript' },
      { icon: 'bx bxl-vuejs', value: 'Vue', disabled: true },
      { icon: 'bx bxl-sass', value: 'SCSS' },
    ])

    const options = ref([
      { leftIcon: 'bx bxl-html5', value: 'HTML' },
      { leftIcon: 'bx bxl-css3', value: 'CSS', disabled: true },
      { leftIcon: 'bx bxl-javascript', value: 'JavaScript' },
      { leftIcon: 'bx bxl-vuejs', value: 'Vue' },
      { leftIcon: 'bx bxl-sass', value: 'SCSS', title: 'Класс!' },
    ])

    return { args, items, value1, value2, options }
  },
  template: /* html */ `
  <span>Value 1: {{ value1 }}</span><br/>
  <span>Value 2: {{ value2 }}</span>
  <na-select v-bind='args' v-model="value1" style="width: 180px" :options="options">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Danger!</template>
  </na-select>
  <na-select v-bind='args' v-model="value2" style="width: 270px">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Danger!</template>

    <na-option-group label="Группа 1" disabled>
      <na-option
        v-for="(item, index) in items"
        :key="index"
        :value="item.value"
        :disabled="item.disabled"
      >
        <template v-slot:left-side>
          <i :class='item.icon'/>
        </template>
        {{ item.value }} (Группа 1)
      </na-option>
    </na-option-group>
    <na-option-group label="Группа 2">
      <na-option
        v-for="(item, index) in items"
        :key="index"
        :value="item.value"
        :disabled="item.disabled"
      >
        <template v-slot:right-side>
          <i :class='item.icon'/>
        </template>
        {{ item.value }} (Группа 2)
      </na-option>
    </na-option-group>
  </na-select>
  `,
})

export const Select = Template.bind({})

Select.args = {
  filter: true,
  label: 'Label',
  placeholder: 'Select item',
}
