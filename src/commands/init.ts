import { GluegunCommand } from 'gluegun'
import { Toolbox } from 'gluegun/build/types/domain/toolbox'

type configTypeProps = {
  database?: {
    artifactDatabaseName: string
    artifactDatabaseLocation: string
    type: string
  }
  type?: string
  usecases?: string
  defaultResponseLocal?: string
}

const command: GluegunCommand = {
  name: 'init',
  alias: 'i',
  description: 'Initiate the epictoolkit necessary structure.',
  run: async (toolbox: Toolbox) => {
    const {
      filesystem,
      print: { info, error, success },
      parameters,
    } = toolbox
    try {
      if (
        !parameters.options.api &&
        !parameters.options.next &&
        !parameters.options.nextron
      )
        throw new Error('Error: Please set an init option\r')

      info('Info: starting epic tookit...\r')

      const configFile: configTypeProps = {}
      let path = ''

      const existSrc = await filesystem.existsAsync('src')
      if (existSrc) path = 'src/'

      if (parameters.options.api) configFile.type = 'api'
      if (parameters.options.next) configFile.type = 'next'

      if (parameters.options.nextron) {
        configFile.type = 'nextron'
        path = 'main/'
      }

      configFile.database = {
        artifactDatabaseLocation: '',
        artifactDatabaseName: '',
        type: '',
      }

      if (
        !parameters.options.database ||
        parameters.options.database === 'prisma'
      )
        configFile.database.type = 'prisma'

      if (parameters.options.database === 'papr')
        configFile.database.type = 'papr'

      configFile.defaultResponseLocal = ''

      path = 'usecases/'

      configFile.usecases = path

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
