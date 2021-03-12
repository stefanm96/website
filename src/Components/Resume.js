import React, { Component } from 'react';

class Resume extends Component {
  render() {

    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;

      var work = this.props.data.work.map(function (work) {
        return <div key={work.company}><h3>{work.company}</h3>
          <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
          <p>{work.description}</p>
        </div>
      })
      var projects = this.props.data.projects.map(function (project) {
        return <div key={project.customer} className="projectEntry"><h3>{project.customer}</h3>
          <p className="info">{project.title}<span>&bull;</span> <em className="date">{project.duration}</em></p>
          <h6>Inhalte:</h6>
          {project.description.split('\n').map(string => <p className="description">{string}</p>)}

          <h6 className="tech">Technologien:</h6>
          <p>{project.tech}</p>
        </div>
      })
      var education = this.props.data.education.map(function (education) {
        return <div key={education.school}><h3>{education.school}</h3>
          <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
          {education.description && <p>{education.description}</p>}
          {education.image &&
            <a href={education.imageUrl}>
              <img src={education.image} width="300" height="140" />
            </a>
          }
        </div>
      })
      var skills = this.props.data.skills.map(function (skills) {
        var className = 'bar-expand ' + skills.name.toLowerCase();
        return <li key={skills.name}><span style={{ width: skills.level }} className={className}></span><em>{skills.name}</em></li>
      })
    }

    return (
      <section id="resume">

        <div className="row work">

          <div className="three columns header-col">
            <h1><span>Karriere</span></h1>
          </div>

          <div className="nine columns main-col">
            {work}
          </div>
        </div>

        <div className="row work">

          <div className="three columns header-col">
            <h1><span>Projekte</span></h1>
          </div>

          <div className="nine columns main-col">
            {projects}
          </div>
        </div>

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Bildung</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                {education}
              </div>
            </div>
          </div>
        </div>

        <div className="row skill">

          <div className="three columns header-col">
            <h1><span>Kompetenzen</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="bars">
              <ul className="skills">
                {skills}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
