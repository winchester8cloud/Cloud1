import azure.functions as func
from azure.functions.decorators.core import DataType
import json
import uuid
import logging
import pyodbc

app = func.FunctionApp()

@app.route(route="dogOwners", auth_level=func.AuthLevel.FUNCTION)
def dogOwners(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.form.get('name')
    dogname = req.form.get('dogname')
    email = req.form.get('email')
    town = req.form.get('town')
    postcode = req.form.get('postcode')

    if name:
        SERVER = 'admin-waggly.database.windows.net'
        DATABASE = 'waggly'
        USERNAME = 'server-admin-waggly'
        PASSWORD = 'Wag881!!'
        connectionString = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={SERVER};DATABASE={DATABASE};UID={USERNAME};PWD={PASSWORD}'
        conn = pyodbc.connect(connectionString)
        SQL_QUERY = """
                INSERT INTO dbo.dogWalkers (name, dogname, email, town, postcode)
                VALUES (?,?,?,?,?);
                """
        cursor = conn.cursor()
        cursor.execute(SQL_QUERY, (name, email, town, postcode))
        return func.HttpResponse(f"Hello, {name} and {dogname}. You've been registered successfully!")
    else:
        return func.HttpResponse(
             "An error occured, please try again!",
             status_code=200
        )