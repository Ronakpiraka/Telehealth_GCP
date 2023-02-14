'use strict';

function main(datasetId = 'Test_FHIR_Fetch', tableId = 'Patientv1') {
  // [START bigquery_table_insert_rows]
  // Import the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function insertRowsAsStream() {
    // Inserts the JSON objects into my_dataset:my_table.

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const datasetId = 'my_dataset';
    // const tableId = 'my_table';
    const rows = [
      {name: 'Tom', age: 30},
      {name: 'Jane', age: 32},
    ];

    // Insert data into a table
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);
    console.log(`Inserted ${rows.length} rows`);
  }
  // [END bigquery_table_insert_rows]
  insertRowsAsStream();
}
main(...process.argv.slice(2));
