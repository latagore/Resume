import React, {Component} from 'react';

const Experience = (data, key) => {
  console.log(data.info)
  return (
    <div key={key}>
      <h3 className="heading">{data.title} - {data.organization}</h3>
      <div className="location">{data.location}</div>
      <div className="date">{data.startDate} to {data.endDate}</div>
      <ul className="info">
      {
        data.info.map(i => <li>{i}</li>)
      }
      </ul>
    </div>
  );
}

class App extends Component {

  render() {
    return (
      <section class="experience">
        {this.props.data.experience.map((e, i) => Experience(e, i))}
      </section>
    );
  }
}
export default App;
