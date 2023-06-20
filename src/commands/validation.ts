import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'validation',
  description: 'Create a validation in validation directory.',
  alias: 'va',
  run: async (toolbox) => {
    const {
      print: { error, info, success },
      parameters,
      template: { generate },
      filesystem,
    } = toolbox

    if (!parameters.first) {
      error('please, insert validation name')
      return
    }

    info('Info: creating validation...\r')

    const etkPackage = filesystem.read('epictoolkitconfig.json', 'json')
    const camelName =
      parameters.first.charAt(0).toLowerCase() + parameters.first.slice(1)

    generate({
      template: 'validation.ts.ejs',
      target: `${etkPackage.usecases}/validations/${camelName}Validation.ts`,
      props: {
        camelName,
      },
    })

    success('Success: validation created with success.')
  },
}

module.exports = command
