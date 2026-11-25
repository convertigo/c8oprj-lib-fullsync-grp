const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const yaml = fs.readFileSync(path.join(__dirname, '../../_c8oProject/connectors/c8ofullsyncgrp.yaml'), 'utf8');
const lines = yaml.split('\n');
const start = lines.findIndex((l) => l.startsWith('↓design [couchdb.DesignDocument]')) + 3;
const body = [];
for (let i = start; i < lines.length && (lines[i].startsWith('      ') || lines[i] === ''); i++) body.push(lines[i].slice(6));
const design = JSON.parse(body.join('\n').trim().replace(/^'/, '').replace(/'$/, '').replace(/''/g, "'").replace(/\n/g, ''));
const compile = (source) => new Function('emit', 'log', 'return ' + source);

test('the connector is closed to replication and writes with the reserved ACL', () => {
  assert.match(yaml, /^replicationAccess: deny$/m);
  assert.doesNotMatch(yaml, /publicReplicationAllowed/);
  for (const name of ['PostBulkDocuments', 'SetUserInGroup', 'SetRoleInGroup', 'SetPermissionInRole',
    'SetGroupAttributes', 'SetRoleAttributes', 'SetPermissionAttributes']) {
    const block = yaml.split(`\n↓${name} [`)[1].split('\n↓')[0];
    assert.match(block, /\n  fullSyncAclPolicy: fromKeyC8oAcl\n/, name);
    assert.match(block, /↓_c8oAcl \[variables\.RequestableVariable-\d+\]: [\s\S]*?value: c8o:admin/, name);
  }
});

test('validate_doc_update refuses documents that are not written by the sequences', () => {
  const vdu = compile(design.validate_doc_update)();
  const accept = (doc) => { try { vdu(doc, null, {}); return true; } catch (e) { return false; } };
  assert.equal(accept({ _id: 'm', type: 'c8oGrp', user: 'u', group: 'g', '~c8oAcl': 'c8o:admin' }), true);
  assert.equal(accept({ _id: 'm', type: 'c8oGrp', user: 'u', group: 'g', '~c8oAcl': 'u' }), false);
  assert.equal(accept({ _id: 'm', type: 'c8oGrp', user: 'u', group: 'g' }), false);
  assert.equal(accept({ _id: 'm', _deleted: true }), true);
  assert.equal(accept({ _id: '_design/design' }), true);
});

test('membership views ignore documents without the reserved ACL', () => {
  for (const view of ['get_users_by_group', 'get_groups_by_user']) {
    const rows = [];
    const map = compile(design.views[view].map)((key, value) => rows.push([key, value]), () => {});
    map({ type: 'c8oGrp', user: 'alice', group: 'team', '~c8oAcl': 'c8o:admin' });
    map({ type: 'c8oGrp', user: 'eve', group: 'admins', '~c8oAcl': 'eve' });
    assert.equal(rows.length, 1, view);
    assert.ok(rows[0].includes('alice'));
  }
});

test('RemoveGroup also deletes the memberships the filtered views no longer list', () => {
  const removeGroup = fs.readFileSync(path.join(__dirname, '../../_c8oProject/sequences/RemoveGroup.yaml'), 'utf8');
  const code = removeGroup.split('↓BuildDeleteDocs [steps.SimpleStep-1784562106542]: \n  expression: |\n')[1].split('\n↓')[0]
    .split('\n').map((l) => l.slice(4)).join('\n').trim().replace(/^'/, '').replace(/'$/, '').replace(/''/g, "'");
  const context = {
    group: 'team', groupAttributeDocumentId: 'attr_team',
    userGroupRows: [{ id: 'm1' }], groupRoleRows: { id: 'r1' },
    org: { codehaus: { jettison: { json: { JSONObject: class { constructor(t) { this.q = JSON.parse(t); } } } } } },
    com: { twinsoft: { convertigo: { engine: { Engine: { theApp: { couchDbManager: { getFullSyncClient: () => ({
      postFind: (db, query) => {
        assert.equal(db, 'c8ofullsyncgrp');
        assert.deepEqual(query.q.selector, { type: 'c8oGrp', group: 'team' });
        return JSON.stringify({ docs: [{ _id: 'm1' }, { _id: 'm_legacy' }] });
      } }) } } } } } } },
  };
  require('node:vm').runInNewContext(code, context);
  assert.deepEqual(JSON.parse(context._use_json_base).map((d) => d._id), ['m1', 'r1', 'm_legacy', 'attr_team']);
});
