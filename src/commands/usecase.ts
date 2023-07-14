import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'usecase',
  description: 'Create a full usecase CRUD oprations.',
  alias: 'u',
  run: async (toolbox) => {
    const {
      parameters,
      print: { info, error, success, checkmark, xmark },
      template: { generate },
      filesystem,
    } = toolbox

    const etkPackage = filesystem.read('epictoolkitconfig.json', 'json')
    if (!etkPackage) {
      error('please, initiate with etk init command')
      return
    }

    if (!parameters.first) {
      error(`${xmark} please, insert usecase´s name`)
      return
    }

    const paschalName =
      parameters.first.charAt(0).toUpperCase() + parameters.first.slice(1)
    const camelName =
      parameters.first.charAt(0).toLowerCase() + parameters.first.slice(1)

    info(`Info: creating full usecase ${paschalName}...`)

    if (etkPackage.type === 'next') {
      generate({
        template: 'index-next-controllers.ts.ejs',
        target: `${etkPackage.usecases}/controllers/${paschalName}/index.ts`,
        props: {
          camelName,
          paschalName,
        },
      })

      generate({
        template: 'usecase-next-controller.ts.ejs',
        target: `${etkPackage.usecases}/controllers/${camelName}/${paschalName}Controller.ts`,
        props: {
          camelName,
          paschalName,
          defaultResponseLocal: etkPackage.defaultResponseLocal,
        },
      })
    } else {
      generate({
        template: 'usecase-controller.ts.ejs',
        target: `${etkPackage.usecases}/controllers/${paschalName}Controller.ts`,
        props: {
          camelName,
          paschalName,
          defaultResponseLocal: etkPackage.defaultResponseLocal,
        },
      })
    }

    success(`${checkmark} Success: ${paschalName}Controller created\r`)

    generate({
      template: 'usecase-service.ts.ejs',
      target: `${etkPackage.usecases}/services/${paschalName}Service.ts`,
      props: {
        paschalName,
        camelName,
        defaultResponseLocal: etkPackage.defaultResponseLocal,
      },
    })

    success(`${checkmark} Success: ${paschalName}Service created\r`)

    generate({
      template: 'usecase-repository.ts.ejs',
      target: `${etkPackage.usecases}/repositories/${paschalName}Repository.ts`,
      props: {
        camelName,
        paschalName,
        artifactDatabaseName: etkPackage.database.artifactDatabaseName,
        artifactDatabaseLocation: etkPackage.database.artifactDatabaseLocation,
      },
    })

    success(`${checkmark} Success: ${paschalName}Repository created\r`)

    generate({
      template: 'validation.ts.ejs',
      target: `${etkPackage.usecases}/validations/${camelName}/create${paschalName}Validation.ts`,
      props: {
        camelName: `create${paschalName}`,
      },
    })

    generate({
      template: 'validation.ts.ejs',
      target: `${etkPackage.usecases}/validations/${camelName}/update${paschalName}Validation.ts`,
      props: {
        camelName: `update${paschalName}`,
      },
    })

    generate({
      template: 'validation.ts.ejs',
      target: `${etkPackage.usecases}/validations/${camelName}/get${paschalName}ByIdValidation.ts`,
      props: {
        camelName: `get${paschalName}ById`,
      },
    })

    generate({
      template: 'validation.ts.ejs',
      target: `${etkPackage.usecases}/validations/${camelName}/delete${paschalName}Validation.ts`,
      props: {
        camelName: `delete${paschalName}`,
      },
    })

    generate({
      template: 'validation.ts.ejs',
      target: `${etkPackage.usecases}/validations/${camelName}/list${paschalName}Validation.ts`,
      props: {
        camelName: `list${paschalName}`,
      },
    })

    success(`${checkmark} Success: usecase ${paschalName} validation created`)
  },
}

module.exports = command
