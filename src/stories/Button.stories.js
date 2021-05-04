import NaButton from "../components/naButton.vue";
import NaBadge from "../components/naBadge.vue";
import "boxicons";

export default {
  title: "Button",
  component: NaButton,
  argTypes: {
    style: {
      control: {
        type: "radio",
        options: ["solid", "border", "transparent"],
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
      <i class='bx bxs-coffee' style='font-size: 24px;'></i>
      <span>${args.text}</span>
    </na-button>
    <br/>
    <na-button v-bind="args">
      <span>${args.text}</span>
      <na-badge :value="100" :color="args.color" />
    </na-button>
    `,
});

export const Button = Template.bind({});

Button.args = {
  active: false,
  text: "Button",
};
