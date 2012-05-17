---
name: mgdschema
title: "Content schemas"
---
Midgard2 objects are defined using MgdSchema XML configuration files. Their classes are automatically registered for usage in applications and are described using MgdSchema file attributes and properties.

### Naming Conventions

Due to language binding limitations, type names should be in lowercase and use underscores as word separators. You should follow this convention if you want to define schema types for midgard-java and midgard-php applications.

Temporary files with '.' or '#' prefixes, or with a '#' suffix will be ignored and warning messages will be printed to the log file or directly to the terminal window.

### Schema Structure

Here's a simple example:

    <?xml version="1.0" encoding="UTF-8"?>
    <Schema xmlns="http://www.midgard-project.org/repligard/1.4">
      <type name="example_article" table="example_article">
        <property name="id" type="unsigned integer" primaryfield="id" />
        <property name="title" type="string" />
        <property name="content" type="text" />
      </type>
    </Schema>

### Loading Schema Files

When an application starts up, Midgard2 parses the main schema file _MidgardObjects.xml_ which defines all the built-in types like `midgard_person` and `midgard_attachment`.

To load additional MgdSchema files, place them into your _/usr/share/midgard2/schema_ directory (this may be different if you chose another prefix during midgard-core compilation).

If you want to use a custom schema loading path, you can set it using the _ShareDir_ setting of your Midgard configuration file.

### Writing Midgard Schemas

For every newly-defined type, mandatory attributes have to be set. To define a new MySuperClass type, use the _type_ element:

    <type name="MySuperClass">
    </type>

This is sufficient to create a new type and initialize the corresponding new class when the schema is loaded. Such a type is accessible on the bindings level as the _MySuperClass_ class.

#### Defining Storage Locations

Empty classes may be constructed without storage (i.e. a corresponding database table) defined. To set the table name for a particular type, the XML property _table_ should be used:

    <type name="MySuperClass" table="my_table">
    </type>

#### Defining Properties


To define class members (object properties) for a new type, use property elements for child attributes:

    <type name="MySuperClass" table="my_table">
      <property name="title" type="string" />
    </type>

When using Midgard2 with your programming language this means there will be a class MySuperClass available with a property title.

#### Settting the Property Type

By default all properties are string type, unless another type is distinctly set. Available data types are:

*   string
*   integer
*   unsigned integer
*   text
*   float
*   bool
*   datetime
*   guid

For every XML property data type there is a corresponding database data type:

*   string is equal to varchar(255)
*   integer is equal to int(11) (values can range from -2,147,483,648 to 2,147,483,647)
*   unsigned integer is equal to int(11) (values can range from 0 to 4,294,967,295)
*   text is equal to text (or longtext )
*   float is equal to float
*   bool is equal to boolean
*   guid is equal to varchar(80)

#### Specifying the Database Data Type

The additional XML property dbtype may be used when a specific database type is needed, for example, a property with the string type could use the varchar(80) type instead of varchar(255).

    <property name="title" type="string" dbtype="varchar(80)"/>

or

    <property name="info" type="string" dbtype="set('auth')"/>

#### Resolving Property Name and Table Field Conflicts

The XML property field can be used if you want the object's property name to be different from the table's column name.

    <property name="title" type="string" field="otherfield"/>
    
This describes that object's property 'title' will use the column 'otherfield' as its value storage. This is equal to SQL's _SELECT table.otherfield AS title_.

#### Setting the Primary Key

When a type has many properties defined and one of those should be used as (or better, point to) the table's primary key, the XML property primaryfield can be used.

    <property name="primary" type="unsigned integer" primaryfield="id"/>

#### Setting database index

If property's field has special usage (e.g. holds a reference for other record), create index. By default indexes are not created for all properties. To set it, use reserved attribute 'index'.

    <property="count" type="int" index="yes"/>

Note, that by default indexes are created for such properties and fields:

*   up property
*   parent property
*   property which is a link
*   property which is a link target (is linked)

Do not create indexes for boolean properties, as it won't improve performance.

#### Defining Tree Hierarchies

MgdSchema is able to create tree hierarchies. Objects of the same type may be managed in a tree structure by using the XML property upfield. For defining a type as a 'child' object of another type, the XML properties parentfield and parent should be used.

*   upfield is defined as property of an XML 'property' attribute
*   parentfield is defined as property of an XML 'property' attribute
*   parent is defined as property of an XML 'type' attribute

Properties which are parentfield or upfield must be the type of unsigned integer, guid or string.

This definition describes the MyClass type, which is a node in the MySuperClass tree, and also may have own nodes with objects of the same (MyClass) Type. Useful methods for such types are documented in MgdSchema object's API (`list_childs`, `is_in_tree`, `get_by_path`).

#### References to Other Types

The link attribute's property should be used when the object's property (and the column's record value) holds a pointer to another type. The property's value should hold the primary property value of the referenced type.

    <property name="creator" type="unsigned integer" link="midgard_person:id"/>

The special _:_ separator describes which property of the referenced type should be used as the property's value. If this separator is not defined, the guid property of the referenced type is used by default.

Properties which are links must be the type of unsigned integer, guid or string.
