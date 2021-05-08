import NaBadge from "../components/na-badge/na-badge.vue";

export default {
  title: "Components/Badge",
  component: NaBadge,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["mini", "small", "medium", "large"],
      },
    },
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
  template: "<na-badge v-bind='args'></na-badge>",
});

export const Badge = Template.bind({});

Badge.args = {
  value: 100,
  color: "primary",
  inverse: false,
};
