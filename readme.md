# epictoolkit CLI v1.2.22

A CLI created by Epic Quest TI for internal use by the Epic Quest TI team

### installation

```shell
$ npm i -g epictoolkit
```

### update

```shell
$ npm update -g epictoolkit
```

### Available commands

To run a command start with <code>etk</code> followed by one of the following commands and options

#### init

```shell
$ etk init --api OR --next OR --nextron
```

Start epic toolkit by creating the epic toolkit config file. File required for the operation of the cli. The init option must be executed indicating one of the valid and mandatory project options. They are --api, --next and --nextron.

#### controller

```shell
$ etk controller "controllerName"
```

Creates a new "Controller" with the name entered after the controller command.

```shell
$ etk controller "controllerName" --inject
```

Creates a new "Controller" with the name inserted after the controller command, also inserts the import line of a new service at the top of the file and injects this service in the constructor parameter of the class

#### service

```shell
$ etk service "serviceName"
```

Creates a new "Service" with the name entered after the service command.

```shell
$ etk service "serviceName" --inject
```

Creates a new "Service" with the name inserted after the service command, also inserts the import line of a new repository at the top of the file and injects this repository in the constructor parameter of the class

#### provider

```shell
$ etk provider "serviceName"
```

Creates a new "Provider" with the name entered after the provider command.

#### repository

```shell
$ etk repository "repositoryName"
```

Creates a new "Repository" with the name entered after the repository.

#### usecase

```shell
$ etk usecase "usecaseName"
```

Create a complete use case with the name entered as the first parameter, which is mandatory. A complete use case consists of creating all the necessary files (controller, validations, service, repository) with the name provided as a parameter and with the necessary functions to contemplate a CRUD (create, read, update, delete).

#### epictoolkitconfig

epictoolkitconfig.json contains definitions that will be used by the aforementioned commands.

```shell
epictoolkitconfig {
    "database": {
    "artifactDatabaseName": "client",                       //name that is used to call database client
    "artifactDatabaseLocation": "../../lib/backend/prisma", //location where database client is
    "type": "prisma"                                        //database type that project use. Available options: "prisma", "papr"
  },
  "type": "api",                                            //project type. Available options: "api", "next" and "nextron"
  "usecases": "src/usecases",                               //usecase folder location
  "defaultResponseLocal": "../../types/defaultResponse"     //default response type used in controller, service and provider.
}
```

The settings directly affect the operation, epictoolkitconfig.database.artifactDatabaseLocation determines the location that will be used in all your repositories as well as epictoolkitconfig.database.artifactDatabaseName will determine the name of your database client import also in all your repositories. We also have epictoolkitconfig.defaultResponseLocal which determines where the default type used by controller.

# License

MIT - see LICENSE
