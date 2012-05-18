---
name: getting_started
title: "Getting started"
---
You can use the Composer-generated autoloader to load all needed classes:

    require 'vendor/autoload.php';

After you've included the autoloader you should be able to open a Midgard2 repository session:

    // Set up Midgard2 connection
    $parameters = array(
        // Use local SQLite file for storage
        'midgard2.configuration.db.type' => 'SQLite',
        'midgard2.configuration.db.name' => 'midgard2cr',
        'midgard2.configuration.db.dir' => __DIR__,
        // Where you want to store file attachments
        'midgard2.configuration.blobdir' => '/var/lib/midgard2/blobs',
        // Let Midgard2 initialize the DB as needed
        'midgard2.configuration.db.init' => true,
    );

    // Get a Midgard repository
    $repository = Midgard\PHPCR\RepositoryFactory::getRepository($parameters);

    // Log in to get a session
    $credentials = new \PHPCR\SimpleCredentials('admin', 'password');
    $session = $repository->login($credentials, 'default');

After this the whole [PHPCR API](http://phpcr.github.com/doc/html/index.html) will be available. See some example code in the [examples` directory](https://github.com/midgardproject/phpcr-midgard2/tree/master/examples).

With MySQL, the connection parameters could for example be:

    $parameters = array(
        // MySQL connection settings. The database has to exist
        'midgard2.connection.db.type' => 'MySQL',
        'midgard2.connection.db.name' => 'midgard2',
        'midgard2.connection.db.username' => 'midgard',
        'midgard2.connection.db.password' => 'midgard',
        'midgard2.connection.db.host' => '127.0.0.1',
        'midgard2.connection.db.port' => '3306'
        // Let Midgard2 initialize the DB as needed
        'midgard2.configuration.db.init' => true,
    );

This is the only different part from the example using SQLite above.
