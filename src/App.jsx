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

class App extends Component {

  render() {
    return (
      <div>
        <section className="education">
          {this.props.data.education.map((e, i) => Education(e, i))}
        </section>
        <section className="experience">
          {this.props.data.experience.map((e, i) => Experience(e, i))}
        </section>
      </div>
    );
  }
}
export default App;
