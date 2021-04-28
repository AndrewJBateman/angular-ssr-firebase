import React from "react";
import kuzzle from "./services/kuzzle";
import "./App.css";

const Message = function ({ message, username }) {
  return (
    <div
      className={
        (message.username === username ? "fromMe" : "fromOthers") + "messages"
      }
    >
      <span>
        <b>{message.username}</b>
      </span>
      <span>({new Date(message._kuzzle_info.createdAt).toLocaleString})</span>
      <p>{message.value}</p>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: "",
      messages: [],
      connected: false,
    };
  }

  connect = async () => {
    await kuzzle.connect();
    if (!(await kuzzle.index.exists("chat"))) {
      await kuzzle.index.create("chat");
      await kuzzle.collection.create("chat", "messages");
    }
    await this.fetchMessages();
    await this.subscribeMessages();
    this.setState({ connected: true });
  };

  fetchMessages = async () => {
    const results = await kuzzle.document.search("chat", "messages", {
      sort: {
        "_kuzzle_info.createdAt": "desc",
      },
    });
    this.setState({ messages: results.hits });
  };

  subscribeMessages = () => {
    return kuzzle.realtime.subscribe("chat", "messages", {}, (notification) => {
      this.setState({
        messages: [notification.result, ...this.state.messages],
      });
    });
  };

  sendMessage = async () => {
    if (this.state.message === "") return;
    await kuzzle.document.create("chat", "messages", {
      value: this.state.message,
      username: this.state.username,
    });
    this.setState({
      message: "",
    });
  };

  renderConnectionForm = () => {
    return (
      <div>
        <input
          type="text"
          name="username"
          placeholder="Enter your name"
          onChange={this.handleInputChange}
        />
        <button onClick={() => this.connect()}>Connect</button>
      </div>
    );
  };

  renderMessageForm = () => {
    return (
      <div>
        <input
          type="text"
          name="message"
          placeholder="Enter your message"
          onChange={this.handleInputChange}
          value={this.state.message}
        />
        <button onClick={() => this.sendMessage()}>Send</button>
      </div>
    );
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        {this.state.connected
          ? this.renderMessageForm()
          : this.renderConnectionForm()}
        <div>
          {this.state.messages.map((message) => {
            return (
              <Message
                key={message._id}
                message={message._source}
                username={this.state.username}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
