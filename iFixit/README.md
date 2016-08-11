This application was built starting from Zurb's Foundation-6 framework.  
To keep my edits simple, all of my additions and changes are contained within edits/* or in index.html
All of the files in css/ and js/ are unaltered from Foundation-6 Complete.

Simple Web Application using the iFixit API

Specifications:
   1. Create an interface that is intuitive for the user to find the devices they own and associate those devices with their account (which for this project is just their current browser session). The user should be able to both add and remove devices from their “Grab Bag”.
   2. Store the list of chosen devices locally and save the state using only client-side methods.
   3. The collection should be persisted across page reloads.

Bonus:
   1. Graceful user-experience degradation when the internet connection is cut and the user tries to perform actions.
   2. Fullscreen support
   3. The collection should be persisted across across browser restarts.