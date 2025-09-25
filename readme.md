


# lib_FullSyncGrp

Library to define users and groups for fullsync replication filtering


For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Sequences](#sequences)
    - [Groups](#groups)
    - [GroupsOf](#groupsof)
    - [RemoveGroup](#removegroup)
    - [RemoveUserFromGroup](#removeuserfromgroup)
    - [RemoveUserInGroupBulkV2](#removeuseringroupbulkv2)
    - [SetUserInGroup](#setuseringroup)
    - [SetUserInGroupBulk](#setuseringroupbulk)
    - [SetUserInGroupBulkV2](#setuseringroupbulkv2)
    - [UpdateGroup](#updategroup)
    - [Users](#users)
    - [UsersOf](#usersof)


## Installation

1. In your Convertigo Studio use `File->Import->Convertigo->Convertigo Project` and hit the `Next` button
2. In the dialog `Project remote URL` field, paste the text below:
   <table>
     <tr><td>Usage</td><td>Click the copy button</td></tr>
     <tr><td>To contribute</td><td>

     ```
     lib_FullSyncGrp=https://github.com/convertigo/c8oprj-lib-fullsync-grp.git:branch=8.0.0
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     lib_FullSyncGrp=https://github.com/convertigo/c8oprj-lib-fullsync-grp/archive/8.0.0.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __lib_FullSyncGrp__ project


## Sequences

### Groups

list all groups

### GroupsOf

list groups of a user

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>user</td><td></td>
</tr>
</table>

### RemoveGroup

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
</table>

### RemoveUserFromGroup

remove a user from a group

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
<tr>
<td>user</td><td></td>
</tr>
</table>

### RemoveUserInGroupBulkV2

Bulk remove of 1,n users to 1,n groups

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>groups</td><td>Array<String> groups -- should be stringified from front-end</td>
</tr>
<tr>
<td>users</td><td>Array<String> users -- should be stringified from front-end</td>
</tr>
</table>

### SetUserInGroup

add a user to a group

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
<tr>
<td>user</td><td></td>
</tr>
</table>

### SetUserInGroupBulk

add a user to a group

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>bulkOBj</td><td></td>
</tr>
</table>

### SetUserInGroupBulkV2

Bulk add of 1,n users to 1,n groups

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>groups</td><td>Array<String> groups -- should be stringified from front-end</td>
</tr>
<tr>
<td>users</td><td>Array<String> users -- should be stringified from front-end</td>
</tr>
</table>

### UpdateGroup

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>new_group_name</td><td></td>
</tr>
<tr>
<td>old_group_name</td><td></td>
</tr>
</table>

### Users

list all users

### UsersOf

list users of a group

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
</table>



