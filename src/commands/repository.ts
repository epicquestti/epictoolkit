import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'repository',
  description: 'create a repository in repositories directory',
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
      error('please, insert repository name')
      return
    }

    info('Info: creating repository...\r')

    const paschalName =
      parameters.first.charAt(0).toUpperCase() + parameters.first.slice(1)

    generate({
      template: 'repository.ts.ejs',
      target: `${etkPackage.usecases}/repositories/${paschalName}Repository.ts`,
      props: {
        paschalName,
        artifactDatabaseName: etkPackage.database.artifactDatabaseName,
        artifactDatabaseLocation: etkPackage.database.artifactDatabaseLocation,
      },
    })

    success('Success: repository created with success.')
  },
}

module.exports = command
