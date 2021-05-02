import NaButton from "../components/naButton.vue";
import NaBadge from "../components/naBadge.vue";
import "boxicons";

export default {
  title: "Button",
  component: NaButton,
};

const Template = (args) => ({
  components: { NaButton, NaBadge },
  setup() {
    return { args };
  },
  template: `
    <na-button v-bind="args">
      <span>${args.text}</span>
    </na-button>
    <br/>
    <na-button v-bind="args">
      <i class='bx bx-coffee' style='font-size: 24px;'></i>
      <span>${args.text}</span>
    </na-button>
    <br/>
    <na-button v-bind="args">
      <span>${args.text}</span>
      <na-badge :value="100" /></na-badge>
    </na-button>
    `,
});

export const Button = Template.bind({});

Button.args = {
  active: false,
  text: "Button",
};
