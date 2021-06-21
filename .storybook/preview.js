import '../src/styles'
import '../node_modules/boxicons/css/boxicons.css'
import 'boxicons'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
