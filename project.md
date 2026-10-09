
# ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/core/images/project_color_16x16.png?raw=true "Project") lib_FullSyncGrp

Library to define users, groups, roles, permissions, and optional attributes (RBAC) for fullsync replication filtering. Listing sequences keep their legacy response by default; set withAttributes=true to include attributes.

## User listing semantics

There is no standalone user document in this library: users exist only through their group memberships (c8oGrp documents). As a result, the Users sequence lists only users that belong to at least one group; a user with no group is not represented in the database and is never listed. The groups attribute of each user element is the number of groups the user belongs to. To list users known to the system regardless of groups, cross-reference the account source (for example lib_UserManager) instead.

## Delegated group administration

Delegation restricts the administration of a group to users who belong to authorized administrator groups.

### Global configuration

The `lib.fullsyncgrp.delegation.adminGroups` symbol contains a JSON array of central administrator groups, for example `["grp_platform_admins"]`. A user who belongs to any of these groups may administer protected groups and change their delegation settings.

The default value is `[]`. An empty array disables delegation entirely, so administration operations remain authorized as they were in earlier versions.

### Protecting a group


A group's delegation is stored in the reserved `administrableBy` attribute as a JSON array of group names, for example `["grp1", "grp2"]`.

- When `administrableBy` is missing or empty, the group is not protected.
- When `administrableBy` contains groups, the authenticated user must belong to at least one of them or to a central administrator group.
- An unauthenticated user cannot administer a protected group.
- Only the `SetGroupAdministrators` sequence can change `administrableBy`, and this sequence is restricted to central administrators.
- `SetGroupAttributes` rejects direct changes to this reserved attribute, including changes made through a merge policy.

### Authorization checks

The private `CanAdministerGroup` sequence evaluates authorization for one group. Its response includes `allowed` and `reason`. The reason indicates whether delegation is disabled, the group is not protected, the user is a central or delegated administrator, or access is denied.

The following operations perform this check before writing: adding or removing a user, adding or removing a role, changing group attributes, renaming a group, and deleting a group.

Bulk sequences authorize every distinct target group before the first mutation. If authorization fails for any group, the entire bulk operation is rejected without writing anything. The private `CanAdministerGroups` sequence performs this preflight check and returns the first rejected group in `deniedGroup`.

### Setup

1. Configure `lib.fullsyncgrp.delegation.adminGroups` with the central administrator groups.
2. Add central administrators to at least one of these groups.
3. Call `SetGroupAdministrators` to set the target group's `administrableBy` list.
4. Use the regular administration sequences; they enforce delegation automatically.

To remove protection from a group, call `SetGroupAdministrators` with `[]`.


<details><summary><span style="color:DarkGoldenRod"><i>References</i></span></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/references/images/XsdSchemaReference_16x16.png?raw=true "ImportXsdSchemaReference") CouchDb_schema


see [documentation](http://localhost:18080/convertigo/xsd/couchdb/CouchDb.xsd)
</p></blockquote></details>

<details><summary><span style="color:DarkGoldenRod"><i>Connectors</i></span></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/connectors/images/fullsyncconnector_color_16x16.png?raw=true "FullSyncConnector") c8ofullsyncgrp



<details><summary><span style="color:DarkGoldenRod"><i>Transactions</i></span></summary><blockquote><p>


<details><summary><b>GetAttributesByKindNameValue</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetAttributesByKindNameValue



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_key
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetGroupAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getdocument_color_16x16.png?raw=true "GetDocumentTransaction") GetGroupAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetGroupAttributesList</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetGroupAttributesList


</p></blockquote></details>

<details><summary><b>GetGroups</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetGroups


</p></blockquote></details>

<details><summary><b>GetGroupsByRole</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetGroupsByRole



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_key
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetGroupsByUser</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetGroupsByUser



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_key
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetPermissionAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getdocument_color_16x16.png?raw=true "GetDocumentTransaction") GetPermissionAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetPermissionAttributesList</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetPermissionAttributesList


</p></blockquote></details>

<details><summary><b>GetPermissions</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetPermissions


</p></blockquote></details>

<details><summary><b>GetPermissionsByRole</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetPermissionsByRole



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_key
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetRoleAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getdocument_color_16x16.png?raw=true "GetDocumentTransaction") GetRoleAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetRoleAttributesList</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetRoleAttributesList


