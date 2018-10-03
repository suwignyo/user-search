import React, { Component } from "react";

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDown: false,
      tags: [],
      value: ""
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick = () => {
    this.setState({ dropDown: !this.state.dropDown });
    console.log(this.state.dropDown);
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  onKeyDown(e) {
    if (e.key === "Enter") {
      this.setState({
        value: ""
      });
      this.props.addTag(this.props.data.id, this.state.value);
    }
  }

  componentDidMount() {}
  // {this.state.dropDownVisible ? dropdown : null}
  render() {
    let grades = this.props.data.grades.map((grade, index) => (
      <div>
        Test {index + 1}: {grade}%
      </div>
    ));
    let tags = this.props.data.tags.map((tag, index) => <button>{tag}</button>);
    return (
      <div className="card">
        <div className="avatar-container">
          <div className="avatar">
            <img src={this.props.data.pic} alt="" />
          </div>
        </div>
        <div className="details">
          <div className="name-expand">
            <div className="name">{this.props.data.name.toUpperCase()}</div>

            <i className="fas fa-plus expand" onClick={this.handleClick} />
          </div>
          <div className="email">Email: {this.props.data.email}</div>
          <div className="company">
            Company:
            {this.props.data.company}
          </div>
          <div className="skill">Skill: {this.props.data.skill}</div>
          <div className="avg-grades">Average: {this.props.data.average}</div>
          {this.state.dropDown
            ? [
                grades,
                tags,
                <input
                  type="text"
                  placeholder="Add a tag"
                  onKeyDown={this.onKeyDown}
                  onChange={this.handleChange}
                  value={this.state.value}
                />
              ]
            : null}
        </div>
      </div>
    );
  }
}

export default StudentCard;
