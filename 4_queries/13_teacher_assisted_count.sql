SELECT teachers.name AS teacher, cohorts.name AS cohort,count(assistance_requests.*) AS total_assistances 
FROM assistance_requests 
JOIN teachers ON teachers.id=assistance_requests.teacher_id
JOIN students ON students.id=assistance_requests.student_id
JOIN cohorts ON cohorts.id=students.cohort_id
GROUP BY teachers.name,cohorts.name
HAVING cohorts.name='JUL02'
ORDER BY teacher;