import React, {Component} from 'react';

const Header = ({data}) => {
  return (
    <header>
      <h1>{data.contact.name}</h1>
      <h2 className="job-title">{data.contact.title}</h2>
    </header>
  )
}

const Aside = ({data}) => {
  const c = data.contact;
  return (
    <aside className="aside">
      <p className="summary" dangerouslySetInnerHTML={{__html: data.summary}} />
      
      <div className="email"><a href={`mailto:${c.email}`}>{c.email}</a></div>
      <div className="phone"><a href={`tel:${c.phone}`}>{c.phone}</a></div>
      <div className="address"><a href="https://goo.gl/maps/7hTSM4Ln3Wx">{c.address}</a></div>
      <div className="github"><a href={`https://github.com/${c.github}`}>{c.github}</a></div>
      <div className="website"><a href={`https://${c.website}`}>{c.website}</a></div>
      <div className="linkedin"><a href={`https://www.linkedin.com/in/${c.linkedin}`}>{c.linkedin}</a></div>
    </aside>
  )
}

const Experience = ({data}) => {
  return (
    <div className="info-block">
      <h3 className="heading">{data.title} &mdash; {data.organization}</h3>
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

const Education = ({data}) => {
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
            data.info && data.info.map((info, key) => <li key={key}>{info}</li>)
          }
        </ul>
      }
    </div>
  );
}

const Achievement = ({data}) => {
  return (
    <li>
      <h3>{data.title}</h3>
      {data.info.map((info, key) => <p key={key} dangerouslySetInnerHTML={{__html: info}}></p>)}
    </li>
  )
}

const SkillGraph = ({skills}) => {
  // create an array of empty elements
  const labels = new Array(10).fill(undefined);
  labels[3 - 1] = "Basic";
  labels[6 - 1] = "Pro";
  labels[8 - 1] = "Expert";

  return (
    <div className="skill-graph" role="presentation">
      <div className="bars">
        {
          skills.map(
            (skill, key) => (
              <div key={key} className={`bar bar-${skill.strength * 10}`}>
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

  render() {
    return (
      <div className="resume">
        <Header data={this.props.data} />
        <Aside data={this.props.data} />
        <main>
          <section className="education">
            <h2>Education</h2>
            {this.props.data.education.map((data, key) => <Education data={data} key={key} />)}
          </section>
          <section className="achievements">
            <h2>Achievements</h2>
            <ul>
              {this.props.data.achievements.map((data, key) => <Achievement data={data} key={key} />)}
            </ul>
          </section>
          <section className="skills">
            <h2>Skills</h2>
            <SkillGraph skills={this.props.data.skills} />
          </section>
          <section className="experience">
            <h2>Experience</h2>
            {this.props.data.experience.map((data, key) => <Experience data={data} key={key} />)}
          </section>
        </main>
      </div>
    );
  }
}
export default App;
