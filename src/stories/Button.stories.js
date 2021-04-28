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
  template: `<na-button v-bind='args'>
      <span>Button</span>
      <na-bage :value='100' inverse :color='args.color'/>
    </na-button>`,
});

export const Button = Template.bind({});

Button.args = {
  value: "Button",
  color: "primary",
};
