import azure.functions as func
from azure.functions.decorators.core import DataType
import json
import uuid
import logging
import pyodbc

app = func.FunctionApp()

@app.function_name(name="pythonDogWalkers")
@app.route(route="pythonDogWalkers", auth_level=func.AuthLevel.ANONYMOUS, methods=["GET","POST"])
@app.generic_output_binding(arg_name="dogWalkerInfo", type="sql", CommandText="dbo.dogWalkers", ConnectionStringSetting="Server=tcp:admin-waggly.database.windows.net,1433;Initial Catalog=waggly;Persist Security Info=False;User ID=server-admin-waggly;Password=Wag881!!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;", data_type=DataType.STRING)
def dogWalkersPython(req: func.HttpRequest, dogWalkerInfo: func.Out[func.SqlRow]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.form.get('name')
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
                INSERT INTO dbo.dogWalkers (name, email, town, postcode)
                VALUES (?,?,?,?);
                """
        cursor = conn.cursor()
        cursor.execute(SQL_QUERY, (name, email, town, postcode))
        return func.HttpResponse(f"Hello, {name}. You've been registered successfully!")
    else:
        return func.HttpResponse(
             "An error occured, please try again!",
             status_code=200
        )
    
@app.function_name(name="dogOwners")
@app.route(route="dogOwners", auth_level=func.AuthLevel.ANONYMOUS, methods=["GET","POST"])
@app.generic_output_binding(arg_name="dogOwnersInfo", type="sql", CommandText="dbo.dogOwners", ConnectionStringSetting="Server=tcp:admin-waggly.database.windows.net,1433;Initial Catalog=waggly;Persist Security Info=False;User ID=server-admin-waggly;Password=Wag881!!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;", data_type=DataType.STRING)
def dogOwners(req: func.HttpRequest, dogWOwnersInfo: func.Out[func.SqlRow]) -> func.HttpResponse:
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
                INSERT INTO dbo.dogOwners (name, dogname, email, town, postcode)
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
    
