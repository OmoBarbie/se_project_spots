# Project 3: Spots

This project, called spots, was to create an interactive social media web application where users can add and remove photos, like photos of other users, and make a few minor adjustments to their profile.

All the elements are to be displayed correctly on popular screen sizes on desktops and mobile devices.
The task was to create an interactive webpage where the user can edit, add images, and like images using the prototpe on Figma. The project visually matches the design on Figma and is displayed correctly for all
screen resolutions, as shown in the design.

# Description

Created folder directory, imported blocks to the index.css page.
Blocks directory with BEM blocks stored in separate CSS files (Flat BEM)
An images directory with all the images
A pages directory with an index.css file stored inside it
A vendor directory with normalize.css , fonts.css files, and a fonts directory
stored inside it
The index.html file
A README.md file
A .prettierignore file, which tells Prettier to ignore normalize.css
A .gitignore file, which tells Git to ignore
Exported images from figma using SVG for buttons and
PNG for the images.

Used flexbox, grid for the containers created in HTML.

- Figma
- Exported all necessary images, created a grid on css, aligned and arranged.

**Figma**

[Link to the project on Figma](https://www.figma.com/file/BBNm2bC3lj8QQMHlnqRsga/Sprint-3-Project-%E2%80%94-Spots?type=design&node-id=2%3A60&mode=design&t=afgNFybdorZO6cQo-1)

Spots was a project that allowed the coder to get very detailed with copying a prototype using Figma.

## Tech Stack -

HTML, CSS, BEM Methodologie, and Responsoive Design were used.
Stylesheets do not use tag selectors to set CSS rules.
No more than two selectors are nested in any CSS rule.
Stylesheets and images are located in separate folders and organized into
blocks. Files are all organized within a Flat BEM file structure.
Blocks are imported into the corresponding page file. CSS rules for elements
and modifiers are declared in the corresponding CSS block file.
Modifiers do not contain duplicate styles of the element or block being
modified. They contain only the changing properties.

Absolute positioning is only used in instances where static or relative
positioning can't be used.
For elements with absolute positioning, top and bottom declarations are not
used simultaneously, and neither are left and right .

Created media queries using responsive dimension 627 by 1227 as my baseline for all of the blocks.
Breakpoints are grouped together. The maximum width is set for the content according to the design

# Deployment

This webpage is deployed to github pages
https://omobarbie.github.io/se_project_spots/

# video Link

https://www.loom.com/share/d1813d9738424e528b3c35703aa35a25?sid=083e6c3c-9529-4d22-897b-47311df3f73b

# Project 4 Spots

# Description

Created a .js file and link it to index.html, then stored it in the scripts folder inside the project.
Created an array and store it in the initialCards variable. The array consisted least six objects, each with two fields: name and link.
Added data from these objects to the cards on the js.index page.
The name of the field contained a string with a place name, and the link field contained a URL to the picture of this place.
Marked up and styled for the "Edit profile" modal for both desktop and mobile. Titled two fields "Name" and "Description", and buttons to submit and close the form.
Used document.querySelector() to select the necessary elements.
Used the addEventListener() method to listen for click events on necessary buttons.
Created feature of filling the form fields when opening the modal, form submission, and rendering cards.
Used the built-in DOM method to add this HTML element to the page.

# Tech Stack

Pass the array item to your getCardElement() function to create a card element.
JavaScript
