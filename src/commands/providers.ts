import { GluegunCommand, filesystem } from 'gluegun'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'
const command: GluegunCommand = {
  name: 'provider',
  description: 'Create a provider in providers directory.',
  alias: 'p',
  run: async (toolbox: Toolbox) => {
    const {
      print: { error, info, success },
      parameters,
      template: { generate },
    } = toolbox

    if (!parameters.first) {
      error('please, insert provider´s name')
      return
    }

    info('Info: creating controller...\r')
    const etkPackage = filesystem.read('epictoolkitconfig.json', 'json')

    if (!etkPackage) {
      error('please, initiate with etk init command')
      return
    }

    const paschalName =
      parameters.first.charAt(0).toUpperCase() + parameters.first.slice(1)
    const camelName =
      parameters.first.charAt(0).toLowerCase() + parameters.first.slice(1)

    generate({
      template: 'provider.ts.ejs',
      target: `${etkPackage.usecases}/providers/${paschalName}Provider.ts`,
      props: {
        paschalName,
        camelName,
      },
    })

    success('Success: provider created with success.')
  },
}

module.exports = command
