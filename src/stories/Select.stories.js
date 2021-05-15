import { NaSelect, NaOption } from "../components/na-select";

export default {
  title: "Components/Select",
  component: NaSelect,
};

const Template = (args) => ({
  components: { NaSelect, NaOption },
  setup() {
    return { args };
  },
  template: `
  <na-select v-bind='args'>
    <na-option value="Option 1">Option 1111</na-option>
    <na-option value="Option 2">Option 22</na-option>
    <na-option value="Option 3">Option 333</na-option>
    <na-option value="Option 4">Option 4444</na-option>
    <na-option value="Option 5">Option 555 </na-option>
  </na-select>
  <br/>
  `,
});

export const Select = Template.bind({});

Select.args = {
  label: "Label",
};
