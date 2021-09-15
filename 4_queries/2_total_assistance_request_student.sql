SELECT count(assistance_requests.*) AS total_assistances,name
FROM students 
JOIN assistance_requests ON students.id=assistance_requests.student_id
WHERE  students.name='Elliot Dickinson'
GROUP BY students.name;