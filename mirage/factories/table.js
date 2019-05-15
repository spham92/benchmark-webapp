import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  rows() {
    const rows = [];
    let count = 25;

    while (count > 0) {
      rows.push({
        first: faker.name.firstName(),
        last: faker.name.lastName(),
        description: faker.lorem.text()
      });
      count --;
    }

    return rows;
  }
});
