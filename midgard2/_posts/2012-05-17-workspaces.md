---
layout: default
title: Workspaces
name: workspaces
tags:
  - documentation
---
Workspaces are a new feature in Midgard2 10.05.5 that adds the capability of organizing your whole content into different containers and accessing them by the workspace. This basically adds capability similar to [layers in image editing software](http://en.wikipedia.org/wiki/Layers_(digital_image_editing)) like Photoshop to your content repository.

### Workspace tree

Workspaces form a tree hierarchy. This allows easy building of display rules or workflows to a Midgard2 powered application. Here are some examples of tree structures you may use:

* **/published/draft**: content in the *published* workspace is displayed to everybody. New content is added in the *draft* workspace and only moved to *published* when ready
* **/en/fi**: For English language users the content from workspace *en* is shown. Workspace *fi* extends that and allows translating content targeted at Finnish language audience
* **/public/private/group1**: Content in the *public* workspace is shown to all users. Authorized users also see content from the *private* workspace, and members of a particular group see the content of the *group1* workspace layered on top of the other two

### Using workspaces

Workspaces support the whole Midgard2 content model transparently. This means that in order to use workspaces you only need to set the workspace tree you want to work with to the Midgard2 connection, and all your content input and output will obey that.

There are two ways to use workspaces:

* **Workspace context** displays content from the selected workspace, and all workspaces above it in the tree
* **Workspace** displays content only from a particular workspace
