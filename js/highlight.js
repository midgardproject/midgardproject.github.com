document.write('<script type="text/javascript" src="/js/shjs/sh_main.min.js"></script>');
document.write('<script type="text/javascript" src="/js/shjs/sh_php.min.js"></script>');
document.write('<link rel="stylesheet" href="/js/shjs/sh_zenburn.min.css">');

jQuery(document).ready(function() {
    jQuery('pre').each(function() {
        var content = jQuery(this).text();
        if (content.substr(0, 5) === '<?php') {
            jQuery(this).addClass('sh_php');
            return true;
        }
        
        if (content.substr(0, 1) === '$' &&
            content.substr(-1, 1) === ';') {
            jQuery(this).addClass('sh_php');
            return true;
        }

        if (content.indexOf('tal:') !== -1 ||
            content.indexOf('<p>') !== -1 ||
            content.indexOf('<li>') !== -1 ||
            content.indexOf('<img') !== -1) {
            jQuery(this).addClass('sh_html');
            return true;
        }

        if (content.indexOf('<pro') !== -1 ||
            content.indexOf('<type') !== -1) {
            jQuery(this).addClass('sh_xml');
            return true;
        }
    });
    sh_highlightDocument('/js/shjs/', '.min.js');
});
