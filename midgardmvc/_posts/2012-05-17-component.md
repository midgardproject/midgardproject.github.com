---
title: "Structure of a component"
name: component
---
A component is a functional module that runs inside Midgard MVC. It is usually run associated to a particular Midgard MVC Node, but can also tack itself to be run alongside another component's Node.

* _componentName_

  * _manifest.yml_: Component's package manifest, routes and signal listener registration
  * _configuration_

    - _defaults.yml_: Component's default configuration, as name-value pairs
  * _controllers_

    - _controllername.php_: A controller class for the component
  * _models_

    - _classname.xml_: [Midgard Schema](/midgard2/#mgdschema) used by the component, registers type classname
    - _classname.php_: PHP class that extends a Midgard Schema
  * _views_

    - _viewname.xml_: Midgard View used by the component, registers view viewname
  * _services_

    - _authentication.php_: component-specific implementation of Midgard MVC Authentication Service (these are rarely needed)
  * _templates_

    - _templatename.xhtml_: A TAL template used by the component, named templatename

### Defining routes

Individual routes (or views) of a component are defined in the component manifest. Midgard MVC takes the route definitions and constructs Route objects out of them.

Routes map between an URL and the corresponding controller class and an action method.

Minimal route definition:

    route_identifier:
     - path: '/some/url'
     - controller: controller class
     - action: action name
     - template_aliases:
     - root: name of template used when "root" is included
     - content: name of template used when "content" is included

#### Route matching

There are several ways Midgard MVC matches Requests to Routes. The matching is handled by providing an Intent to the factory method of the Request class:

*   Explicit matching

        *   In an explicit match we know the component instance, route identifier and arguments
*   Implicit matching

        *   In implicit matching we know one or multiple of:

                *   Route identifier and arguments
        *   URL
        *   Component name
        *   Existing request object
        *   URL patterns

Route path (under a given hierarchy node) is defined with the path property of the route. The paths follow the URL pattern specification.

Variables can be used with URL patterns in the following way:

*   Named variable

        *   -path: '/{$foo}'
    *   With request /bar the controller would be called with `$args['foo'] = 'bar'`
*   Named and typed variable

        *   -path: '/latest/{int:$number}'
    *   With request /latest/5 the controller would be called with `$args['number'] = 5`
*   Unnamed arguments

        *   -path '/file/@'
    *   With request /file/a/b the controller would be called with `$args['variable_arguments'] = array('a', 'b')`

#### Limiting route availability

If you want routes to be accessible only when run on the root folder of the website (/), you can add the following to that route definition:

    routes:
     some_route:
      root_only: true

Another option is to ensure a route is accessible only when used in subrequests (`dynamic_load` and `dynamic_call`) and not accessible directly by browser. This can be achieved by the following in route definition:
    routes:
     some_route:
       subrequest_only: true

The component provider handling route registration will ensure that routes not fitting these limitations will not be registered for the Request.

### Workings of a controller

Controller is a PHP class that contains one or more actions matching route definitions of a component. When invoked, Midgard MVC dispatcher will load the component, instantiate the controller class specified in route definition, passing it the Request object and a reference to request data array, and finally call the action method corresponding to the route used, passing it the arguments from the request.


The controller will then do whatever processing or data fetching it needs to do. Any content the controller wants to pass to a template should be added to the data array. If any errors occur, the controller should throw an exception.

Actions are public methods in a controller class. Action methods are named using pattern `<HTTP verb>_<action name>`, for example `get_article()` or `post_form()`. Action methods will receive the possible URL arguments as an argument containing an array.

Here is a simple example. Route definition from `net_example_calendar/manifest.yml`:

    show_date:
     - path: '/date'
     - controller: net_example_calendar_controllers_date
     - action: date
     - template_aliases:
       - content: show-date

Controller class `net_example__calendar/controllers/date.php`:

    <?php
    class net_example_calendar_controllers_date
    {
      public function __construct(midgardmvc_core_request $request)
      {
        // All controllers receive the Request instance when invoked
        $this->request = $request;
      }

      public function get_date(array $args)
      {
        // Information we want to pass to the template should be set into the data array
        $this->data['date'] = strftime('%x %X');
      }
    }

### Showtime

Once a controller has been run, the next phase in MVC execution is templating. There are two levels of templates used:

*   **Template entry point**: the "whole page" template, which includes a content area by having a `<mgd:include>content</mgd:include>`
*   **Content entry point**: the "content area" of a page, as defined in the main template

Each route definition can decide what templates to use in each of these. If a route wants to override the whole site template, then the route should define its own template entry point, and if it only wants to show something in the content area, then it should define its own content entry point.

Templates are defined by giving them a name. For example, a template for displaying the current date could be called show-date. When MVC gets into the templating stage. This is defined in the route:

    show_date:
     - path: '/date'
     - controller: net_example_calendar_date
     - action: date
     - template_aliases:
       - content: show-date

When the templating phase of the route happens, MVC will look for such element from the template stack. Template stack is a list of components running with the current request. First MVC looks for the element in the current component, and if it can't be found there it goes looking for it down the stack:

*   Current running component's _templates_ directory
*   _templates_ directories of any components injected to the template stack
*   Midgard MVC core _templates_ directory

The first matching template element will be used and executed via TAL. The data returned by the component will be exposed into TAL as a `current_component` variable. In case of our date example the template could simply be a `net_example_calendar/templates/show-date.xhtml` file with following contents:

    <p>Current date is <span tal:content="current_component/date">5/8/1999 01:00</span></p>

Please consult the [PHPTAL manual](http://phptal.org/manual/en/) for more information on using TAL templating commands.
