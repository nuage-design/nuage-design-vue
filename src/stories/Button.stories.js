import NaButton from "../components/naButton.vue";

export default {
  title: "Button",
  component: NaButton,
};

const Template = (args) => ({
  components: { NaButton },
  setup() {
    return { args };
  },
  template: "<na-button :color='args.color'>Button</na-button>",
});

export const SingleButton = Template.bind({});

SingleButton.args = {
  color: "primary",
};