</p></blockquote></details>

<details><summary><b>GetRoles</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetRoles


</p></blockquote></details>

<details><summary><b>GetRolesByGroup</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetRolesByGroup



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_key
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetRolesByPermission</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetRolesByPermission



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_key
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetServerInfo</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getserverinfo_color_16x16.png?raw=true "GetServerInfoTransaction") GetServerInfo


</p></blockquote></details>

<details><summary><b>GetUsers</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetUsers


</p></blockquote></details>

<details><summary><b>GetUsersByGroup</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/getview_color_16x16.png?raw=true "GetViewTransaction") GetUsersByGroup



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_key
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>PostBulkDocuments</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postbulkdocuments_color_16x16.png?raw=true "PostBulkDocumentsTransaction") PostBulkDocuments



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_c8oAcl
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_json_base
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>PostBulkDocumentsOverride</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postbulkdocuments_color_16x16.png?raw=true "PostBulkDocumentsTransaction") PostBulkDocumentsOverride



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_json_base
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>PostFind</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postfind_color_16x16.png?raw=true "PostFindTransaction") PostFind



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_limit
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_selector
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveGroup</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/deletedocument_color_16x16.png?raw=true "DeleteDocumentTransaction") RemoveGroup



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveGroupAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/deletedocument_color_16x16.png?raw=true "DeleteDocumentTransaction") RemoveGroupAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemovePermissionAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/deletedocument_color_16x16.png?raw=true "DeleteDocumentTransaction") RemovePermissionAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemovePermissionFromRole</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/deletedocument_color_16x16.png?raw=true "DeleteDocumentTransaction") RemovePermissionFromRole



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveRoleFromGroup</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/deletedocument_color_16x16.png?raw=true "DeleteDocumentTransaction") RemoveRoleFromGroup



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveUserFromGroup</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/deletedocument_color_16x16.png?raw=true "DeleteDocumentTransaction") RemoveUserFromGroup



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_docid
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetGroupAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postdocument_color_16x16.png?raw=true "PostDocumentTransaction") SetGroupAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_json_base
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_merge
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetPermissionAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postdocument_color_16x16.png?raw=true "PostDocumentTransaction") SetPermissionAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_json_base
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_merge
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetPermissionInRole</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postdocument_color_16x16.png?raw=true "PostDocumentTransaction") SetPermissionInRole



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_c8oAcl
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_id
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;action
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;element
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;permission
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;scope
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetRoleAttributes</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postdocument_color_16x16.png?raw=true "PostDocumentTransaction") SetRoleAttributes



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_json_base
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_use_merge
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetRoleInGroup</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postdocument_color_16x16.png?raw=true "PostDocumentTransaction") SetRoleInGroup



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_c8oAcl
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_id
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetUserInGroup</b></summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/couchdb/images/postdocument_color_16x16.png?raw=true "PostDocumentTransaction") SetUserInGroup



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_c8oAcl
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;_id
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;user
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>
</p></blockquote></details>
</p></blockquote></details>

<details><summary><span style="color:DarkGoldenRod"><i>Sequences</i></span></summary><blockquote><p>


<details><summary><b>CanAdministerGroup</b> : Determine whether the current authenticated user may administer a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") CanAdministerGroup

Determine whether the current authenticated user may administer a group. Global delegation administrators are configured by the project symbol lib.fullsyncgrp.delegation.adminGroups as a JSON array. An empty configured array disables delegation and preserves legacy behavior. When delegation is enabled, a group is protected only when its attributes contain a non-empty administrableBy array.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name to evaluate against the current authenticated user and the administrableBy group attribute.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>CanAdministerGroups</b> : Evaluate whether the current authenticated user may administer every distinct group in a JSON array</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") CanAdministerGroups

Evaluate whether the current authenticated user may administer every distinct group in a JSON array. All checks finish before callers start a bulk write. When the global delegation symbol is empty, the sequence returns allowed=true without per-group calls.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;groups
</td>
<td>
JSON array of group names to evaluate. Values are trimmed and deduplicated before checks.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>EffectivePermissionsOfUser</b> : list effective permissions of the current authenticated user through groups and roles</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") EffectivePermissionsOfUser

