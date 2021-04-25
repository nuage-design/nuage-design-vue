import NaButton from "../components/naButton.vue";
import NaBage from "../components/naBage.vue";

export default {
  title: "Button",
  component: NaButton,
};

const Template = (args) => ({
  components: { NaButton, NaBage },
  setup() {
    return { args };
  },
  template:
    "<na-button :color='args.color'>Button<na-bage inverse>99+</na-bage></na-button>",
});

export const SingleButton = Template.bind({});

SingleButton.args = {
  color: "primary",
};
