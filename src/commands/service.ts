import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'service',
  description: 'create a service in services directory',
  run: async (toolbox) => {
    const {
      print: { error, info, success },
      parameters,
      template: { generate },
      filesystem,
    } = toolbox

    if (!parameters.first) {
      error('please, insert service´s name')
      return
    }

    info('Info: creating service...\r')

    const etkPackage = filesystem.read('epictoolkitconfig.json', 'json')
    const paschalName =
      parameters.first.charAt(0).toUpperCase() + parameters.first.slice(1)

    if (parameters.options.empty) {
      generate({
        template: 'empty-service.ts.ejs',
        target: `${etkPackage.usecases}/services/${paschalName}Service.ts`,
        props: {
          paschalName,
        },
      })
    } else {
      generate({
        template: 'service.ts.ejs',
        target: `${etkPackage.usecases}/services/${paschalName}Service.ts`,
        props: {
          paschalName,
          camelName:
            parameters.first.charAt(0).toLowerCase() +
            parameters.first.slice(1),
        },
      })
    }

    success('Success: service created with success.')
  },
}

module.exports = command
