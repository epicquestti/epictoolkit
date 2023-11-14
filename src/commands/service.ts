import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'service',
  description:
    'Create a service in the services directory. The "--inject" option can be provided to also add injection of a repository of the same name.',
  alias: 's',
  run: async (toolbox) => {
    const {
      print: { error, info, success },
      parameters,
      template: { generate },
      filesystem,
    } = toolbox

    const etkPackage = filesystem.read('epictoolkitconfig.json', 'json')

    if (!etkPackage) {
      error('please, initiate with etk init command')
      return
    }

    if (!parameters.first) {
      error('please, insert service´s name')
      return
    }

    info('Info: creating service...\r')

    const paschalName =
      parameters.first.charAt(0).toUpperCase() + parameters.first.slice(1)

    if (parameters.options.inject) {
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
    } else {
      generate({
        template: 'empty-service.ts.ejs',
        target: `${etkPackage.usecases}/services/${paschalName}Service.ts`,
        props: {
          paschalName,
        },
      })
    }

    success('Success: service created with success.')
  },
}

module.exports = command
