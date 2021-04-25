import NaBage from "../components/naBage.vue";

export default {
  title: "Bage",
  component: NaBage,
};

const Template = (args) => ({
  components: { NaBage },
  setup() {
    return { args };
  },
  template:
    "<na-bage :color='args.color' :inverse='args.inverse'>99+</na-bage>",
});

export const SingleBage = Template.bind({});

SingleBage.args = {
  color: "primary",
  inverse: false,
};
