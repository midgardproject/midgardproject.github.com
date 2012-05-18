---
name: coding_standards
title: "MidCOM coding standards"
---
For a start, please read the [PEAR coding standards][1], they are the basis for the MidCOM conventions, as they are only slightly adapted. If in doubt, you should stick to PEAR.

## Indenting and Line Length  


You must set your IDE for a tab with of four spaces and must configure it to replace tabs with spaces.  


You should break lines at around 100-120 characters, use your best judgement here, readable code goes over this wrapping recommendation. Any statement you break over several lines should generally be indented by one tab,you should not increase the indentation to the opening paranthesis, the equal sign or whatever you are in when doing a line break. One noteable exceptions are muli-line if/while constructs, but see below.  


## Curly braces

You must use curly braces in all places where they might be optional. This is especially important for if/while/for single-liners, where omitted curly braces can easily lead to strange bugs.  


In addition, to the contrary of what both PEAR and current MidCOM code is suggesting, you have to put the opening curly brace in its own line. While working with the C# coding standards (where this is mandatory), I found out that this greatly improves the readability of the code.  


So it has to look like this:  

    
    if (condition)  
    {  
        action1;  
    }  
    else if (condition)  
    {  
        action2;  
    }  
    else  
    {  
        action 3;  
    }  
    

## Control structures  


The C language spelling has to be used throughout MidCOM. No Perl-Like constructs or shortcuts like 'elseif' are allowed. Use of the "ternary" 
('?:') operator is expressly forbidden as is the "alternative" control structure syntax.


### If-statements  


A complete if statement can be seen above.  


More complex conditions should be wrapped over multiple lines using indenting to mark the various levels of the condition:  

    
    if (   $this->_layout[!!'locktimeout'] == 0   
        || (   is_array($this->_lock)   
            && $this->_ourlock  
           )   
        || is_null($this->_storage)  
       )   
    {  
        ...  
    }  
      
    

### Switch statements  


A bit to the contrary of PEAR, switch blocks must use two levels of indentation, to clearly mark the extent of the switch block. Any fall-throughs should get a short comment to let other programmers know that it was on-purpose. The default action must always come last and should also be terminated by a break statement.  

    
    switch (condition)  
    {  
        case 1:  
            action1;  
            break;  
      
        case 2:  
            action2;  
            // Fall-through  
      
        case 3:  
            action3;  
            break;  
      
        default:  
            action4;  
            break;  
    }  
    

### Loops  


All loops follow the basic schema of the formatting of simple if-blocks. You may group for statements and conditions together in a similar way too.  


## Whitespace  


Rule number one here: Code has to be read by the author, not by the PHP parser. So you should make use of whitespace everywhere to make code more readable.  


In all statements, you must add a space before and after operators. In addition, when calling functions, you must add a space after each comma between the arguments. You should omit the spaces inside parantheses to make the code optically 'coherent'.  


Statement blocks that are logically related should be marked by a single, blank line (that has the same indentation as the surrounding ones). You should not use more blank lines, as they tend to rip apart the 'flow' of the code, especially when they are at places where you don't need them (e.g. at the end of a block).  

    
    $variable = 4 * (3 + 7);  
    $variable2 = 'string1' . 'string2';  
      
    someotheraction1;  
    someotheraction2;  
    

## Strings  


Strings should always be single-quoted when you do not need any special characters (for example \n) or any variable interpolation. This will avoid accidential variable expansions. The only drawback here is that you have to mask strings like 'shouldn\'t' but these short forms should not be used in a UI anyway.  


If you use variable interpolation in double-quoted strings, you must always enclose the interpolated variable in curly braces to clearly mark it against the surrounding text. You should use variable interpolation whenever feasible.  

    
    $string1 = 'You should not use terms like "shouldn\'t".';  
    $string2 = "This {$color} is in back {$this->bags[$color]['bag name']}.\n";  
    
NOTE: Interpolating function/method calls via curly brackets is forbidden, use concatenation (and remember those spaces around the operator).


## Naming conventions  


Due to tradition, MidCOM naming conventions differ from the PEAR ones:  


### Classes  


Classes must start with their component prefix, and must all be lowercase, for example de\_linkm\_taviewer\_admin. You should use an additional underscore after the component prefix to denote component-private classes, that should not be instantinated from outside, for example net\_siriux\_photos__photo.  


### Functions and methods  


As with classes, they must all be lowercase. Global functions must start with their component prefix, as classes have to. Try to name class methods clearly, use a longer name in favor of saving typework. Prepend any private member functions with an underscor. For example \_generate\_urlname(). or get\_current\_leaf(). 


The same schema must be used for all public member variables as well.  


Note: Some older MidCOM classes, even in the core, do use the CamelCaps syntax instead of the underscore separated. It seems to me (subjectivly) that we have more underscore separated symbol names, instead of CamelCase ones, so I have decided to stick to this one as a recommendation.   


### Symbol names  


Finally, use must clear names for your symbols (Constants, Variables, Functions etc.) always. Do not use stuff like $st (for style) or $tn (for topic name). This makes it hell for other authors to even read your code.   


Instead, use clear descriptive names like lock_timeout. You may use CamelCaps style for function-local variables if it serves readability, but you should not do so for private class members for consistency with public ones.  


All of your constants should be all-upper-case to indicate their constant nature. One exception are the values true, false and null, all of which I consider as language constructs and therfore are to be kept lower-case.  


## PHPDoc blocks  


A sample [PHPDoc][3] block (as started by me) looks like this, note the empty line at the beginning:  

    
    /**  
     * Short symbol introduction  
     *   
     * Exthaustive text, possibly with examples  
     *   
     * @param type name description  
     * @param type name description  
     * @return type description  
     * @access private  
     * @package name  
     * @further_tags like @todo or @global ...  
     */   
    

The last tags, of course, should only be used where applicable. Important, for example, is that the @package tag is part of a class definition as well as of a file docblock, otherwise [PHPDoc][3] doesn't correctly recognize the package assignment. All other file-level blocks don't need @pacakge thoug.  


In addition, each file should contain a DocBlock like this as file-level docblock to get a correct assignment to a package:  

    
    /**  
     * @package midcom.baseclasses  
     * @author The Midgard Project, http://www.midgard-project.org   
     * @version $Id: dbobject.php,v 1.3 2005/06/08 15:18:55 torben Exp $  
     * @copyright The Midgard Project, http://www.midgard-project.org  
     * @license http://www.gnu.org/licenses/lgpl.html GNU Lesser General Public License  
     */  
    

The name of the package is alwas that of the component (de.linkm.taviewer for example).  

See the [PHPDoc Manual][4] for further details.  

[1]: http://pear.php.net/manual/en/standards.php
[3]: http://www.phpdoc.org/
[4]: http://manual.phpdoc.org/
