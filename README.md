WCC Catering Management System by Meow Management
Team [Rachel, Rooman, Shehneet, Kelly, Saad]

Getting started:
Open a terminal:
make sure node is installed by entering " node --version ", if not then go: https://nodejs.org/en 

navigate to where you want to store this file so: " cd desktop/test " (make sure test folder already exists) ("c d .. " will take you back a folder)

enter: " git clone https://github.com/shjcc/CMS " (without the quotation marks)

populating the databse with: (assuming cd = CMS)" mysql -u root -p catering_system < database/database.sql "

navigate inside the folder so: " cd CMS/frontend "

now install the dependencies: " npm install " 

now run the frontend by entering: " npm run dev "

once it loads you can click on the link by pressing CONTROL + left lick on the localhost link, any changes made will display on the website as long as it is live

to close the server enter: CONTROL + C


to run the server its the same but after navigating to /backend, run the server with: " node server.js "

to close server, again enter: CONTROL + C
