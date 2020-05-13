import React from 'react';
import Students from "./components/Students";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.studentsURL = 'https://www.hatchways.io/api/assessment/students';
    this.state = {
      isLoading: false,
      students: [],
      search: '',
      tags: '',
      filterByName: false,
      filterByTag: false
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });
    const response = await fetch(this.studentsURL);
    const data = await response.json();
    this.setState({
      students: data.students,
      isLoading: false
    });
  }

  handleChangeName = (event) => {
    this.setState({
      search: event.target.value,
      filterByName: !!event.target.value ? true : false
    });
  }

  filterStudentsByName = () => {
    if (!this.state.search) {
      return this.state.students;
    }
    const filterStudents = this.state.students.filter((student) => {
      const fullName = student.firstName + ' ' + student.lastName;
      return fullName.indexOf(this.state.search) !== -1;
    });

    return filterStudents;
  }

  filterStudentsByTag = () => {
    if (!this.state.tags) {
      return this.state.students;
    }
    const filterStudents = this.state.students.filter((student) => {
      return (student.tags || []).some((tag) => tag.indexOf(this.state.tags) !== -1);
    });

    return filterStudents;
  }

  handleChangeTags = (event) => {
    this.setState({
      tags: event.target.value,
      filterByTag: !!event.target.value ? true : false
    });
  }


  handleSubmitTags = (tag, id) => {
    this.setState({
      students: this.state.students.map((student, i) => {
        if (i === parseInt(id)) {
          student = {
            ...student,
            tags: [
              ...(student.tags || []),
              tag
            ]
          }
        }
        return student;
      })
    });
  }

  handleFilter = () => {
    if (!this.state.filterByTag && !this.state.filterByName) {
      return this.state.students;
    }

    if (this.state.filterByTag && this.state.filterByName) {
      return this.state.students;
    }

    if (this.state.filterByName) {
      return this.filterStudentsByName();
    }
    if (this.state.filterByTag) {
      return this.filterStudentsByTag();
    }
    return this.state.students;
  }

  render = () => (
    <div className="App">
      <div>
        <input id="name-input" type="text" value={this.state.search} onChange={this.handleChangeName} placeholder="Search by name" /><br />
        <input id="tag-input" type="text" value={this.state.tags} onChange={this.handleChangeTags} placeholder="Search by tags" />
      </div>
      <div className="students-section">
        {this.state.isLoading && <div>Loading...</div>}
        {!this.state.isLoading &&
          <Students students={this.handleFilter()} handleSubmitTags={this.handleSubmitTags} />
        }
      </div>
    </div>
  );
  
}

export default App;
