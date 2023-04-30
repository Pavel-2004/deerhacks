import { useState } from 'react';


export default function SkillsMenu(props) {
    const { skills } = props;
    const [values, setValues] = useState(
      skills.map((skill) => ({ name: skill, time: "", effectiveness: "" }))
    );
    const [showError, setShowError] = useState(false);
  
    const handleButtonClick = (skillIndex, field, value) => {
      const newValues = [...values];
      newValues[skillIndex][field] = value;
      setValues(newValues);
    };
  
    const handleLogClick = () => {
        const hasEmptyFields = values.some((value) => (
          value.time === "" || value.effectiveness === ""
        ));
      
        if (hasEmptyFields) {
          alert("Please fill in all fields before submitting.");
          return;
        }
      
        const mappedValues = values.map((value) => {
          let time;
          switch (value.time) {
            case "Morning":
              time = 1;
              break;
            case "Afternoon":
              time = 2;
              break;
            case "Evening":
              time = 3;
              break;
            default:
              time = null;
          }
          return {
            skill: value.name,
            time,
            effectiveness: parseInt(value.effectiveness),
          };
        });

        props.sendSkills(mappedValues)
      };
      
  
    return (
      <div className="skills-menu h-full">
        <h1>Skills Menu</h1>
        {skills.map((skill, skillIndex) => (
          <div className="skills-section" key={skill}>
            <h2>{skill}</h2>
            <h3 className="skills-prompt">What's the most ideal time for you to work on this subject?</h3>
            <div>
              <button
                className={values[skillIndex].time === "Morning" ? "selected" : ""}
                onClick={() => handleButtonClick(skillIndex, "time", "Morning")}
              >
                Morning
              </button>
              <button
                className={values[skillIndex].time === "Afternoon" ? "selected" : ""}
                onClick={() => handleButtonClick(skillIndex, "time", "Afternoon")}
              >
                Afternoon
              </button>
              <button
                className={values[skillIndex].time === "Evening" ? "selected" : ""}
                onClick={() => handleButtonClick(skillIndex, "time", "Evening")}
              >
                Evening
              </button>
            </div>
            <div>
                <h3 className="skills-prompt">How efficient are you with this subject?</h3>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <button
                  key={value}
                  className={values[skillIndex].effectiveness === value.toString() ? "selected" : ""}
                  onClick={() => handleButtonClick(skillIndex, "effectiveness", value.toString())}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
        {showError && <p>Please fill in all the requirements.</p>}
        <button onClick={handleLogClick}>Submit</button>
      </div>
    );
  }