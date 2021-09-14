SELECT cohorts.name AS cohort,
count(assignment_id) AS total_submissions
FROM assignment_submissions 
JOIN students ON student_id=students.id
JOIN cohorts ON cohort_id=cohorts.id
GROUP BY cohorts.name
ORDER By total_submissions DESC;