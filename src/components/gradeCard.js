export default function GradeCard(props) {
    const { assignment } = props;
  
    return (
      <div className="grade-card">
        <h3>{assignment.assignmentName}</h3>
        <p>{assignment.description}</p>
        <p>Grade: {assignment.grade === null ? 'N/A' : assignment.grade}</p>
        <p>Date published: {assignment.datePublished}</p>
      </div>
    );
  }