const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const inputArgs = process.argv.slice(2, 4);
console.log(inputArgs);
pool
  .query(
    `SELECT students.id as id, students.name as name, cohorts.name as cohort_name
  FROM students 
  JOIN cohorts ON cohort_id = cohorts.id 
  WHERE cohorts.name LIKE '%${inputArgs[0]}%'
  LIMIT ${inputArgs[1] || 5};`
  )
  .then((res) => {
    res.rows.forEach((student) => {
      console.log(
        `${student.name} has an id of ${student.id} and was in the ${student.cohort_name} cohort`
      );
    });
    pool.end();
  })
  .catch((err) => console.error("query error", err));
