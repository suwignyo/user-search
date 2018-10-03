import React, { Component } from "react";
import "./App.css";

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

  //Handles the expand button
  handleClick = () => {
    this.setState({ dropDown: !this.state.dropDown });
  };

  //Handles the input tag
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  //Handler for when input gets submitted
  onKeyDown(e) {
    if (e.key === "Enter" && e.target.value !== "") {
      this.setState({
        value: ""
      });
      this.props.addTag(this.props.data.id, this.state.value);
    }
  }

  componentDidMount() {}
  render() {
    let grades = this.props.data.grades.map((grade, index) => (
      <div className="detail grade">
        Test {index + 1} : {grade}%
      </div>
    ));
    let tags = this.props.data.tags.map((tag, index) => (
      <button className="tag">{tag}</button>
    ));
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
          <div className="detail email">Email: {this.props.data.email}</div>
          <div className="detail company">
            Company:
            {this.props.data.company}
          </div>
          <div className="detail skill">Skill: {this.props.data.skill}</div>
          <div className="detail avg-grades">
            Average: {this.props.data.average}%
          </div>
          {this.state.dropDown
            ? [
                <div className="grades-container">{grades}</div>,
                <div className="tag-container">{tags}</div>,
                <input
                  className="tag-input"
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
