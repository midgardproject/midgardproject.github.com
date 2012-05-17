---
name: configuration
title: "Application configuration"
---
Application configuration is a configuration file read before Midgard MVC starts where you can define application-wide shared configuration settings, including overriding Midgard MVC default configurations. The components used with an application are defined in the application configuration file.

The application configuration is by default located in the root of your Midgard MVC installation directory in a YAML file called _application.yml_. Example:

    name: Example Blog
    components:
      midgardmvc_core:
        - {type: github, user: midgardproject, repository: midgardmvc_core, branch: master}
      org_midgardproject_projectsite:
        - {type: github, user: midgardproject, repository: org_midgardproject_projectsite, branch: master}
    services_dispatcher: midgard2
    providers_component: midgardmvc

You can also define a custom location for your application configuration file by setting _midgardmvc.application_config_ in your php.ini. Example:

    midgardmvc.application_config=/etc/midgard2/example.yml

Please note that only the components specified in your Application YAML file (and their dependencies) will be available in this Midgard MVC instance.