list effective permissions of the current authenticated user through groups and roles
</p></blockquote></details>

<details><summary><b>GetGroupAttributes</b> : Get attributes for a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") GetGroupAttributes

Get attributes for a group. Parameter: group is the group name. The sequence reads the deterministic attribute document sha256("groupAttributes:" + group), whose type is c8oGroupAttributes. The response is the FullSync document returned by GetDocument and contains couchdb_output.attributes as the JSON object previously written by SetGroupAttributes.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name whose attributes document is read. The read document id is sha256("groupAttributes:" + group).
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetPermissionAttributes</b> : Get attributes for a permission</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") GetPermissionAttributes

Get attributes for a permission. Parameter: permission is the canonical permission string. The sequence reads the deterministic attribute document sha256("permissionAttributes:" + permission), whose type is c8oPermissionAttributes. The response is the FullSync document returned by GetDocument and contains couchdb_output.attributes as the JSON object previously written by SetPermissionAttributes.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;permission
</td>
<td>
Canonical permission string whose attributes document is read. The read document id is sha256("permissionAttributes:" + permission).
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GetRoleAttributes</b> : Get attributes for a role</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") GetRoleAttributes

Get attributes for a role. Parameter: role is the role name. The sequence reads the deterministic attribute document sha256("roleAttributes:" + role), whose type is c8oRoleAttributes. The response is the FullSync document returned by GetDocument and contains couchdb_output.attributes as the JSON object previously written by SetRoleAttributes.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name whose attributes document is read. The read document id is sha256("roleAttributes:" + role).
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>Groups</b> : list all groups known from user-group links or group attributes documents</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") Groups

list all groups known from user-group links or group attributes documents

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include each group's attributes object when an attributes document exists. The legacy response is preserved when false.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GroupsByAttribute</b> : Search groups by exact top-level attribute value using the indexed attributes view</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") GroupsByAttribute

Search groups by exact top-level attribute value using the indexed attributes view. Set withAttributes=true to include the matching group's attributes object.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;name
</td>
<td>
Top-level attribute name to match exactly.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;value
</td>
<td>
Exact attribute value to match. JSON literals keep their type: true, 42, null; non-JSON input is matched as a string.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include each matching group's attributes object.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GroupsOf</b> : list groups of a user</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") GroupsOf

list groups of a user

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;user
</td>
<td>
User identifier used as the lookup key. The sequence returns every group containing this user.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include attributes for each returned group when an attributes document exists. The sequence loads group attributes in one view query, not one query per group.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>GroupsOfRole</b> : list groups of a role</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") GroupsOfRole

list groups of a role

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name used as the lookup key. It is normalized to lowercase before listing groups attached to this role.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include attributes for each returned group when an attributes document exists. The sequence loads group attributes in one view query, not one query per group.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>NonRegressionAttributeSearch</b> : Non-regression sequence covering exact indexed searches by group, role and permission attributes</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") NonRegressionAttributeSearch

Non-regression sequence covering exact indexed searches by group, role and permission attributes.
</p></blockquote></details>

<details><summary><b>NonRegressionCleanDeletes</b> : Non-regression sequence covering bulk cleanup performed by RemoveGroup, RemoveRole and RemovePermission</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") NonRegressionCleanDeletes

Non-regression sequence covering bulk cleanup performed by RemoveGroup, RemoveRole and RemovePermission
</p></blockquote></details>

<details><summary><b>NonRegressionPrimitives</b> : Non-regression sequence covering FullSync group and RBAC primitives with isolated nr_* data</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") NonRegressionPrimitives

Non-regression sequence covering FullSync group and RBAC primitives with isolated nr_* data
</p></blockquote></details>

<details><summary><b>Permissions</b> : list all permissions known from role-permission links or permission attributes documents</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") Permissions

list all permissions known from role-permission links or permission attributes documents

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include each permission's attributes object when an attributes document exists. The legacy response is preserved when false.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>PermissionsByAttribute</b> : Search permissions by exact top-level attribute value using the indexed attributes view</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") PermissionsByAttribute

