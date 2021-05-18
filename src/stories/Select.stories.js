import { NaSelect, NaOption } from "../components/na-select";
import NaBadge from "../components/na-badge";
import "boxicons";
import { ref } from "vue";

export default {
  title: "Components/Select",
  component: NaSelect,
};

const Template = (args) => ({
  components: { NaSelect, NaOption, NaBadge },
  setup() {
    const activeItemValue = ref("");
    const items = ref([
      { value: "Option 1", active: false },
      { value: "Option 2", active: false },
      { value: "Option 3", active: false },
      { value: "Option 4", active: false },
      { value: "Option 5", active: false },
    ]);

    const opened = ref(false);

    const activate = (id) => {
      items.value.forEach((item) => {
        item.active = false;
      });
      items.value[id].active = true;
      activeItemValue.value = items.value[id].value;
      opened.value = false;
    };

    return { args, items, activate, activeItemValue, opened };
  },
  template: `
  <na-select v-bind='args' :inputValue="activeItemValue" :opened="opened">
    <na-option :value="items[0].value" @activate="activate(0)" :active="items[0].active" >
    </na-option>
    <na-option :active="items[1].active" :value="items[1].value" @activate="activate(1)">
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
        <i class='bx bxs-heart'/>
      </template>
    </na-option>
    <na-option :active="items[4].active" :value="items[4].value" @activate="activate(4)">
      <template v-slot:right-side>
        <na-badge :value="100" />
      </template>
    </na-option>
  </na-select>
  `,
});

export const Select = Template.bind({});

Select.args = {
  label: "Label",
};
