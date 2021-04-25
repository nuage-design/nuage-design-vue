import NaBage from "../components/naBage.vue";

export default {
  title: "Bage",
  component: NaBage,
};

const Template = (args) => ({
  components: { NaBage },
  setup() {
    return { args };
  },
  template: "<na-bage v-bind='args' />",
});

export const Bage = Template.bind({});

Bage.args = {
  value: 3,
  color: "primary",
  inverse: false,
};