Search permissions by exact top-level attribute value using the indexed attributes view. Set withAttributes=true to include the matching permission's attributes object.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;name
</td>
<td>
Top-level attribute name to match exactly.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;value
</td>
<td>
Exact attribute value to match. JSON literals keep their type: true, 42, null; non-JSON input is matched as a string.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include each matching permission's attributes object.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>PermissionsOfRole</b> : list permissions of a role</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") PermissionsOfRole

list permissions of a role

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name used as the lookup key. It is normalized to lowercase before listing permissions attached to this role.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include attributes for each returned permission when an attributes document exists. The sequence loads permission attributes in one view query, not one query per permission.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveGroup</b> : Remove a group and clean up all related user-group links, group-role links and group attributes in bulk</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemoveGroup

Remove a group and clean up all related user-group links, group-role links and group attributes in bulk. When delegation is enabled, protected groups require authorization through CanAdministerGroup before any read-delete workflow starts.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Name of the group to remove. The sequence deletes user-group links, group-role links and group attributes in bulk.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemovePermission</b> : Remove a permission and cleanup all related role-permission links and permission attributes documents in bulk</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemovePermission

Remove a permission and cleanup all related role-permission links and permission attributes documents in bulk

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;permission
</td>
<td>
Permission name to remove. The permission is normalized to lowercase, then role-permission links and permission attributes are deleted in bulk.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemovePermissionAttributes</b> : Remove attributes for a permission without removing any role-permission link</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemovePermissionAttributes

Remove attributes for a permission without removing any role-permission link. Parameter: permission is the canonical permission string. The sequence deletes the deterministic attribute document sha256("permissionAttributes:" + permission), whose type is c8oPermissionAttributes. This primitive is intentionally separate from RemovePermissionFromRole because a permission can be attached to several roles.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;permission
</td>
<td>
Canonical permission string whose attributes document must be removed. This does not remove role-permission links.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemovePermissionFromRole</b> : remove a permission from a role</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemovePermissionFromRole

remove a permission from a role

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;action
</td>
<td>
Permission action to remove. It is normalized to lowercase and combined with element and scope as element.action:scope.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;element
</td>
<td>
Permission resource element to remove. It is normalized to lowercase and combined with action and scope as element.action:scope.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name from which the permission is removed. The role is normalized to lowercase before the role-permission link id is computed.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;scope
</td>
<td>
Permission scope to remove. It is normalized to lowercase and combined with element and action as element.action:scope.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveRole</b> : Remove a role and cleanup all related group-role links, role-permission links and role attributes documents in bulk</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemoveRole

Remove a role and cleanup all related group-role links, role-permission links and role attributes documents in bulk

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name to remove. The role is normalized to lowercase, then group-role links, role-permission links and role attributes are deleted in bulk.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveRoleFromGroup</b> : Remove a role from a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemoveRoleFromGroup

Remove a role from a group. When delegation is enabled, protected groups require authorization through CanAdministerGroup before the group-role link is deleted.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name from which the role is removed. The group-role document id is sha256(group + ":" + normalized role).
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name to remove from the group. The role is normalized to lowercase before the group-role link id is computed.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveUserFromGroup</b> : Remove a user from a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemoveUserFromGroup

Remove a user from a group. When delegation is enabled, protected groups require authorization through CanAdministerGroup before the membership is deleted.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name from which the user membership is removed. The membership document id is sha256(user + ":" + group).
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;user
</td>
<td>
User identifier to remove from the group. The membership document id is sha256(user + ":" + group).
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RemoveUserInGroupBulkV2</b> : Bulk remove one or more users from one or more groups</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RemoveUserInGroupBulkV2

Bulk remove one or more users from one or more groups. Distinct target groups are authorized together before the first write, so a denied bulk operation is never partially applied.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;groups
</td>
<td>
Array<String> groups -- should be stringified from front-end
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;users
</td>
<td>
Array<String> users -- should be stringified from front-end
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>Roles</b> : list all roles known from group-role links or role attributes documents</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") Roles

list all roles known from group-role links or role attributes documents

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include each role's attributes object when an attributes document exists. The legacy response is preserved when false.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RolesByAttribute</b> : Search roles by exact top-level attribute value using the indexed attributes view</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RolesByAttribute

