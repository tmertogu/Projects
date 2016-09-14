To view a demo: click the link below
https://people.ucsc.edu/~tmertogu/Projects/iFixit/

This application was built starting from Zurb's Foundation-6 framework.  
To keep my edits simple, all of my additions and changes are contained within edits/* or in index.html
All of the files in css/ and js/ are unaltered from Foundation-6 Complete.

Simple Web Application built using:
   Foundation 6
   iFixit's API
   HTML
   CSS
   Javascript
   Jquery
   WebSQL 
 
Here is a short list of features:
   Search iFixit's Device list and add your own devices to personal bag
   User's device list is persistent across browser restarts and page refreshes
   User alerted when internet is cut
   Devices stored locally using WebSQL
   Built on Zurb's Foundation 6, an awesome responsive framework


Here are the original specifications and how I handled each:

   1. Create an interface that is intuitive for the user to find the devices they own and associate those devices with their account (which for this project is just their current browser session). The user should be able to both add and remove devices from their “Grab Bag”.
- The user simply clicks the device they would like to add, or remove.  The user experience is intuitive as hovering over the devices to add, changes the background color to green and hovering over the devices in the bag, changes the background color to red.

   2. Store the list of chosen devices locally and save the state using only client-side methods.
- The devices are stored in a Web SQL server that is stored locally.

   3. The collection should be persisted across page reloads.
- The local database persists across page reloads.

Bonus:
   1. Graceful user-experience degradation when the internet connection is cut and the user tries to perform actions.
- User receives an Alert stating when the internet is cut, and they try to perform an action that requires a network connection.
   
   2. Fullscreen support
- Have not tackled this part yet. 

   3. The collection should be persisted across across browser restarts.
- The local database persists across browser restarts.
