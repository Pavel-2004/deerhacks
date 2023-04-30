import GradeCard from "./gradeCard";

export default function GradesMenu(props) {
  const assignments = props.assignments;
  
  // Group the assignments by sectionId
  const assignmentsBySection = assignments.reduce((acc, curr) => {
    if (!acc[curr.sectionId]) {
      acc[curr.sectionId] = {
        sectionName: curr.sectionName,
        assignments: [curr],
      };
    } else {
      acc[curr.sectionId].assignments.push(curr);
    }
    return acc;
  }, {});

  return (
    <div className="grades-menu">
      <h1>Grades</h1>
      {Object.values(assignmentsBySection).map((section) => (
        <div className="course-name"key={section.sectionName}>
          <h2>{section.sectionName}</h2>
            <div className="grades-for-course">
                {section.assignments.map((assignment) => (
                    <GradeCard key={assignment.assignmentName} assignment={assignment} />
                ))}
            </div>
        </div>
      ))}
    </div>
  );
}