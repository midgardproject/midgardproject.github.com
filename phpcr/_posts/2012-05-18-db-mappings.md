---
name: db_mappings
title: "How does PHPCR map to your database?"
---
Midgard2 uses standard relational databases for content storage. The PHPCR model is mapped to database tables in the following way:

* Tree structure is defined in `midgard_node` table, which contains `name`, `parent` reference, and a reference to a content object
* Properties of a node type are stored in the table defined for that node type in its MgdSchema ([see examples](https://github.com/midgardproject/phpcr-midgard2/blob/master/data/share/schema/phpcr_schemas.xml))
* Multivalued properties, and properties not defined in the node type (for example with `nt:unstructured`) are stored in the `midgard_node_property` table, which contains `name`, reference to `midgard_node` entry, `type` and `value`
* Binary property contents are stored as files into the `blobdir` defined in repository configuration

New Node Types can be registered by writing MgdSchemas for them and copying them to Midgard's schema directory (by default `/usr/share/midgard2/schema`).
