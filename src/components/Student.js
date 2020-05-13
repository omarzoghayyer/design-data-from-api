import React, { Component } from 'react';
class Student extends Component {
  state = {
    expanded: false,
    tag: ''
  };

  getAverage = () => {
    return this.props.student.grades.reduce((acc, grade) => acc += parseInt(grade), 0) / this.props.student.grades.length;
  }

  handleToggle = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  handleTagChange = (event) => {
    this.setState({
      tag: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmitTags(this.state.tag, this.props.id);
    this.setState({
      tag: ''
    })
  }

  render = () => (
    <div>
      <h2 className="name">
        <span className="first">{this.props.student.firstName}</span>
        {' '}
        <span>{this.props.student.lastName}</span>
      </h2>
      <div className="img">
         <img src={this.props.student.pic} />
      </div>
      
 
      <span className="expand-btn" onClick={this.handleToggle}>
        {this.state.expanded &&
          <span>-</span>
        }
        {!this.state.expanded &&
          <span>+</span>
        }
      </span>
        <div className="content">
          <div>Email: {this.props.student.email}</div>
          <div>Company: {this.props.student.company}</div>
          <div>Skill: {this.props.student.skill}</div>
          <div>Average: {this.getAverage()}{'%'}</div>
        </div>
      
      <br />
      <br />
      {this.state.expanded &&
        <div  className="test">
          {this.props.student.grades.map((grade, i) => (
            <div key={i}>
              <span>Test{i + 1}:</span>
              {' '}
              {' '}
              <span>{grade}%</span>
            </div>
          ))}
          <br />
          <div>
            {this.props.student.tags && this.props.student.tags.map((tag, i) => (
              <span key={i}>{tag}{' '}</span>
            ))}
          </div>
          <br />
          
          <form onSubmit={this.handleSubmit}>
            <input id="add-tag-input" type="text" onChange={this.handleTagChange} value={this.state.tag} placeholder="Add a tag" />
          </form>
        </div>
      }
    </div>
  );
};

export default Student;