const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx",
});

pool
  .query(
    `
    SELECT teachers.name AS teacher, cohorts.name AS cohort
    FROM assistance_requests 
    JOIN teachers ON teachers.id=assistance_requests.teacher_id
    JOIN students ON students.id=assistance_requests.student_id
    JOIN cohorts ON cohorts.id=students.cohort_id
    GROUP BY teachers.name,cohorts.name
    HAVING cohorts.name='${process.argv[2] || "JUL02"}'
    ORDER BY teacher;`
  )
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.cohort} : ${row.teacher} `);
    });
    pool.end();
  })
  .catch((err) => console.error("query error", err.stack));
