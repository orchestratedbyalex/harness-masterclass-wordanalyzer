# Word Analyzer showcase

## User Story

As a User I want to be able to input text in a program, that calculates highest frequency, most popular words, and frequency of a specific word of my text, so that I do not need to count them manually.

## Use Case

Primary Actor: User

Pre-conditions: 
User loaded the word processor SPA
Text field displays a placeholder description of where to type

Post-conditions: 
User can see the highest frequency of his text, as well as a list of the most “n” frequent words 
User can type a word (FRECUENCY CALCULATOR) to find its frequency


## Normal Flow:
After the page loads, the user will be presented with an input text to introduce a desired text of words, as well as an “analyze” button, this button is disabled while text is empty.
As user types the text, the program detects words being typed, the analyse button will be enabled, under the textfield it will display the amount of words the user types.
As the user hits Analyze, the program will display the text and three widgets:
  - Top N words widget, which will allow the user to read the most frequent “n” words, the user is able to change the “N” number via a textfield/stepper, the frequent words can be selected in order to be displayed highlighted in the text.
  - Highest frequency words widget: this will display the overall most frequently used words in the text, the frequent words can be selected in order to be displayed highlighted in the text.
  - Frequency Calculator widget: this widget will offer the capability to type a word and display its frequency in the text, when the word is found in the text, as a bonus user experience, the program will collect a photograph from the internet of the word filled in the widget.

Extensions:
1A. After displaying the results, a new button appears “Start again”
As the user clicks this button, it will clear the text field for a new operation.


## Available Scripts

Install dependencies with [pnpm](https://pnpm.io) (`pnpm install`), then in the project directory you can run:

### `pnpm start`

Runs the app in the development mode.\
Open [http://localhost:3000/wordanalyzer](http://localhost:3000/wordanalyzer) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

