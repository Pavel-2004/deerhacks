export default function AssignmentsMenu(props) {
    // group assignments by section
    const assignmentsBySection = props.assignments.reduce((acc, cur) => {
      const sectionId = cur.sectionId;
      if (!acc[sectionId]) {
        acc[sectionId] = {
          sectionId: sectionId,
          sectionName: cur.sectionName,
          assignments: [cur]
        };
      } else {
        acc[sectionId].assignments.push(cur);
      }
      return acc;
    }, {});
  
    // render sections and their assignments
    const sections = Object.values(assignmentsBySection);
    return (
      <div className="assignment-menu">
        <h1>Assignments</h1>
        {sections.map((section) => (
          <div className="section-whole" key={section.sectionId}>
            <h2>{section.sectionName}</h2>
            <div className="section-card">
              {section.assignments.map((assignment) => (
                <div className="assignment-card" key={assignment.name}>
                  <h3>{assignment.name}</h3>
                  <p>{assignment.description}</p>
                  <p><strong>Due date:</strong> {assignment.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }