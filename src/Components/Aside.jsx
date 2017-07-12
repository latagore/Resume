import React, {Component} from 'react';

class Aside extends Component {

  _onClick = (event) => {
    console.log(event.currentTarget.textContent);
    this.props.onSkillHighlightToggle(event.currentTarget.textContent);
  }

  render = () => {
    const {data, onSkillHighlight} = this.props;
    const c = data.contact;
    return (
      <aside className="aside">
        <div className="contact">
          <div className="email"><a href={`mailto:${c.email}`}>{c.email}</a></div>
          <div className="phone"><a href={`tel:${c.phone}`}>{c.phone}</a></div>
          <div className="address"><a href="https://goo.gl/maps/7hTSM4Ln3Wx">{c.address}</a></div>
          <div className="github"><a href={`https://github.com/${c.github}`}>{c.github}</a></div>
          <div className="website"><a href={`https://${c.website}`}>{c.website}</a></div>
          <div className="linkedin"><a href={`https://www.linkedin.com/in/${c.linkedin}`}>{c.linkedin}</a></div>
        </div>
        <p className="summary" dangerouslySetInnerHTML={{__html: data.summary}} />

        <div className="important-skills">
          <h3>Highlighted Skills</h3>
          <ul>
          {
            data.importantSkills.map((skill, key) => (
              <li key={key} onClick={this._onClick}>{skill}</li>
            ))
          }
          </ul>
        </div>
      </aside>
    )
  }
}

export default Aside;
