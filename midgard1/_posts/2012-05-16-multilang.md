---
name: multilang
title: "MgdSchema and multilingual content"
---
Midgard's multiLang system provided for MgdSchema objects supports creating and serving same content in different languages quickly and easily. MultiLang types can be freely defined using Midgard schema files.

The main advantage of ML content for schema objects is its transparent usage.
There are few important rules:

 * Every object always has default lang content.
 * ML is optimized for translations
 * Content is always "served" in language context.
 * Language and DefaultLanguage are always defined as global values

### Create language context

Content with default lang  is always accessible and is fully transparent for other languages. When object has content in many different languages then languge content take precedence over default lang . If object has no content for currently used lang then default lang content is returned.

###Creating language content

Particular language content for object is almost like translation. Any new object is not created , but instead only language content for currently existing object is created. To create language content you should at least set application's language using `mgd_set_lang` function and get already exising object. 

Let's assume that default content is created in Polish and English translation should be added.

Application is running and language is set to Polish (default language).    

    $lang = 52; /* English language id*/
    $id = 1234; /* Object's id */

Global translation language should be changed. After this change appllication is running in English translation language context.

    $mgd_set_lang($lang); 
    
Object is fetched from database. There is no English translation yet, so object with default lang (Polish) content will be returned.

    $object = new midgard_article($id); 
    echo $object->title;    

The output is "Witaj świecie!"

    $object->title = "Hello World!";
    $object->update();

English language content is created. 
Now it's possible to change language at any time.      

    mgd_set_lang($polish_lang_id);
    $object = new midgard_article($id);    

    echo $object->title;
    echo "in English language means: "
   
    mgd_set_lang($lang);
    $object->get_by_id($id);

    echo $object->title;  

The output: 

    Witaj Swiecie! in English means Hello World!
