import NaButton from "../components/naButton.vue";
import NaBadge from "../components/naBadge.vue";
import "boxicons";

export default {
  title: "Button",
  component: NaButton,
  argTypes: {
    type: {
      control: {
        type: "radio",
        options: ["rounded", "rect", "circle"],
      },
    },
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
    size: {
      control: {
        type: "select",
        options: ["mini", "small", "medium", "large"],
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
    <na-button v-bind="args" disabled>
      <span>${args.text}</span>
    </na-button>
    <br/>
    <na-button v-bind="args">
      <i class='bx bxs-coffee' />
      <span>${args.text}</span>
    </na-button>
    <br/>
    <na-button v-bind="args">
      <span>${args.text}</span>
      <na-badge :value="100" :color="args.color" :size="args.size" />
    </na-button>
    `,
});

export const Button = Template.bind({});

Button.args = {
  active: false,
  text: "Button",
};
