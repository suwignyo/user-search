import React, { Component } from "react";
import "./App.css";
import StudentCard from "./StudentCard";
import SearchInput, { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["name"];
const TAG_FILTERS = ["tags"];
class App extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      searchNameTerm: "",
      searchTagTerm: ""
    };
    this.searchNameUpdated = this.searchNameUpdated.bind(this);
    this.searchTagUpdated = this.searchTagUpdated.bind(this);
  }

  searchNameUpdated(term) {
    this.setState({ searchNameTerm: term });
  }
  searchTagUpdated(term) {
    this.setState({ searchTagTerm: term });
  }

  addTag = (id, tag) => {
    this.state.students.forEach(element => {
      if (element.id === id) {
        element.tags.push(tag);
      }
    });
  };

  componentDidMount() {
    fetch("https://www.hatchways.io/api/assessment/students")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let students = data.students.map(student => {
          let avgGrades =
            student.grades.reduce(function(acc, curr) {
              return parseInt(acc) + parseInt(curr);
            }, 0) / student.grades.length;
          const user = {
            name: student.firstName + " " + student.lastName,
            email: student.email,
            company: student.company,
            pic: student.pic,
            skill: student.skill,
            grades: student.grades,
            average: avgGrades,
            tags: [],
            id: student.id
          };
          return user;
        });
        this.setState({ students: students });
        // console.log(JSON.stringify(this.state.students));
      });
  }

  render() {
    const filteredStudents = this.state.students.filter(
      createFilter(this.state.searchNameTerm, KEYS_TO_FILTERS)
    );
    const filteredTags = filteredStudents.filter(
      createFilter(this.state.searchTagTerm, TAG_FILTERS)
    );
    return (
      <div className="container">
        <div className="search-input-container">
          <SearchInput
            className="search-input"
            onChange={this.searchNameUpdated}
            placeholder="Search by name"
          />
          <SearchInput
            className="search-input"
            onChange={this.searchTagUpdated}
            placeholder="Search by tag"
          />
        </div>
        <div className="card-container">
          {filteredTags.map((elem, i) => (
            <StudentCard key={i} data={elem} addTag={this.addTag} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

// const grades = () => {
//   this.state.students.map(student => {
//     {student.grades.map((grade, index) => (
//       <div>
//         Test {index + 1}: {grade}
//       </div>
//     ))}
//   })
// };
