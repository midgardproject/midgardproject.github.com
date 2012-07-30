---
name: midgard2-php5
title: "PHP5 extension"
---

PHP5 extension provides language bindings for Midgard2 content repository. All core classes, and MgdSchema ones are available as normal PHP classes.

### Registering classes

In midgard core, all types are registered when connection is opened for specific configuration (either created on application level, or from exisiting config file). This is not valid for PHP, as connection might be opened on application level, but classes can not be registered this way.

Due to the nature of PHP, all midgard classes are registered during module loading phase. It means, it's not possible to register classes after module has been loaded and typical request started (either httpd request or command line application). The possitive part of this behavior are persistent classes available during the whole lifetime of module. There is no need to load files and register classes per every request.So once module has been loaded, every class is available and it's destroyed when main process terminates. Either httpd server or command line application has been stopped. Of course, it means, every mgdschema class, once is registered is available for every application which is running in the main process. For httpd server, like apache, any type is shared among different requests and virtual hosts, so it's not possible to isolate registered types. 

### Setting up the schemas

There are couple of ways to set up the directory which contains schema files with class definitions.

### Core's prefix

By default, all schemas will be read from the share dir (e.g: `/usr/share`, `/usr/local/share`). So if these types has to be registered,there's no need to alter configuration.

### Setting share dir with environmental variable

Sometimes it's needed to register classes from custom directory. Sp different types are registered before application can actually starts.
To make this we need to set environmental variable:

    export MIDGARD_ENV_GLOBAL_SHAREDIR="/full/path/to/share/directory"

### Setting the sharedir in configuration file for multiple virtual hosts.

For multiple virtual hosts, it's recommended to define configuration file in virtual hosts:
In php.ini or in midgard2.ini configuration file these config keys must be added:

    midgard.http On
    midgard.engine On

In virtual host configuration:

    php_admin_value midgard.configuration 'midgard'

The configuration file `midgard` must exists in system configuration directory (`/etc/midgard2/conf.d`). You can also specify a config file from an arbitrary path:

    php_admin_value midgard.configuration_file '/full/path/to/config/file'

In apache httpd environment, all files existing in `/etc/midgard2/conf.d` will be read upon module startup, all classes will be registered and for every configuration,new connection will be implicitly established. Classes will be registered "globally", which means every class will be available for every virtual host. Connection will be available thanks to `php_admin_value` being set in virtual host, and as identified by name, it'll be shared among different virtual hosts with the same configuration name specified.

This way is recommended also for safety reasons. All files in `/etc/midgard2/conf.d` directory can be readable only by root user. And as apache httpd server starts up it's able to read every single configuration with root privileges, and as soon as all its modules (including php) are loaded, the privileges are dropped, so it's not possible to read those files from any code executed within virtual hosts. 

### Setting the sharedir in configuration file for one host or one application.

For single virtual host, configured with lighttpd for example:

In php.ini (or midgard2.ini) these config keys must be added:

    midgard.http Off
    midgard.engine On
    midgard.configuration_file "/absolute/path/to/configuration"

`midgard.http` directive set to Off disables opening new multiple connections implicitly when php module is loaded, but allows to register all classes found in share directory defined in configuration and establish only one connection for given config file.
