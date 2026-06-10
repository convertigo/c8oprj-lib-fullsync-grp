


# lib_FullSyncGrp

Library to define users, groups, roles, and permissions (RBAC) for fullsync replication filtering 


For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Sequences](#sequences)
    - [EffectivePermissionsOfUser](#effectivepermissionsofuser)
    - [GetGroupAttributes](#getgroupattributes)
    - [GetPermissionAttributes](#getpermissionattributes)
    - [GetRoleAttributes](#getroleattributes)
    - [Groups](#groups)
    - [GroupsOf](#groupsof)
    - [GroupsOfRole](#groupsofrole)
    - [NonRegressionPrimitives](#nonregressionprimitives)
    - [Permissions](#permissions)
    - [PermissionsOfRole](#permissionsofrole)
    - [RemoveGroup](#removegroup)
    - [RemovePermissionFromRole](#removepermissionfromrole)
    - [RemoveRoleFromGroup](#removerolefromgroup)
    - [RemoveUserFromGroup](#removeuserfromgroup)
    - [RemoveUserInGroupBulkV2](#removeuseringroupbulkv2)
    - [Roles](#roles)
    - [RolesOfGroup](#rolesofgroup)
    - [RolesOfPermission](#rolesofpermission)
    - [SeedRbacDemoData](#seedrbacdemodata)
    - [SetGroupAttributes](#setgroupattributes)
    - [SetPermissionAttributes](#setpermissionattributes)
    - [SetPermissionInRole](#setpermissioninrole)
    - [SetRoleAttributes](#setroleattributes)
    - [SetRoleInGroup](#setroleingroup)
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
     lib_FullSyncGrp=https://github.com/convertigo/c8oprj-lib-fullsync-grp.git:branch=RBAC
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     lib_FullSyncGrp=https://github.com/convertigo/c8oprj-lib-fullsync-grp/archive/RBAC.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __lib_FullSyncGrp__ project


## Sequences

### EffectivePermissionsOfUser

list effective permissions of the current authenticated user through groups and roles

### GetGroupAttributes

Get attributes for a group. Parameter: group is the group name. The sequence reads the deterministic attribute document sha256("groupAttributes:" + group), whose type is c8oGroupAttributes. The response is the FullSync document returned by GetDocument and contains couchdb_output.attributes as the JSON object previously written by SetGroupAttributes.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
</table>

### GetPermissionAttributes

Get attributes for a permission. Parameter: permission is the canonical permission string. The sequence reads the deterministic attribute document sha256("permissionAttributes:" + permission), whose type is c8oPermissionAttributes. The response is the FullSync document returned by GetDocument and contains couchdb_output.attributes as the JSON object previously written by SetPermissionAttributes.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>permission</td><td></td>
</tr>
</table>

### GetRoleAttributes

Get attributes for a role. Parameter: role is the role name. The sequence reads the deterministic attribute document sha256("roleAttributes:" + role), whose type is c8oRoleAttributes. The response is the FullSync document returned by GetDocument and contains couchdb_output.attributes as the JSON object previously written by SetRoleAttributes.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>role</td><td></td>
</tr>
</table>

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

### GroupsOfRole

list groups of a role

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>role</td><td></td>
</tr>
</table>

### NonRegressionPrimitives

Non-regression sequence covering FullSync group and RBAC primitives with isolated nr_* data

### Permissions

list all permissions

### PermissionsOfRole

list permissions of a role

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>role</td><td></td>
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

### RemovePermissionFromRole

remove a permission from a role

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>action</td><td></td>
</tr>
<tr>
<td>element</td><td></td>
</tr>
<tr>
<td>role</td><td></td>
</tr>
<tr>
<td>scope</td><td></td>
</tr>
</table>

### RemoveRoleFromGroup

remove a role from a group

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
<tr>
<td>role</td><td></td>
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

### Roles

list all roles

### RolesOfGroup

list roles of a group

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
</table>

### RolesOfPermission

list roles of a permission

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>permission</td><td></td>
</tr>
</table>

### SeedRbacDemoData

seed a complex RBAC demo dataset

### SetGroupAttributes

Set or merge attributes for a group. Parameters: group is the group name; attributes is a JSON object encoded as a string, for example {"label":"Managers","level":"2"}; mergePolicy is optional and is forwarded to the FullSync PostDocument p_merge parameter. By default, the new attributes object is merged with the existing attributes object: existing keys are kept, provided keys are added or replaced. Use mergePolicy to control special merge behavior on paths, for example {"attributes.label":"delete"} removes the label key, {"attributes.tags":"append"} appends to an array, and {"attributes.profile":"override"} replaces the nested object instead of deep-merging it. The document id is deterministic: sha256("groupAttributes:" + group). Stored document type is c8oGroupAttributes.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>attributes</td><td></td>
</tr>
<tr>
<td>group</td><td></td>
</tr>
<tr>
<td>mergePolicy</td><td></td>
</tr>
</table>

### SetPermissionAttributes

Set or merge attributes for a permission. Parameters: permission is the canonical permission string, for example resource.action:scope; attributes is a JSON object encoded as a string, for example {"label":"Can read all records","risk":"low"}; mergePolicy is optional and is forwarded to the FullSync PostDocument p_merge parameter. By default, the new attributes object is merged with the existing attributes object: existing keys are kept, provided keys are added or replaced. Use mergePolicy to control special merge behavior on paths, for example {"attributes.label":"delete"} removes the label key, {"attributes.tags":"append"} appends to an array, and {"attributes.profile":"override"} replaces the nested object instead of deep-merging it. The document id is deterministic: sha256("permissionAttributes:" + permission). Stored document type is c8oPermissionAttributes.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>attributes</td><td></td>
</tr>
<tr>
<td>mergePolicy</td><td></td>
</tr>
<tr>
<td>permission</td><td></td>
</tr>
</table>

### SetPermissionInRole

add a permission to a role

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>action</td><td></td>
</tr>
<tr>
<td>element</td><td></td>
</tr>
<tr>
<td>role</td><td></td>
</tr>
<tr>
<td>scope</td><td></td>
</tr>
</table>

### SetRoleAttributes

Set or merge attributes for a role. Parameters: role is the role name; attributes is a JSON object encoded as a string, for example {"label":"Reader","priority":"10"}; mergePolicy is optional and is forwarded to the FullSync PostDocument p_merge parameter. By default, the new attributes object is merged with the existing attributes object: existing keys are kept, provided keys are added or replaced. Use mergePolicy to control special merge behavior on paths, for example {"attributes.label":"delete"} removes the label key, {"attributes.tags":"append"} appends to an array, and {"attributes.profile":"override"} replaces the nested object instead of deep-merging it. The document id is deterministic: sha256("roleAttributes:" + role). Stored document type is c8oRoleAttributes.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>attributes</td><td></td>
</tr>
<tr>
<td>mergePolicy</td><td></td>
</tr>
<tr>
<td>role</td><td></td>
</tr>
</table>

### SetRoleInGroup

add a role to a group

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td></td>
</tr>
<tr>
<td>role</td><td></td>
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



