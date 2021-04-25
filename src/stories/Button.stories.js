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
    "<na-button v-bind='args'>Button<na-bage inverse value='100'/></na-button>",
});

export const Button = Template.bind({});

Button.args = {
  color: "primary",
};
