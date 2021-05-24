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
      { icon: "bx bxl-html5", value: "HTML", active: false },
      { icon: "bx bxl-css3", value: "CSS", active: false },
      {
        icon: "bx bxl-javascript",
        value: "JavaScript",
        active: false,
      },
      { icon: "bx bxl-vuejs", value: "Vue", active: false },
      { icon: "bx bxl-sass", value: "SCSS", active: false },
    ]);

    const activate = (id) => {
      items.value.forEach((item) => {
        item.active = false;
      });
      items.value[id].active = true;
      value.value = items.value[id].value;
    };

    return { args, items, activate, value };
  },
  template: `
  <na-select v-bind='args' :value="value" style="width: 200px">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Блять!</template>

    <na-option v-for="(item, index) in items" :key="index" :value="item.value" @activate="activate(index)" :active="item.active" >
      <template v-slot:left-side>
        <i :class='item.icon'/>
      </template>
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
