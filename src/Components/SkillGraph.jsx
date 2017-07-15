import React, {Component} from 'react';

class SkillGraph extends Component {

  _onSkillClick = (event) => {
    this.props.onSkillHighlightToggle(event.currentTarget.dataset.skill);
  }

  render() {
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
            this.props.skills.map(
              (skill, key) => (
                <div key={key} className={`bar bar-${skill.strength * GRAPH_SEGMENTS} ${skill.highlighted && "active"}`} data-skill={skill.name} onClick={this._onSkillClick}>
                  <div className="bar-content">
                    <span>{skill.name}</span>
                    {skill.majorSkills && <br />}
                    {skill.majorSkills && <span className="subSkills">{skill.majorSkills.join(", ")}</span>}
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
}

export default SkillGraph;
