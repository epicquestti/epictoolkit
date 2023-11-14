import { GluegunCommand, filesystem } from 'gluegun'

const command: GluegunCommand = {
  name: 'controller',
  description:
    'Create a controller in the controller´s directory. The "--inject" option can be provided to also add injection of a service of the same name.',
  alias: 'c',
  run: async (toolbox) => {
    const {
      print: { error, info, success },
      parameters,
      template: { generate },
    } = toolbox

    if (!parameters.first) {
      error('please, insert controller´s name')
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

    if (parameters.options.inject) {
      if (etkPackage.type === 'next') {
        generate({
          template: 'next-controller.ts.ejs',
          target: `${etkPackage.usecases}/controllers/${camelName}/${paschalName}Controller.ts`,
          props: {
            paschalName,
            camelName,
          },
        })
      } else {
        generate({
          template: 'controller.ts.ejs',
          target: `${etkPackage.usecases}/controllers/${paschalName}Controller.ts`,
          props: {
            paschalName,
            camelName,
          },
        })
      }
    } else {
      if (etkPackage.type === 'next') {
        generate({
          template: 'empty-controller.ts.ejs',
          target: `${etkPackage.usecases}/controllers/${camelName}/${paschalName}Controller.ts`,
          props: {
            paschalName,
          },
        })
      } else {
        generate({
          template: 'empty-controller.ts.ejs',
          target: `${etkPackage.usecases}/controllers/${paschalName}Controller.ts`,
          props: {
            paschalName,
          },
        })
      }
    }

    success('Success: controller created with success.')
  },
}

module.exports = command
