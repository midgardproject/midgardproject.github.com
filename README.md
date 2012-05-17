The Midgard Project website
===========================

This repository holds the source code for the [Midgard Project](http://www.midgard-project.org) website. It is a static site built with Jekyll from Markdown source files.

## Site structure

The site is split into different _products_, or libraries and frameworks maintained by the Midgard project. Each product is inside its own subdirectory.

The product directory contains a `index.md` file with the base description of the product. These files use the `product` template which then automatically pulls in all download instructions and documentation files of that product from the product's `_posts` subdirectory.

### Download instructions

Download instructions are regular Markdown-based Heroku posts. They need to contain the following metadata:

* tags: list of tags that has to include `download`
* name: URL-safe version of the downloadable type, for instance `ubuntu`, `source`, or `mac_os_x`
* title: Human-readable version of the downloadable type, for instance `Ubuntu` or `Mac OS X`

### Documentation files

Documentation files are regular Markdown-based Heroku posts. They need to contain the following metadata:

* name: URL-safe version of the document, for instance `mgdschema`
* title: Human-readable version of the document, for instance `Midgard Schemas`

### Static files

Regular downloadable files can be placed anywhere in the repository outside of the `_posts` and `_layouts` directories. See for instance the `css` and `js` directories.

## Contributing

Simply fork this repository, make the modifications you want, and send a pull request.

## Testing locally

You need a local installation of Jekyll:

    $ sudo gem install jekyll

Start a Jekyll server inside the repository:

    $ jekyll --server --auto

The website will be available in <http://localhost:4000/>. Jekyll will rebuild it automatically when you save files.

## Licensing

All contents of this website are available under the Creative Commons Attribution-ShareAlike license.

The web design was made by Andreas Nilsson.
