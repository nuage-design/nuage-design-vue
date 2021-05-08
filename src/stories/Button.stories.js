import { NaButton, NaButtonGroup } from "../components/na-button";
import NaBadge from "../components/na-badge";
import "boxicons";

export default {
  title: "Components/Button",
  component: NaButton,
  argTypes: {
    type: {
      control: {
        type: "radio",
        options: ["rounded", "rect", "circle"],
      },
    },
    buttonStyle: {
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

export const Button = (args) => ({
  components: { NaButton, NaBadge },
  setup() {
    return { args };
  },
  template: `<na-button v-bind="args">
    <span>${args.text}</span>
  </na-button>
  <br/>
  <na-button v-bind="args" disabled>
    <span>${args.text}</span>
  </na-button>
  <br/>
  <na-button v-bind="args">
    <i class='bx bx-coffee' />
    <span>${args.text}</span>
  </na-button>
  <br/>
  <na-button v-bind="args">
    <span>${args.text}</span>
    <na-badge :value="100" :color="args.color" :size="args.size" />
  </na-button>`,
});

Button.args = {
  text: "Button",
};

export const ButtonGroup = (args) => ({
  components: { NaButton, NaButtonGroup, NaBadge },
  setup() {
    return { args };
  },
  template: `
  <na-button-group :vertical="args.vertical">
    <na-button v-bind="args">
      <span>${args.text}</span>
    </na-button>
    <na-button v-bind="args" disabled>
      <span>${args.text}</span>
    </na-button>
    <na-button v-bind="args">
      <i class='bx bx-coffee' />
      <span>${args.text}</span>
    </na-button>
    <na-button v-bind="args">
      <span>${args.text}</span>
      <na-badge :value="100" :color="args.color" :size="args.size" />
    </na-button>
  </na-button-group>
  `,
});

ButtonGroup.args = {
  text: "Button",
  vertical: false,
};
