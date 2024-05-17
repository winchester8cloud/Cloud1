### Wagg.ly Website Setup
## Intro
The code in this repository is for the setup of Wagg.ly - a site connecting dog walkers to dog owners! 
The site can be accessed here: https://black-dune-0f902bc03.5.azurestaticapps.net/

## Components
There are three main components to this repo:
1. The Azure Static Web App
2. Azure Python Function
3. SQL Server

## Static Web App
The index.html file contains the code for the website. It's hosted using Azure Static Web Apps on the site domain above. This contains two forms - one for dog walker registration and one for dog owner registration.

## Azure Function
The functions.py script contains the Azure functions that ingests the form data and injects this into the SQL server. It is a serverless, RESTful API backend.

## SQL database
The SQL database contains two tables - dogWalkers and dogOwners, which can be setup by running the scripts in this repo. It is hosted by Azure and auto-pauses after 1 hour of use. It is a _general purpose _ and _serverless_ tier SQL database. 
