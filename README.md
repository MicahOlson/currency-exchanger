# Currency Exchanger

### Convert a value in U.S. dollars to a different global currency.

### _By Micah Olson_

## Technologies Used
* HTML5
* CSS 2.1
* Bootstrap 4.6
* JavaScript (ECMAScript 2017)
* jQuery 3.5.1
* Popper.js 1.16.1
* npm 6.14.10
* webpack 4.39.3
* ESLint 6.3.1
* ExchangeRate-API

## Description
This website will convert U.S. dollars to a different global currency using the ExchangeRate-API. Enter a value in U.S. dollars, select a different, global currency from the list provided and click submit.  

## Setup and Installation
* To use this application, you will need to **supply your own API key** for the ExchangeRate-API.
  * Go to [ExchangeRate-API](https://www.exchangerate-api.com)'s website
  * Input your email address and click "Get Free Key!"
  * Complete the "Create Account" form by adding your first name and a password
  * Read the terms of use and, to proceed further, check that you agree 
  * Click "Create Account & API Key!"
  * You will be redirected to your account dashboard, where you'll find 
    * your unique API key (please keep this private and secure)
    * the status of your monthly quota and usage information

* After acquiring an API key, **clone this repository** to a local directory using the command-line tool `git` ([how to install git](https://www.learnhowtoprogram.com/introduction-to-programming/getting-started-with-intro-to-programming/git-and-github)).  
  `$ cd ~/[directory]/[path]/[of]/[choice]/`  
  `$ git clone https://github.com/MicahOlson/currency-exchanger.git`  

* Navigate to the top level of the project directory.  
  `$ cd currency-exchanger/`   

* *ADD POINTS ABOUT API SIGN-UP, API KEY, CREATING .ENV, ADDING IT TO .GITIGNORE, ETC.*

* *ADD A POINT ABOUT NODE*

* Install all application dependencies using `npm` (node package manager) ([how to install npm](https://www.learnhowtoprogram.com/intermediate-javascript/getting-started-with-javascript/installing-node-js)).  
  `$ npm install`

* Then build a distribution bundle by running the following. This will create the version of `index.html` you will access as discussed below.  
  `$ npm run build`

* To view the site locally, start the preconfigured development server to automatically launch the site in your default browser.  
  `$ npm run start`
  
  * You could also open the file called `index.html` in the project's `dist/` subdirectory to view a static version.  
  `$ cd dist/`  
  `$ open index.html`  

  * Alternatively, you can navigate to these project directories through your system's GUI file manager, then double-click `index.html` to open it in your default browser.  

* To edit the project, open the files in your preferred code editor. Here are some recommendations:
  * [Visual Studio Code](https://code.visualstudio.com) - "Code editing. Redefined."
  * [Atom](https://atom.io) - "A hackable text editor for the 21st Century"
  * [SublimeText](https://www.sublimetext.com) - "A sophisticated text editor for code, markup and prose"  

## Known Bugs
* No known bugs.
* If you find a bug, please report it to me at the email address below.

## License
[GPLv3](https://choosealicense.com/licenses/gpl-3.0/)\
Copyright &copy; 2021 Micah L. Olson

## Contact Information
Micah Olson micah.olson@protonmail.com