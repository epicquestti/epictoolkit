# epictoolkit CLI

A CLI created by Epic Quest TI for internal use by the Epic Quest TI team

### Installation

```shell
$ npm i -g epictoolkit
```

### Available commands

To run a command start with <code>etk</code> followed by one of the following commands and options

#### init

```shell
$ etk init
```

Start epic toolkit by creating the epic toolkit config file. File required for the operation of the cli. The init option must be executed indicating one of the valid and mandatory project options. They are --api, --next.

```shell
$ etk init --api OR --next
```

#### controller

```shell
$ etk controller controllerName
```

Creates a new "Controller" with the name entered after the controller command. It also adds the import of a service like this with its injection inside the controller in question. To create an empty controller add the "empty" option after the controller name as described below.

```shell
$ etk controller controllerName --empty
```

#### service

```shell
$ etk service serviceName
```

Creates a new "Service" with the name entered after the controller command. It also adds the import of a repository like this with its injection inside the service in question. To create an empty service add the "empty" option after the service name as described below.

```shell
$ etk service controllerName --empty
```

#### repository

```shell
$ etk repository repositoryName
```

Creates a new "Repository" with the name entered after the repository.

#### usecase

```shell
$ etk usecase usecaseName
```

Create a complete use case with the name entered as the first parameter, which is mandatory. A complete use case consists of creating all the necessary files (controller, validations, service, repository) with the name provided as a parameter and with the necessary functions to contemplate a CRUD (create, read, update, delete).

# License

MIT - see LICENSE
