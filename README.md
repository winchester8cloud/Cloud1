### Wagg.ly Website Setup
## Intro
The code in this repository is for the setup of Wagg.ly - a site connecting dog walkers to dog owners! 
The site can be accessed here: https://black-dune-0f902bc03.5.azurestaticapps.net/

## Components
There are three main components to this repo:
1. The Azure Static Web App
2. Azure Python Function
3. SQL Server

## Software
Download **Visual Studio Code** (VS Code) and ensure these extensions are installed:
1. Azure Databases
2. Azure Functions
3. Azure Repos
4. Azure Resources
5. Azure Static Web Apps
6. Data Workspace
7. Github Actions

## Static Web App
The index.html file contains the code for the website. It's hosted using Azure Static Web Apps on the site domain above. This contains two forms - one for dog walker registration and one for dog owner registration. 
**Important setup notes in VS Code:**
1. Ensure the _index.html, beach1_ and _css.assignment_ scipts are top level in your directory.
2. Make a Static Web App using this tutorial: https://learn.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=vanilla-javascript

## Azure Function
The functions.py script contains the Azure functions that ingests the form data and injects this into the SQL server. It is a serverless, RESTful API backend and can be found here: https://github.com/winchester8cloud/Cloud1/blob/main/pythonFunctions/function_app.py.
**Important setup notes in VS Code:**
1. Setup a function app called _newPythonFunctionApp_.
2. Deploy the _functions.py_ script to this app.

## SQL database
The SQL database contains two tables - dogWalkers and dogOwners, which can be setup by running the scripts in this folder: https://github.com/winchester8cloud/Cloud1/tree/main/waggly. It is hosted by Azure and auto-pauses after 1 hour of use. It is a _general purpose_ and _serverless_ tier SQL database. 
**Important setup notes in VS Code:**
1. Setup an SQL sever first in the Azure portal called _admin-waggly_.
2. Under Networking, ensure publis access with selected networks is selected.
3. Add your IP to firewall rules.
4. Ensure _Allow Azure services and resources to access this server_ is ticked.
5. Now setup the database called waggly, and run the setup scripts.
