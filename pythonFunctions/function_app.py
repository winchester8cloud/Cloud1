import azure.functions as func
from azure.functions.decorators.core import DataType
import json
import uuid
import logging

app = func.FunctionApp()

@app.route(route="pythonDogWalkers", auth_level=func.AuthLevel.ANONYMOUS, methods=["POST"])
@app.generic_output_binding(arg_name="dogWalkerInfo", type="sql", CommandText="dbo.dogWalkers", ConnectionStringSetting="SqlConnectionString", data_type=DataType.STRING)
def dogWalkersPython(req: func.HttpRequest, dogWalkerInfo: func.Out[func.SqlRow]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    email = req.params.get('email')
    town = req.params.get('town')
    postcode = req.params.get('postcode')
    if not name:
        try:
            req_body = req.get_json()
            name = req_body.get('name')
        except ValueError:
            pass

    #dogWalkerInfo.set(func.SqlRow({"name": name, "email": email, "town": town, "postcode": postcode}))
    if name:
        dogWalkerInfo.set(func.SqlRow({"name": name, "email": email, "town": town, "postcode": postcode}))
        return func.HttpResponse(f"Hello, {name}. You've been registered successfully!.")
    else:
        return func.HttpResponse(
             "An error occured, please try again!",
             status_code=200
        )