# zerotohero
	Node from the bottom up

##DOCS
	
###Namespace
Needs the `global.appRoot` variable defined to the root of the project

###Methods

###get(namespace, filename) -- Not providing a file extension will default to .js 
Gets a resource file

```
	const namespace = require('path/to/namespace folder')

	namespace.get('middleware', 'MyMiddleware')
```

###getPath(namespace, filename)
Gets the path to a resource file

```
	const namespace = require('path/to/namespace folder')

	namespace.getPath('views.partials', 'master.pug')
```

