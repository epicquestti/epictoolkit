import { GluegunCommand } from 'gluegun'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'

const command: GluegunCommand = {
  name: 'init',
  description: 'initiate the epictoolkit necessary structure',
  run: async (toolbox: Toolbox) => {
    const {
      filesystem,
      print: { info, error, success },
      parameters,
    } = toolbox
    try {
      if (!parameters.options.api && !parameters.options.next)
        throw new Error('Error: Please set an init option\r')

      info('Info: starting epic tookit...\r')
      const existSrc = await filesystem.existsAsync('src')
      let path = ''

      if (existSrc) path = 'src/usecases'
      else path = 'usecases'

      const configFile: any = {
        database: { artifactDatabaseName: '', artifactDatabaseLocation: '' },
        type: '',
        usecases: '',
      }

      if (parameters.options.api) configFile.type = 'api'
      if (parameters.options.next) configFile.type = 'next'
      if (
        !parameters.options.database ||
        parameters.options.database === 'prisma'
      )
        configFile.database.type = 'prisma'

      if (parameters.options.database === 'papr')
        configFile.database.type = 'papr'

      configFile.database.artifactDatabaseName = ''
      configFile.database.artifactDatabaseLocation = ''
      configFile.usecases = path
      configFile.defaultResponseLocal = ''

      await filesystem.writeAsync('epictoolkitconfig.json', configFile, {
        jsonIndent: 1,
      })

      await filesystem.dirAsync(path)

      const controllerPath = path + '/controllers'
      await filesystem.dirAsync(controllerPath)

      const servicePath = path + '/services'
      await filesystem.dirAsync(servicePath)

      const validationPath = path + '/validations'
      await filesystem.dirAsync(validationPath)

      const repositoryPath = path + '/repositories'
      await filesystem.dirAsync(repositoryPath)

      success('Success: epic toolkit initiated with success\r')
    } catch (err: any) {
      error(err.message)
    }
  },
}

module.exports = command
