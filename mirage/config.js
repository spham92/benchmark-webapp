function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function() {
  this.get('/tables', async (schema, request) => {
    if (request.queryParams.apiSleepMs) {
      await sleep(Number(request.queryParams.apiSleepMs));
    }

    if (request.queryParams.tableCount) {
      return schema.tables.all().slice(0, Number(request.queryParams.tableCount));
    } else {
      return schema.tables.all();
    }
  });
  this.get('/tables/:id');
}
