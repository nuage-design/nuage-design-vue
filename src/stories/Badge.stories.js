import NaBadge from "../components/naBadge.vue";

export default {
  title: "Badge",
  component: NaBadge,
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["primary", "success", "info", "warning", "danger", "dark"],
      },
    },
  },
};

const Template = (args) => ({
  components: { NaBadge },
  setup() {
    return { args };
  },
  template: "<na-badge v-bind='args' />",
});

export const Badge = Template.bind({});

Badge.args = {
  value: 100,
  color: "primary",
  inverse: false,
};
