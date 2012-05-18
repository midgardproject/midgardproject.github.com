---
name: formatting
title: "MidCOM formatting engine"
---
## Inline variable display

Midgard adds a new language construct to your PHP templates which allows you to include the value of a variable in HTML without using a `<? echo $var; ?>` construct.

You can now simply use `&(variablename);` directly in HTML. Note the absence of the `$`.

Object variables that would normally be accessed in PHP code as `$object->field` can be inserted as `&(object.field);`. Similarly, fields of an associative array can be inserted with `&(array['key']);`.

## Standard formatting modifiers

The way the value is formatted can be specified by adding a modifier after the variable name: `&(variable:modifier);`. 

In PHP code the modifiers can be executed using the `mgd_format` function.

The standard modifiers are:

### `h` - Encode content as HTML

Add value as HTML. Escapes `&` to `&`, `<` to `<` and `>` to `>`. 

Everything between `[<` and `>]` is added verbatim with the `[<` and `>]` dropped. PHP code embedded in such a section is executed. 

### `H` - Encode content as HTML but keep entities verbatim

Add value as HTML. Everything is included verbatim. 

### `f` - Format plain text to HTML

Add value as formatted text, the plain text input is formatted as HTML on the fly. 

Paragraphs delimited by an empty line will be surrounded by `<p>` and `</p>`. 

Everything between `[<` and `>]` is added verbatim with the `[<` and `>]` dropped. 

__Note:__ PHP code embedded in such a section is executed. If you want to enable safe content input from unsecure users, use the Markdown datatype instead.

### `F` - Format plain text to HTML with headlines

Add value as formatted text, the plain text input is formatted as HTML on the fly. 

 Paragraphs delimited by an empty line will be surrounded by `<p>` and `</p>`. 

Lines after an empty line with less than 10 words that do not end in a period are formatted as `<h2>`. 

Everything between `[<` and `>]` is added verbatim with the `[<` and `>]` dropped. 

__Note:__ PHP code embedded in such a section is executed. If you want to enable safe content input from unsecure users, use the Markdown datatype instead.

### `p` - Execute content as PHP code

Execute a value as PHP. Executes the value of the variable.

### `u` - URL encode content

Add the value urlencoded. Replaces non-safe URI characters with their `%code` equivalents. 

### `s` - Show content as-is

Show variable unmodified.

## Custom formatters

You can also add custom formatters to your Midgard application. This is a powerful way of extending Midgards formatting engine.  
  
Basically you write a function which gets the text-to-be-formatted as an argument and echos dumps the formatted output to stdout.  
  
You then register that function using to Midgard's formatting engine using the `mgd_register_filter` function.   
  
### Example:

    function midgardize_my_content($text) 
    {  
        // Replace all instances of "CMS" in content with "Midgard"
        $formatted_text = str_replace('CMS', 'Midgard', $text);
        echo $formatted_text;  
    }  

    mgd_register_filter('mgd', 'midgardize_my_content');

    // Then, in some style element you can do this: &(my_variable:xmgd);  
  
**Note:** The custom formatters are prefixed with `x` before the registered name (in this case `mgd`)
