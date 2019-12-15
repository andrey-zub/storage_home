import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function UserAvatar(props) {
  return <img src={props.src} width={props.width} height={props.height} />;
}

function UserCard(props) {
  const avatar_width = "150";
  const avatar_height = "150";
  return (
    <div class="card">
      <UserAvatar
        src={props.user.picture.large}
        width={avatar_width}
        height={avatar_height}
      />
      <div className="userprop_wrap">first name: {props.user.name.first}</div>
      <div className="userprop_wrap">last name: {props.user.name.last}</div>
      <div className="userprop_wrap">sex: {props.user.gender}</div>
      <div className="userprop_wrap">town: {props.user.location.city}</div>
      <div className="userprop_wrap">number: {props.user.phone}</div>
    </div>
  );
}

function UserList(props) {
  return (
    <div>
      {props.users.map(user => (
        <UserCard user={user} />
      ))}
    </div>
  );
}

function Preloader(props) {
  const preloader_width = "60";
  const preloader_src =
    "https://upload.wikimedia.org/wikipedia/commons/2/28/InternetSlowdown_Day.gif";
  return (
    <div class="preloader_wrap">
      <img src={preloader_src} width={preloader_width} />
    </div>
  );
}

function Button(props) {
  return (
    <div class="button_wrap">
      <button onClick={props.onClick}>{props.label}</button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Generate",
      pushed: false
    };

    this.state.users = [];
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    this.setState({ pushed: true });
    let url = "https://randomuser.me/api/?results=10";
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          users: jsonData.results,
          pushed: false
        });
      })
      .catch(error => {
        this.setState({ pushed: false });
        alert("HTTP error: " + error);
      });
  }

  render() {
    const pushed = this.state.pushed;
    return (
      <div>
        <Button label={this.state.label} onClick={this.getUsers} />
        {pushed && <Preloader />}
        <UserList users={this.state.users} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