Search roles by exact top-level attribute value using the indexed attributes view. Set withAttributes=true to include the matching role's attributes object.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;name
</td>
<td>
Top-level attribute name to match exactly.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;value
</td>
<td>
Exact attribute value to match. JSON literals keep their type: true, 42, null; non-JSON input is matched as a string.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include each matching role's attributes object.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RolesOfGroup</b> : list roles of a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RolesOfGroup

list roles of a group

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name used as the lookup key. The sequence returns every role attached to this group.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include attributes for each returned role when an attributes document exists. The sequence loads role attributes in one view query, not one query per role.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>RolesOfPermission</b> : list roles of a permission</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") RolesOfPermission

list roles of a permission

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;permission
</td>
<td>
Canonical permission string used as the lookup key, in the form element.action:scope. The sequence returns every role containing this permission.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;withAttributes
</td>
<td>
Optional boolean, default false. Set to true to include attributes for each returned role when an attributes document exists. The sequence loads role attributes in one view query, not one query per role.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SeedRbacDemoData</b> : seed a complex RBAC demo dataset</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SeedRbacDemoData

seed a complex RBAC demo dataset
</p></blockquote></details>

<details><summary><b>SetGroupAdministrators</b> : Set the administrableBy attribute of a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetGroupAdministrators

Set the administrableBy attribute of a group. The current authenticated user must belong to one of the central administrator groups configured by the project symbol lib.fullsyncgrp.delegation.adminGroups. The administrableBy parameter is a JSON array of group names; an empty array removes group delegation. Other group attributes are preserved.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;administrableBy
</td>
<td>
JSON array of group names allowed to administer the target group. Names are trimmed and deduplicated. Use [] to remove delegation from the group.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name whose administrableBy attribute is replaced.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetGroupAttributes</b> : Set or merge non-delegation attributes for a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetGroupAttributes

Set or merge non-delegation attributes for a group. Parameters: group is the group name; attributes is a JSON object encoded as a string, for example {"label":"Managers","level":"2"}; mergePolicy is optional and is forwarded to the FullSync PostDocument p_merge parameter. The administrableBy attribute is reserved and must be changed through SetGroupAdministrators. When delegation is enabled, protected groups require authorization through CanAdministerGroup before attributes are written. By default, the new attributes object is merged with the existing attributes object: existing keys are kept, provided keys are added or replaced.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;attributes
</td>
<td>
JSON object encoded as a string. Provided keys are merged into the existing attributes object, for example {"label":"Managers","level":"2"}. The reserved administrableBy attribute is rejected and must be changed through SetGroupAdministrators.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name owning the attributes document. The stored document id is sha256("groupAttributes:" + group).
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;mergePolicy
</td>
<td>
Optional FullSync PostDocument p_merge JSON string. It controls special merge behavior by path, for example {"attributes.label":"delete"}, {"attributes.tags":"append"}, or {"attributes.profile":"override"}. Policies targeting attributes.administrableBy are rejected.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetPermissionAttributes</b> : Set or merge attributes for a permission</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetPermissionAttributes

Set or merge attributes for a permission. Parameters: permission is the canonical permission string, for example resource.action:scope; attributes is a JSON object encoded as a string, for example {"label":"Can read all records","risk":"low"}; mergePolicy is optional and is forwarded to the FullSync PostDocument p_merge parameter. By default, the new attributes object is merged with the existing attributes object: existing keys are kept, provided keys are added or replaced. Use mergePolicy to control special merge behavior on paths, for example {"attributes.label":"delete"} removes the label key, {"attributes.tags":"append"} appends to an array, and {"attributes.profile":"override"} replaces the nested object instead of deep-merging it. The document id is deterministic: sha256("permissionAttributes:" + permission). Stored document type is c8oPermissionAttributes.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;attributes
</td>
<td>
JSON object encoded as a string. Provided keys are merged into the existing attributes object, for example {"label":"Can read all records","risk":"low"}.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;mergePolicy
</td>
<td>
Optional FullSync PostDocument p_merge JSON string. It controls special merge behavior by path, for example {"attributes.label":"delete"}, {"attributes.tags":"append"}, or {"attributes.profile":"override"}.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;permission
</td>
<td>
Canonical permission string owning the attributes document, for example resource.action:scope. The stored document id is sha256("permissionAttributes:" + permission).
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetPermissionInRole</b> : add a permission to a role</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetPermissionInRole

