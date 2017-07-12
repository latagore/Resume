import React, {Component} from 'react';
import Aside from './Components/Aside.jsx';

const Header = ({data}) => {
  return (
    <header>
      <h1>{data.contact.name}</h1>
      <h2 className="job-title">{data.contact.title}</h2>
    </header>
  )
}

const Info = ({data, highlightedSkills}) => {
  if (data.description) {
    return (
      <div className="info-bullet">
        <p dangerouslySetInnerHTML={{__html: data.description}} />
        <ul className="skill-list">
          {data.skills && data.skills.map(
            (skill, i) => {
              let className = "text";
              if (highlightedSkills.has(skill)) {
                className += " highlighted";
              }
              return <li key={i}><span className={className}>{skill}</span></li>
            }
          )}
        </ul>
      </div>
    )
  } else {
    return <div dangerouslySetInnerHTML={{__html: data}} />
  }
}

const Experience = ({data, highlightedSkills}) => {
  return (
    <div className="info-block">
      <h3 className="heading">{data.title} &mdash; {data.organization}</h3>
      <div className="location">{data.location}</div>
      <div className="date">{data.startDate} to {data.endDate}</div>
      {data.info &&
        <ul className="info">
        {
          data.info.map((info, key) => <li key={key}><Info data={info} highlightedSkills={highlightedSkills} /></li>)
        }
        </ul>
      }
    </div>
  );
}

const Education = ({data, highlightedSkills}) => {
  return (
    <div className="info-block">
      <h3 className="heading">{data.title} &mdash; {data.organization}</h3>
      <div className="location">{data.location}</div>
      <div className="date">{data.startDate} to {data.endDate}</div>
      {(data.info || data.gpa) &&
        <ul className="info">
          {
            data.gpa && <li>Overall GPA: {data.gpa.overall} out of {data.gpa.max}. Major GPA: {data.gpa.major} out of {data.gpa.max}</li>
          }
          {
            data.info && data.info.map((info, key) => <li key={key}><Info data={info} highlightedSkills={highlightedSkills} /></li>)
          }
        </ul>
      }
    </div>
  );
}

const Achievement = ({data, highlightedSkills}) => {
  return (
    <li>
      <h3>{data.title}</h3>
      <Info data={data} highlightedSkills={highlightedSkills} />
    </li>
  )
}

const SkillGraph = ({skills}) => {
  const GRAPH_SEGMENTS = 10;
  // create an array of empty elements
  const labels = new Array(GRAPH_SEGMENTS).fill(undefined);
  labels[3 - 1] = "Basic";
  labels[6 - 1] = "Pro";
  labels[8 - 1] = "Expert";

  return (
    <div className="skill-graph info-block" role="presentation">
      <div className="background" role="presentation">
        {
          new Array(GRAPH_SEGMENTS + 1).fill(1) // create dummy array to iterate from 1 to 11. add one to add last gridline
            .map((el, i) => {
              return <div key={i} className={`gridline-${i + 1}`} role="presentation"></div>
            })
        }
      </div>
      <div className="bars">
        {
          skills.map(
            (skill, key) => (
              <div key={key} className={`bar bar-${skill.strength * GRAPH_SEGMENTS}`}>
                <div className="bar-content">
                  <span>{skill.name}</span>
                  {skill.subskills && <br />}
                  {skill.subskills && <span className="subskills">{skill.subskills.join(", ")}</span>}
                </div>
              </div>
            )
          )
        }
      </div>
      <div className="labels">
      {
        labels.map(
          (label, i) => label && <span key={i} className={`label-${i + 1}`} role="presentation">{label}</span>
        )
      }
      </div>
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      highlightedSkills: new Set()
    };
  }

  _onSkillHighlightToggle = (skill) => {
    this.setState((state) => {
      if (state.highlightedSkills.has(skill)) {
        state.highlightedSkills.delete(skill);
      } else {
        state.highlightedSkills.add(skill)
      }
      return state;
    })
  }

  render() {
    return (
      <div className="resume">
        <Header data={this.props.data} />
        <Aside data={this.props.data} onSkillHighlightToggle={this._onSkillHighlightToggle}/>
        <main>
          <section className="experience">
            <h2>Experience</h2>
            {this.props.data.experience.map((data, key) => <Experience data={data} key={key} highlightedSkills={this.state.highlightedSkills} />)}
          </section>
          <section className="skills">
            <h2>Skills</h2>
            <SkillGraph skills={this.props.data.skills} />
          </section>
          <section className="education">
            <h2>Education</h2>
            {this.props.data.education.map((data, key) => <Education data={data} key={key} highlightedSkills={this.state.highlightedSkills} />)}
          </section>
          <section className="achievements">
            <h2>Projects</h2>
            <ul>
              {this.props.data.achievements.map((data, key) => <Achievement data={data} key={key} highlightedSkills={this.state.highlightedSkills}/>)}
            </ul>
          </section>
        </main>
      </div>
    );
  }
}
export default App;
