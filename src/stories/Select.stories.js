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
    const isActive = ref(false);
    const items = ref([
      { value: "Option 1", active: false },
      { value: "Option 2", active: false },
      { value: "Option 3", active: false },
      { value: "Option 4", active: false },
      { value: "Option 5", active: false },
    ]);

    const logActivate = (id) => {
      items.value[id].active = true;
      activeItemValue.value = items.value[id].value;
      isActive.value = true;
    };

    return { args, items, logActivate, activeItemValue, isActive };
  },
  template: `
  <na-select v-bind='args' :inputValue="activeItemValue" >
    <na-option :value="items[0].value" @logActivate="logActivate(0)" :active="items[0].active" >
    </na-option>
    <na-option :active="items[1].active" :value="items[1].value" @logActivate="logActivate(1)">
      <template v-slot:left-side>
        <i class='bx bxs-heart'/>
      </template>
    </na-option>
    <na-option :active="items[2].active" :value="items[2].value" @logActivate="logActivate(2)">
      <template v-slot:right-side>
        <i class='bx bxs-heart'/>
      </template>
    </na-option>
    <na-option :active="items[3].active" :value="items[3].value" @logActivate="logActivate(3)">
      <template v-slot:left-side>
        <i class='bx bxs-heart'/>
      </template> 
      <template v-slot:right-side>
        <i class='bx bxs-heart'/>
      </template>
    </na-option>
    <na-option :active="items[4].active" :value="items[4].value" @logActivate="logActivate(4)">
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
