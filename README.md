# GPS Recorder Application

This is a React Native application that allows users to record and manage their GPS coordinates. Users can add their current GPS location and delete any coordinates they no longer want. The coordinates are persisted so they are available even after the app is closed and reopened.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have installed [React Native CLI](https://reactnative.dev/docs/environment-setup).
- You have installed [Android Studio](https://developer.android.com/studio) and set up the Android SDK.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Aahladee/Gps_store_recorder.git
    cd Gps_store_recorder
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Running the App on Android

1. Start the Android emulator or connect an Android device.

2. Start the Metro Bundler:
    ```sh
    npm start
    ```

3. In another terminal, build and run the app on Android:
    ```sh
    npm run android
    ```

## Usage

- Open the app on your Android device.
- To add your current GPS location, press the "Add Location" button.
- To delete a coordinate, swipe left on the coordinate you want to delete and press the "Delete" button.

