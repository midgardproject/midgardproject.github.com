---
name: multilang
title: Building multilingual sites
---
With [Midgard1](/midgard1/) and above the recommended way is to use [MultiLang](/midgard1/#multilang) feature even if the site structure isn't identical among different languages.

If content hasn't been translated will master language (language 0) be used.

Using multilang
---------------

`mgd_set_lang(int language)`

Languages are called with their ID. E.g. `mgd_set_lang(38)` would set the language to English and `mgd_set_lang(183)` to Inuktitut.

For the master language key _0_ (zero) is used. Master language isn't fixed to any specific language, so it can be the main language, which other languages will be translated from.

### Get the currently used languages

It is possible to use two languages simultaneously

1. Content language
2. Interface language

To get the content language use

    <?php
    // Get ID (integer) of the content language
    $content_language = $_MIDCOM->i18n->get_content_language();
    ?>

And for the currently used interface language (e.g. toolbar) use

    <?php
    // Get ID (integer) of the current interface language
    $interface_language = $_MIDCOM->i18n->get_current_language();
    ?>

### Using parameters as storage location

To use multilanguage parameters with _midcom.helper.datamanager2_ it is possible to set the parameter storage location in the following way:

    'price' => array
    (
        'title' => 'price',
        'type' => 'text',
        'storage' => array
        (
            'location' => 'parameter',
            'multilang' => true,
        ),
        'widget' => 'text',
    ),
    
This will save the parameters

* _midcom.helper.datamanager2_, _price_, _$value_ for the master language 
  content
* _midcom.helper.datamanager2_, _price_fi_, _$value_ for Finnish language 
  content


Untranslated content
--------------------

Component `fi.protie.navigation` will natively add class _untranslated_ for content which is lacking the translation.

Otherwise untranslated content should be checked with

    <?php
    if ($object->lang !== $_MIDCOM->i18n->get_midgard_language())
    ?>
    
### Hiding untranslated content

To hide untranslated content (otherwise master language will be displayed, resulting in displaying mixed language) set the MidCOM configuration parameter

    $GLOBALS['midcom_config_local']['i18n_multilang_strict'] = true;

before initializing MidCOM in code-init.


Language versions for the requested object
------------------------------------------

To get a list of the language versions for a requested object do the following

### MidCOM component level

    <?php
    // Get the metadata for the requested object
    $object_metadata = midcom_helper_metadata::retrieve($object);
    
    if (   $object_metadata
        && $object_metadata->id)
    {
        $languages = $object_metadata->get_languages();
    }
    // returns an array with the languages
    ?>

### On layout level

    <?php
    // Get the metadata binded to the object currently viewed
    // if the component binds the metadata
    $object_metadata = $_MIDCOM->metadata->get_view_metadata();
    
    if (   $object_metadata
        && $object_metadata->id)
    {
        $languages = $object_metadata->get_languages();
    }
    ?>

### Multilang and hosts

If host record has language other than _0_, mgd_set_lang is automatically initialized to set the correct language.

To fetch a list of all the languages hosts use get an array containing the host objects with

    <?php
    $hosts = $_MIDCOM->i18n->get_language_hosts();
    // Returns an array of languages, indexed with the language id as
    // the array key for each language
    ?>

MySQL and object level
----------------------

Several objects have two different types of properties: shared and language-dependant. For example table _article_ shares e.g. name and the language content is located in _article\_i_, which contains _title_, _abstract_, _content_ and such.

Languages are located in table _midgard\_language_.

[`midgard_query_builder`](/midgard1/#qb) will automatically set language constraint when applicable.
