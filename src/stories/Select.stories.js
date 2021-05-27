import { NaSelect, NaOption } from "../components/na-select";
import NaBadge from "../components/na-badge";
import "boxicons";
import { ref } from "vue";

const states = ["default", "success", "warning", "danger"];

export default {
  title: "Components/Select",
  component: NaSelect,
  argTypes: {
    state: {
      control: {
        type: "radio",
        options: states,
      },
    },
  },
};

const Template = (args) => ({
  components: { NaSelect, NaOption, NaBadge },
  setup() {
    const value = ref("");
    const items = ref([
      { icon: "bx bxl-html5", value: "HTML" },
      { icon: "bx bxl-css3", value: "CSS" },
      { icon: "bx bxl-javascript", value: "JavaScript" },
      { icon: "bx bxl-vuejs", value: "Vue" },
      { icon: "bx bxl-sass", value: "SCSS" },
    ]);

    return { args, items, value };
  },
  template: `
  <span>Value: {{ value }}</span>
  <na-select v-bind='args' v-model="value" style="width: 200px">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Danger!</template>

    <na-option v-for="(item, index) in items" :key="index" :value="item.value">
      <template v-slot:left-side>
        <i :class='item.icon'/>
      </template>
      {{ item.value }} (select 1)
      <template v-slot:right-side>
        <i :class='item.icon'/>
      </template>
    </na-option>
  </na-select>
  <na-select v-bind='args' v-model="value" style="width: 200px">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Danger!</template>

    <na-option v-for="(item, index) in items" :key="index" :value="item.value">
      <template v-slot:left-side>
        <i :class='item.icon'/>
      </template>
      {{ item.value }} (select 2)
    </na-option>
  </na-select>
  `,
});

export const Select = Template.bind({});

Select.args = {
  filter: true,
  label: "Label",
  placeholder: "Select item",
};
