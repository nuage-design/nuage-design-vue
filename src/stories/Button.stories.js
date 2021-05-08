import { NaButton } from "../components/na-button";
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

// export const ButtonGroup = (args) => ({
//   components: { NaButton, NaButtonGroup },
//   setup() {
//     return { args };
//   },
//   template: `
//   <na-button-group>
//     <na-button></na-button>
//   </na-button-group>
//   `,
// });
