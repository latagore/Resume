import React, {Component} from 'react';

const Experience = (data, key) => {
  return (
    <div key={key}>
      <h3 className="heading">{data.title} - {data.organization}</h3>
      <div className="location">{data.location}</div>
      <div className="date">{data.startDate} to {data.endDate}</div>
      {data.info &&
        <ul className="info">
        {
          data.info.map((info, key) => <li key={key}>{info}</li>)
        }
        </ul>
      }
    </div>
  );
}

const Education = (data, key) => {
  console.log(data.gpa);
  return (
    <div key={key}>
      <h3 className="heading">{data.title} - {data.organization}</h3>
      <div className="location">{data.location}</div>
      <div className="date">{data.startDate} to {data.endDate}</div>
      {(data.info || data.gpa) &&
        <ul className="info">
          {
            data.gpa && <li>Overall GPA: {data.gpa.overall} out of {data.gpa.max}. Major GPA: {data.gpa.major} out of {data.gpa.max}</li>
          }
          {
            data.info && data.info.map((info, key) => <li key={key}>{info}</li>)
          }
        </ul>
      }
    </div>
  );
}

const SkillGraph = (skills) => {
  // create an array of empty elements
  const labels = new Array(10).fill(undefined);
  labels[3 - 1] = "Basic";
  labels[6 - 1] = "Professional";
  labels[8 - 1] = "Expert";

  return (
    <figure>
      <div className="skill-graph" role="presentation">
        <div className="labels">
        {
          labels.map(
            (label, i) => label && <span key={i} className="label-{i}" role="presentation">{label}</span>
          )
        }
        </div>
        <div className="bars">
          {
            skills.map(
              (skill, key) => (
                <div key={key} className="bar-{skill.strength * 10}">
                  <div>{skill.name}</div>
                  {skill.subskills && <div className="subskills">{skill.subskills.join(", ")}</div>}
                </div>
              )
            )
          }
        </div>
      </div>
    </figure>
  )
}

class App extends Component {

  render() {
    return (
      <div>
        <section className="education">
          <h2>Education</h2>
          {this.props.data.education.map((e, i) => Education(e, i))}
        </section>
        <section className="skills">
          <h2>Skills</h2>
          {SkillGraph(this.props.data.skills)}
        </section>
        <section className="experience">
          <h2>Experience</h2>
          {this.props.data.experience.map((e, i) => Experience(e, i))}
        </section>
      </div>
    );
  }
}
export default App;
