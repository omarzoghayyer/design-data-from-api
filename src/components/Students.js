import React from 'react';
import Student from './Student';

class Students extends React.Component {
  render() {
    return (
      <div>
        {
          <div>
            {this.props.students.map((student, i) => (
              <Student key={i} student={student} handleSubmitTags={this.props.handleSubmitTags} id={i} />
            ))}
          </div>
        }
      </div>
    )
  }
}

  export default Students;




