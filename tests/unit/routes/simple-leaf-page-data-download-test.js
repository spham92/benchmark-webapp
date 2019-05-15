import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | simple-leaf-page-data-download', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:simple-leaf-page-data-download');
    assert.ok(route);
  });
});