add a permission to a role

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;action
</td>
<td>
Permission action. It is normalized to lowercase and combined with element and scope as element.action:scope.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;element
</td>
<td>
Permission resource element. It is normalized to lowercase and combined with action and scope as element.action:scope.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name receiving the permission. The role is normalized to lowercase before the role-permission link is stored.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;scope
</td>
<td>
Permission scope. It is normalized to lowercase and combined with element and action as element.action:scope.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetRoleAttributes</b> : Set or merge attributes for a role</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetRoleAttributes

Set or merge attributes for a role. Parameters: role is the role name; attributes is a JSON object encoded as a string, for example {"label":"Reader","priority":"10"}; mergePolicy is optional and is forwarded to the FullSync PostDocument p_merge parameter. By default, the new attributes object is merged with the existing attributes object: existing keys are kept, provided keys are added or replaced. Use mergePolicy to control special merge behavior on paths, for example {"attributes.label":"delete"} removes the label key, {"attributes.tags":"append"} appends to an array, and {"attributes.profile":"override"} replaces the nested object instead of deep-merging it. The document id is deterministic: sha256("roleAttributes:" + role). Stored document type is c8oRoleAttributes.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;attributes
</td>
<td>
JSON object encoded as a string. Provided keys are merged into the existing attributes object, for example {"label":"Reader","priority":"10"}.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;mergePolicy
</td>
<td>
Optional FullSync PostDocument p_merge JSON string. It controls special merge behavior by path, for example {"attributes.label":"delete"}, {"attributes.tags":"append"}, or {"attributes.profile":"override"}.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name owning the attributes document. The stored document id is sha256("roleAttributes:" + role).
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetRoleInGroup</b> : Add a role to a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetRoleInGroup

Add a role to a group. When delegation is enabled, protected groups require authorization through CanAdministerGroup before the group-role link is written.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name receiving the role. The group-role document id is sha256(group + ":" + normalized role).
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;role
</td>
<td>
Role name to add to the group. The role is normalized to lowercase before the group-role link is stored.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetUserInGroup</b> : Add a user to a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetUserInGroup

Add a user to a group. When delegation is enabled, protected groups require authorization through CanAdministerGroup before the membership is written.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name receiving the user membership. The membership document id is sha256(user + ":" + group).
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;user
</td>
<td>
User identifier to add to the group. The membership document id is sha256(user + ":" + group).
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetUserInGroupBulk</b> : Bulk add user-group memberships from the legacy bulkOBj format</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetUserInGroupBulk

Bulk add user-group memberships from the legacy bulkOBj format. Distinct target groups are authorized together before the first write, so a denied bulk operation is never partially applied.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/multivaluedvariable_color_16x16.png?raw=true "  alt="RequestableMultiValuedVariable" >&nbsp;bulkOBj
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>SetUserInGroupBulkV2</b> : Bulk add one or more users to one or more groups</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") SetUserInGroupBulkV2

Bulk add one or more users to one or more groups. Distinct target groups are authorized together before the first write, so a denied bulk operation is never partially applied.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;groups
</td>
<td>
Array<String> groups -- should be stringified from front-end
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;users
</td>
<td>
Array<String> users -- should be stringified from front-end
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>UpdateGroup</b> : Rename a group by moving its users from old_group_name to new_group_name and removing the old group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") UpdateGroup

Rename a group by moving its users from old_group_name to new_group_name and removing the old group. When delegation is enabled, both the source and destination groups are authorized before any change.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;new_group_name
</td>
<td>
Target group name that receives the users previously attached to old_group_name.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;old_group_name
</td>
<td>
Existing group name to replace. UpdateGroup moves its users to new_group_name, removes the old group links, and removes the old GroupAttributes document through RemoveGroup.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>Users</b> : list all users that belong to at least one group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") Users

list all users that belong to at least one group. There is no standalone user document in this library: a user with no group is not represented in the database and is therefore never listed. Each <user> element carries a 'groups' attribute with the number of groups the user belongs to.
</p></blockquote></details>

<details><summary><b>UsersOf</b> : list users of a group</summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") UsersOf

list users of a group

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;group
</td>
<td>
Group name used as the lookup key. The sequence returns every user attached to this group.
</td>
</tr>
</table>

</p></blockquote></details>
</p></blockquote></details>
