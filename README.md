# Total Health

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to ... 

## 2. Names of Contributors
List team members and/or short bio's here... 
* My name is Sam Lee and I am 22. I like pie.
* My name is Abhi, I'm a real human with legs and a mouth. I enjoy doing regular human things like breathing and walking on my leg.
* Hi my name is Winson, I am an aspiring student looking to learn and enjoy computer science!

	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Tailwind (Front End Library)
* Firebase 8.0 (BAAS - Backend as a Service)
* DaisyUI
* TW Elements
* Flowbite

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Must initialize tailwind using this command in the terminal: npx tailwindcss -i ./styles/style.css -o ./styles/output.css --watch 
* Must initialize daisyUI using this command in the terminal: npm i -D daisyui@latest
* ...

## 5. Known Bugs and Limitations
Here are some known bugs:
* Some static parts of main UI remains as place holder

## 6. Features for Future
What we'd like to build in the future:
* fully implementing UI for main.html 
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── about_us.html            # short HTML file, about the team
├── completed.html           # HTML file with completed history of workouts
├── contact.html             # HTML file with placeholder contact information
├── diet_recomendation.html  # HTML file with food options for users
├── each_meal.html           # HTML file with detailed redirect for specific food options
├── each_workout.html        # HTML file with detailed redirect for specific workout options
├── inputs.html              # HTML file with input fields to allow user to store physical activities or food intake
├── login.html               # HTML file that allows authorization with firebase
├── main.html                # HTML file that is the main hub with redirects to other HTML files
├── profile.html             # HTML file that allows inputs for the user's personal details
├── saved.html               # HTML file that display's current user's saved workout or food options
├── template.html            # HTML file that is temporary to make other important HTML files faster
├── workouts.html            # HTML file that display the apps workout option's database
└── README.md                # includes information about the project

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /DPBR01.jpg                # Acknowledge source
    /DPDN01.jpg
    /DPLN01.jpg
    /facebook-svgrepo-com.png   # Acknowledgements to svgrepo-com
    /github-svgrepo-com.png     # Acknowledgements to svgrepo-com
    /gym-svgrepo-com.png        # Acknowledgements to svgrepo-com
    /hamburger-2-svgrepo-com.png# Acknowledgements to svgrepo-com
    /instagram-svgrepo-com.png  # Acknowledgements to svgrepo-com
    /TempLogo.png               
    /WOLB01.jpg
    /WOUB01.jpg
    /WOUB02.jpg
    /WOUB03.jpg
    /WOUB03.jpg
    /WOUB04.jpg
├── scripts                  # Folder for scripts
    /authentication.js       # JS file used to authenticate user on login  
    /completed.js            # JS file used to populate the completed.html
    /diet_plans.js           # JS file used to populate food option cards
    /each_meal.js            # JS file used to populate details regarding specific meals
    /each_workout.js         # JS file used to populate details regarding specific workouts
    /firebaseAPI_DTC05.js    # JS file that has keys for firebase database
    /input.js                # JS file used for firebase database updates
    /main.js                 # JS file used for general redirect
    /profile.js              # JS file used for firebase database updates
    /saved.js                # JS file used for displaying firebase database information
    /script.js               # JS file used for general testing 
    /skeleton.js             # JS file used to populate HTML elements reused in multiple HTML files
    /workouts.js             # JS file used to populate workout cards
├── styles                   # Folder for styles
    /output.css              # tailwind Exclusive css file
    /style.css               # components used for dropdown css
├── text                     # Folder for skeleton HTML that is reused throughout the project
    /bottom_nav.html         # HTML file
    /footer_after_login.html # HTML file 
    /footer_before_login.html# HTML file  
    /nav_after_login.html    # HTML file  
    /nav_before_login.html   # HTML file 

