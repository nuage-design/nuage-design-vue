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
      { value: "Option 1", active: false },
      { value: "Option 2", active: false },
      { value: "Option 3", active: false },
      { value: `Option 4`, active: false },
      { value: "Option 5", active: false },
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
  <na-select v-bind='args' :value="value" style="width: 250px">
    <template #message-default>Help me</template>
    <template #message-success>You are good man!</template>
    <template #message-warning>Don't worry, be happy! Don't worry, be happy!</template>
    <template #message-danger>Блять!</template>

    <na-option :value="items[0].value" @activate="activate(0)" :active="items[0].active" >
    </na-option>
    <na-option disabled :active="items[1].active" :value="items[1].value" @activate="activate(1)">
      <template v-slot:left-side>
        <i class='bx bxs-heart'/>
      </template>
    </na-option>
    <na-option :active="items[2].active" :value="items[2].value" @activate="activate(2)">
      <template v-slot:right-side>
        <i class='bx bxs-heart'/>
      </template>
    </na-option>
    <na-option :active="items[3].active" :value="items[3].value" @activate="activate(3)">
      <template v-slot:left-side>
        <i class='bx bxs-heart'/>
      </template> 
      <template v-slot:right-side>
        <na-badge :value="100"></na-badge>
      </template>
    </na-option>
    <na-option :active="items[4].active" :value="items[4].value" @activate="activate(4)">
      <template v-slot:right-side>
        <na-badge :value="100"></na-badge>
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
