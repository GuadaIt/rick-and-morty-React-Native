# Rick & Morty App 
Built with React Native + Redux + GraphQL and Apollo.
It was only tested on Android. 

To run the project locally you must have an emulator installed and running before continuing.

First clone or download this repository and in the project directory, you can run:

### `npm install`

Installs all the dependencies that the project requires

### `npx react-native start`

Starts Metro, the Javascript bundler. Let it run in its own terminal. 

### `npx react-native run-android`

Runs the app. You should see it in the emulator.<br />

## Screenshots

<p align="center">
  <img alt="Start Screen" src="/screenshots/Screenshot_2020-09-10-02-50-37-508_com.rickandmortyrn.jpg"  width="300"/>
</p>  

<p align="center">
  <img alt="Characters Screen" src="/screenshots/Screenshot_2020-09-10-02-50-59-435_com.rickandmortyrn.jpg" width="250">
  <img alt="Character Details" src="/screenshots/Screenshot_2020-09-10-02-52-00-683_com.rickandmortyrn.jpg" width="250">
</p>

<p align="center">
  <img alt="Episodes Screen" src="/screenshots/Screenshot_2020-09-10-02-51-10-487_com.rickandmortyrn.jpg" width="250">
  <img alt="Episode Details" src="/screenshots/Screenshot_2020-09-10-02-51-48-576_com.rickandmortyrn.jpg" width="250">
</p>

<p align="center">
  <img alt="Locations Screen" src="/screenshots/Screenshot_2020-09-10-02-51-18-128_com.rickandmortyrn.jpg" width="250">
  <img alt="Location Details" src="/screenshots/Screenshot_2020-09-10-02-51-29-670_com.rickandmortyrn.jpg" width="250">
</p>



## Issues

- Fix: 
    - "Two children with the same key" warning
    - Styles on characters screen's cards break when screen is re-focused
- ToDo:
    - Add choice to search by type or name
    - Fire search on input's characters erase
    - Re-render on screen focus
