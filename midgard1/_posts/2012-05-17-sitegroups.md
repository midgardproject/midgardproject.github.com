---
name: sitegroups
title: "Sitegroups"
---
__Sitegroups__ provide a method of hosting multiple organizations within one Midgard installation.

Every record in the database is tagged as belonging to a specific sitegroup. The effect is much the same as storing sites for separate clients in separate databases in that resources can't be accessed across Sitegroups and has the following benefits:

* Sitegroups reduce the number of persistent database connections. When storing hosts in distinct databases, each Apache handler process opens a persistent connection to every database. It is not unusual to have 20-30 handler processes active per Host. Which, when multiplied by the number of clients, surpasses the default MySQL configuration for 100 connections.
* One special Sitegroup, _Sitegroup 0_ (_SG0_), is read-only for all other Sitegroups and merges transparently with any other Sitegroup. You can therefore [Installing Additional Packages|install] one single [Midgard administrative interfaces|administration interface] that is available to all while still maintaining the separation between several sites. Also, upgrades to the administration interface will immediately be available to everybody.
* You can grant separate administration privileges for each Sitegroup.
* You can easily limit the Disk Quota and number of allowed MgdSchema objects of a specific type for each Sitegroup
* Sitegroups and websites are easy to create using the Midgard Site Wizard

Sitegroups account for three categories of Midgard users depending on their access level: 

* Root level users ( __Root users__) have full access to every resource within every Sitegroup, including SG0.
* Admin level users ( __Administrators__ ) have almost full access to every resource in one Sitegroup. They may be seen as sites administrators, although there may be several sites in one Sitegroup.
* User level users ( __Users__ ), whose privileges are described in [Permissions in Midgard|Midgard Permissions] documentation

## The Administrator Group: root level users

Any member of the _Group 0_ is a root level user ( __Root user__ ) , which means he can do anything on the system. Only server administrators should be members of that Group, as everything else can be handled by creating a proper Group system.

Only root level users can: 

* Modify shared Midgard applications like templates, which belongs to SG0. 
* Create new Sitegroups. 
* Create new Hosts ; or modify the name, prefix and port fields of an existing Host record. 

## Admingroups: admin level users

Any member of the group whose `id` equals the `admingroup` field of a Sitegroup record is an admin level user ( __Administrator__ ) for that Sitegroup. This means he has write access to every resource within that Sitegroup but the name, prefix and port fields of the Host table.

Only admin level users can modify Host records (apart from the three above mentioned fields): They can choose whether the sites within their Sitegroup are online, and whether they require authentication.

Also, only they can create root Pages, root Styles and root Topics.

## Login Delimiters

A root or admin level user may want to limit his rights when doing a specific task which doesn't require special privileges, or so as to check on a user's rights. This is achieved by authenticating with a username and a Sitegroup name, separated with a Delimiter.

### Sitegroup login Delimiters for root level user root

<table>
  <thead>
    <tr>
      <th>Case</th>
      <th>Login level</th>
      <th>Delimiter</th>
      <th>Login</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>root</td>
      <td>none</td>
      <td>root</td>
    </tr>
    <tr>
       <td>2</td>
       <td>root</td>
       <td>*</td>
       <td>root*sitegroup</td>
    </tr>
    <tr>
       <td>3</td>
       <td>admin</td>
       <td>!</td>
       <td>root!sitegroup</td>
    </tr>
    <tr>
       <td>4</td>
       <td>user</td>
       <td>$</td>
       <td>root$sitegroup</td>
    </tr>
    <tr>
       <td>5</td>
       <td>user</td>
       <td>=, $</td>
       <td>root=user$sitegroup</td>
    </tr>
  </tbody>
</table>

  1. root is logged in SGO. He has full access to all Sitegroups, but anything he creates will be part of SG0 only.

  2. root is logged in sitegroup. He has full access to all Sitegroups, but anything he creates will be part of sitegroup only.

  3. root has the same privileges as admin.

  4. root is logged in as a user, but looses all his write privileges as he doesn't belong to any Group.

  5. root is logged in as user with root's password. He gets the same privileges as user.

### Sitegroup login Delimiters for admin level user admin

<table>
  <thead>
    <tr>
      <th>Case</th>
      <th>Login level</th>
      <th>Delimiter</th>
      <th>Login</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>admin</td>
      <td>+</td>
      <td>admin or admin+sitegroup</td>
    </tr>
    <tr>
      <td>2</td>
      <td>user</td>
      <td>;</td>
      <td>admin;sitegroup</td>
    </tr>
    <tr>
      <td>3</td>
      <td>user</td>
      <td>= (, +)</td>
      <td>admin=user or admin=user+sitegroup</td>
    </tr>
  </tbody>
</table>

  1. admin is logged in as admin.

  2. admin is logged in as a user, and looses all his privileges as he doesn't belong to any Group.

  3. admin is logged in as user with admin's password. He gets the same privileges as user.

### Sitegroup login Delimiters for user level user user

<table>
  <thead>
    <tr>
      <th>Case</th>
      <th>Login level</th>
      <th>Delimiter</th>
      <th>Login</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>user</td>
      <td>+</td>
      <td>user or user+sitegroup</td>
    </tr>
  </tbody>
</table>

  1. user is logged in as user.
