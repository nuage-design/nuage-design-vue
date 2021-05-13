import "../src/styles/_colors.css";
import "../src/styles/_fonts.css";
import "../node_modules/boxicons/css/boxicons.min.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
