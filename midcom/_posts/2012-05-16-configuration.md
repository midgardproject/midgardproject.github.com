---
name: config
title: "Component configuration"
---
MidCOM components use a configuration system to make their behaviour customizable. The configuration system is based on defining _configuration keys_ with values that the site builder can change.

The configuration can be modified on three different levels:

* Global configuration shipping with the component: stored in files
* Sitegroup -specific configuration: stored in snippets
* Folder -specific configuration: stored in folder parameters

## Configuration file format

The file format used for the configuration file and the sitegroup configuration snippets is in the [PHP associative array][1] format but without the starting `<?php` tags:

    'results_per_page' => 10,

## Component's default configuration

The default values for component's configuration reside in the component's `config/config.inc` file.

## Sitegroup-specific configuration

Custom configuration snippets for MidCOM components can be placed in `config` snippet, which is placed in snippet directory `/sitegroup-config/<component name>/`. This can be done eg. in Asgard on the _Snippets_ tab.

In most components, it is possible to define the default Datamanager2 schema of the sitegroup and - depending on the component - define an array of schemas to choose from in component configuration.

[1]: http://www.php.net/manual/en/language.types.array.php
