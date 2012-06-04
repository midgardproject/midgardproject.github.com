---
title: Using with Doctrine ODM
name: doctrine-odm
---
The Midgard2 PHPCR provider can be used with the [Doctrine PHPCR ODM](https://github.com/doctrine/phpcr-odm). To start using it, prepare a Midgard2 PHPCR session as explained in the [Getting started document](http://midgard-project.org/phpcr/#getting_started), and then:

    <?php
    // Configuring a Midgard2 PHPCR session before this

    // prepare the doctrine configuration
    $config = new \Doctrine\ODM\PHPCR\Configuration();

    // Create a Document Manager instance for the PHPCR session
    $dm = \Doctrine\ODM\PHPCR\DocumentManager::create($session, $config);

    // After this you can use PHPCR ODM normally, for example:

    // fetching a document by PHPCR path (id in PHPCR ODM lingo)
    $user = $dm->getRepository('Namespace\For\Document\User')->find('/bob');
    //or let the odm find the document class for you
    $user = $dm->find('/bob');

    // create a new document
    $newUser = new \Namespace\For\Document\User();
    $newUser->username = 'Timmy';
    $newUser->email = 'foo@example.com';
    $newUser->path = '/timmy';
    // make the document manager know this document
    // this will create the node in PHPCR but not read the 
    // fields or commit the changes yet.
    $dm->persist($newUser);

    // store all changes, insertions, etc. with the storage backend
    $dm->flush();

If you're using the [Doctrine PHPCR Symfony Bundle](https://github.com/doctrine/DoctrinePHPCRBundle), you can also configure PHPCR ODM through it.
