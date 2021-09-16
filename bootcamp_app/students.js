const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = `%${process.argv[2]}%`;
const limit = process.argv[3] || 5;
const values = [cohortName, limit];

pool
  .query(
    `SELECT students.id as id, students.name as name, cohorts.name as cohort_name
  FROM students 
  JOIN cohorts ON cohort_id = cohorts.id 
  WHERE cohorts.name LIKE $1
  LIMIT $2;`,
    values
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
