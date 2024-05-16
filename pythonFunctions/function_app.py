import azure.functions as func
from azure.functions.decorators.core import DataType
import json
import uuid
import logging

app = func.FunctionApp()

@app.route(route="pythonDogWalkers", auth_level=func.AuthLevel.ANONYMOUS, methods=["GET","POST"])
@app.generic_output_binding(arg_name="dogWalkerInfo", type="sql", CommandText="dbo.dogWalkers", ConnectionStringSetting="SqlConnectionString", data_type=DataType.STRING)
def dogWalkersPython(req: func.HttpRequest, dogWalkerInfo: func.Out[func.SqlRow]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.form.get('name')
    email = req.form.get('email')
    town = req.form.get('town')
    postcode = req.form.get('postcode')

    if name:
        try:
            #dogWalkerInfo.set(func.SqlRow({"name": name, "email": email, "town": town, "postcode": postcode}))
            rows = func.SqlRowList({"name": name, "email": email, "town": town, "postcode": postcode})
            dogWalkerInfo.set(rows)
            return func.HttpResponse(f"Hello, {name}. You've been registered successfully!.")
        except Exception as e:
            return func.HttpResponse(f"Hello, {name}. Please try again, your information wasn't passed to our database!")
    else:
        return func.HttpResponse(
             "An error occured, please try again!",
             status_code=200
        )