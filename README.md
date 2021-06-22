# :zap: React Kuzzle Data

* App using React to display a simple real-time chat app front end.
* Future: Kuzzle, a backend with ready-to-use features, is used.
* **Note:** to open web links in a new window use: _ctrl+click on link_

![GitHub repo size](https://img.shields.io/github/repo-size/AndrewJBateman/react-kuzzle-data?style=plastic)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AndrewJBateman/react-kuzzle-data?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/AndrewJBateman/react-kuzzle-data?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/AndrewJBateman/react-kuzzle-data?style=plastic)

## :page_facing_up: Table of contents

* [:zap: Ionic React Firebase](#zap-ionic-react-firebase)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:clipboard: Status & To-Do List](#clipboard-status--to-do-list)
  * [:clap: Inspiration](#clap-inspiration)
  * [:file_folder: License](#file_folder-license)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* React frontend

## :camera: Screenshots

![Example screenshot](./img/app.png)

## :signal_strength: Technologies

* [React v17](https://reactjs.org/) JavaScript library
* [Kuzzle-sdk v7](https://www.npmjs.com/package/kuzzle-sdk?activeTab=readme) javascript Software Dev. Kit (SDK) for Kuzzle
* [Kourou](https://github.com/kuzzleio/kourou) CLI to manage the Kuzzle application

## :floppy_disk: Setup

* Frontend: `npm i` to install dependencies then `npm start` to run app on port localhost:3000
* Backend: tba

## :computer: Code Examples

* `App.js` function to connect to Kuzzle backend 

```typescript
connect = async () => {
  await kuzzle.connect();
  if (!(await kuzzle.index.exists('chat'))) {
    await kuzzle.index.create('chat');
    await kuzzle.collection.create('chat', 'messages');
  }
  await this.fetchMessages();
  await this.subscribeMessages();
  this.setState({ connected: true });
};
```

## :cool: Features

* f

## :clipboard: Status & To-Do List

* Status: In work. Frontend working, needs running Kuzzle backend to test
* To-Do: Add backend

## :clap: Inspiration

* [Kuzzle documentation](https://docs.kuzzle.io/core/2/guides/introduction/what-is-kuzzle/)
* [Youtube: Kuzzle: Creating a real-time chat with React and Kuzzle Backend](https://www.youtube.com/watch?v=YzlQ7l4r2Gk)
* [Github Kuzzle repo](https://github.com/kuzzleio/kuzzle)

## :file_folder: License

* N/A

## :envelope: Contact

* Repo created by [ABateman](https://github.com/AndrewJBateman), email: gomezbateman@yahoo.com
