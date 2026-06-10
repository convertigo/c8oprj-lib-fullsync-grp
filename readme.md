


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
    - [RemovePermissionAttributes](#removepermissionattributes)
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
<td>group</td><td>Group name whose attributes document is read. The read document id is sha256("groupAttributes:" + group).</td>
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
<td>permission</td><td>Canonical permission string whose attributes document is read. The read document id is sha256("permissionAttributes:" + permission).</td>
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
<td>role</td><td>Role name whose attributes document is read. The read document id is sha256("roleAttributes:" + role).</td>
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
<td>user</td><td>User identifier used as the lookup key. The sequence returns every group containing this user.</td>
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
<td>role</td><td>Role name used as the lookup key. It is normalized to lowercase before listing groups attached to this role.</td>
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
<td>role</td><td>Role name used as the lookup key. It is normalized to lowercase before listing permissions attached to this role.</td>
</tr>
</table>

### RemoveGroup

Remove a group by deleting all user-group links for this group, and also deleting the attached GroupAttributes document if it exists. The group attributes document id is sha256("groupAttributes:" + group).

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>group</td><td>Group name to remove. RemoveGroup deletes all user-group links for this group and also deletes the attached GroupAttributes document if it exists.</td>
</tr>
</table>

### RemovePermissionAttributes

Remove attributes for a permission without removing any role-permission link. Parameter: permission is the canonical permission string. The sequence deletes the deterministic attribute document sha256("permissionAttributes:" + permission), whose type is c8oPermissionAttributes. This primitive is intentionally separate from RemovePermissionFromRole because a permission can be attached to several roles.

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>permission</td><td>Canonical permission string whose attributes document must be removed. This does not remove role-permission links.</td>
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
<td>action</td><td>Permission action to remove. It is normalized to lowercase and combined with element and scope as element.action:scope.</td>
</tr>
<tr>
<td>element</td><td>Permission resource element to remove. It is normalized to lowercase and combined with action and scope as element.action:scope.</td>
</tr>
<tr>
<td>role</td><td>Role name from which the permission is removed. The role is normalized to lowercase before the role-permission link id is computed.</td>
</tr>
<tr>
<td>scope</td><td>Permission scope to remove. It is normalized to lowercase and combined with element and action as element.action:scope.</td>
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
<td>group</td><td>Group name from which the role is removed. The group-role document id is sha256(group + ":" + normalized role).</td>
</tr>
<tr>
<td>role</td><td>Role name to remove from the group. The role is normalized to lowercase before the group-role link id is computed.</td>
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
<td>group</td><td>Group name from which the user membership is removed. The membership document id is sha256(user + ":" + group).</td>
</tr>
<tr>
<td>user</td><td>User identifier to remove from the group. The membership document id is sha256(user + ":" + group).</td>
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
<td>group</td><td>Group name used as the lookup key. The sequence returns every role attached to this group.</td>
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
<td>permission</td><td>Canonical permission string used as the lookup key, in the form element.action:scope. The sequence returns every role containing this permission.</td>
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
<td>attributes</td><td>JSON object encoded as a string. Provided keys are merged into the existing attributes object, for example {"label":"Managers","level":"2"}.</td>
</tr>
<tr>
<td>group</td><td>Group name owning the attributes document. The stored document id is sha256("groupAttributes:" + group).</td>
</tr>
<tr>
<td>mergePolicy</td><td>Optional FullSync PostDocument p_merge JSON string. It controls special merge behavior by path, for example {"attributes.label":"delete"}, {"attributes.tags":"append"}, or {"attributes.profile":"override"}.</td>
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
<td>attributes</td><td>JSON object encoded as a string. Provided keys are merged into the existing attributes object, for example {"label":"Can read all records","risk":"low"}.</td>
</tr>
<tr>
<td>mergePolicy</td><td>Optional FullSync PostDocument p_merge JSON string. It controls special merge behavior by path, for example {"attributes.label":"delete"}, {"attributes.tags":"append"}, or {"attributes.profile":"override"}.</td>
</tr>
<tr>
<td>permission</td><td>Canonical permission string owning the attributes document, for example resource.action:scope. The stored document id is sha256("permissionAttributes:" + permission).</td>
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
<td>action</td><td>Permission action. It is normalized to lowercase and combined with element and scope as element.action:scope.</td>
</tr>
<tr>
<td>element</td><td>Permission resource element. It is normalized to lowercase and combined with action and scope as element.action:scope.</td>
</tr>
<tr>
<td>role</td><td>Role name receiving the permission. The role is normalized to lowercase before the role-permission link is stored.</td>
</tr>
<tr>
<td>scope</td><td>Permission scope. It is normalized to lowercase and combined with element and action as element.action:scope.</td>
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
<td>attributes</td><td>JSON object encoded as a string. Provided keys are merged into the existing attributes object, for example {"label":"Reader","priority":"10"}.</td>
</tr>
<tr>
<td>mergePolicy</td><td>Optional FullSync PostDocument p_merge JSON string. It controls special merge behavior by path, for example {"attributes.label":"delete"}, {"attributes.tags":"append"}, or {"attributes.profile":"override"}.</td>
</tr>
<tr>
<td>role</td><td>Role name owning the attributes document. The stored document id is sha256("roleAttributes:" + role).</td>
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
<td>group</td><td>Group name receiving the role. The group-role document id is sha256(group + ":" + normalized role).</td>
</tr>
<tr>
<td>role</td><td>Role name to add to the group. The role is normalized to lowercase before the group-role link is stored.</td>
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
<td>group</td><td>Group name receiving the user membership. The membership document id is sha256(user + ":" + group).</td>
</tr>
<tr>
<td>user</td><td>User identifier to add to the group. The membership document id is sha256(user + ":" + group).</td>
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
<td>new_group_name</td><td>Target group name that receives the users previously attached to old_group_name.</td>
</tr>
<tr>
<td>old_group_name</td><td>Existing group name to replace. UpdateGroup moves its users to new_group_name, removes the old group links, and removes the old GroupAttributes document through RemoveGroup.</td>
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
<td>group</td><td>Group name used as the lookup key. The sequence returns every user attached to this group.</td>
</tr>
</table>



