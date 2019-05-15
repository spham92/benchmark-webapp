import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['tableCount', 'apiSleepMs'],
  tableCount: 1,
  apiSleepMs: 0
});
