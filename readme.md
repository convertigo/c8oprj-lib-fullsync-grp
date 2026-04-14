


# lib_FullSyncGrp

Library to define users and groups for fullsync replication filtering


For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [RBAC](#rbac)
    - [Model](#model)
    - [Permission format](#permission-format)
    - [Role normalization](#role-normalization)
    - [Resolution rules](#resolution-rules)
    - [RBAC sequences](#rbac-sequences)
- [Sequences](#sequences)
    - [Groups](#groups)
    - [GroupsOfRole](#groupsofrole)
    - [EffectivePermissionsOfUser](#effectivepermissionsofuser)
    - [GroupsOf](#groupsof)
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
    - [SetPermissionInRole](#setpermissioninrole)
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


## RBAC

This library now supports a simple RBAC layer on top of the existing `user -> group` model.

### Model

The current authorization model is based on 3 relations:

- `user -> group`
- `group -> role`
- `role -> permission`

The library stores these relations as link documents in FullSync:

- `c8oGrp` for `user -> group`
- `c8oGrpRole` for `group -> role`
- `c8oRolePerm` for `role -> permission`

This keeps the implementation aligned with the original project design: users, groups, roles, and permissions are resolved from link documents rather than from heavy standalone entities.

### Permission format

Permissions use the canonical format:

`element.action:scope`

Examples:

- `project.read:own`
- `project.read:all`
- `gestioncrm.read:all`

`SetPermissionInRole` builds this permission string from 4 inputs:

- `role`
- `element`
- `action`
- `scope`

### Role normalization

Roles are normalized in lowercase at write and lookup time.

This means:

- `MonSuperRole`
- `monsuperrole`

are treated as the same role.

### Resolution rules

`EffectivePermissionsOfUser` resolves permissions through:

`user -> groups -> roles -> permissions`

The sequence applies two rules:

1. Duplicate permissions are removed.
2. For the same `element.action`, only the strongest scope is kept.

Current scope priority:

- `all`
- `own`

Example:

- `project.read:own`
- `project.read:all`

Effective result:

- `project.read:all`

`deny` is not implemented yet.

### RBAC sequences

The RBAC layer currently exposes these sequences:

- `SetRoleInGroup(group, role)`
- `RemoveRoleFromGroup(group, role)`
- `RolesOfGroup(group)`
- `GroupsOfRole(role)`
- `SetPermissionInRole(role, element, action, scope)`
- `RemovePermissionFromRole(role, element, action, scope)`
- `PermissionsOfRole(role)`
- `RolesOfPermission(permission)`
- `Roles()`
- `Permissions()`
- `EffectivePermissionsOfUser(user)`


## Sequences

### Groups

list all groups

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

### EffectivePermissionsOfUser

list effective permissions of a user through groups and roles

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>user</td><td></td>
</tr>
</table>

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
<td>role</td><td></td>
</tr>
<tr>
<td>element</td><td></td>
</tr>
<tr>
<td>action</td><td></td>
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

### SetPermissionInRole

add a permission to a role

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>role</td><td></td>
</tr>
<tr>
<td>element</td><td></td>
</tr>
<tr>
<td>action</td><td></td>
</tr>
<tr>
<td>scope</td><td></td>
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


