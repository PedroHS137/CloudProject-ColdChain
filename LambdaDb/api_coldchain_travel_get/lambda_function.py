import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
import decimal

DYNAMODB_RESOURCE = 'dynamodb'
COLD_CHAIN_TABLE = 'COLD_CHAIN'
ATTR_TRAVEL_ID = 'TravelId'

PATH_PARAMETERS = "pathParameters"
TRAVEL_ID = "travel"

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal): return float(obj)
        

def transfrom_data(data):
    transformed_data = {}
    for item in data:
        sensor_id = item.pop('SensorId')
        if transformed_data.get(sensor_id):
            transformed_data[sensor_id].append(item)
        else:
            transformed_data[sensor_id] = []
            transformed_data[sensor_id].append(item)
    return transformed_data

def lambda_handler(event, context):
    
    travel = event[PATH_PARAMETERS][TRAVEL_ID]
    
    # Get the service resource.
    dynamodb = boto3.resource(DYNAMODB_RESOURCE)
    cold_chain_table = dynamodb.Table(COLD_CHAIN_TABLE)
    response = cold_chain_table.scan(
        FilterExpression = Attr(ATTR_TRAVEL_ID).eq(travel),
        ExpressionAttributeNames =  {"#time": "Timestamp"},
        ProjectionExpression = "SensorId, #time, Temperature"
    )
    
    return {
        "isBase64Encoded": True,
        "statusCode": 200,
        "headers": { 
            "headerName": "headerValue"
        },
        "body": json.dumps(transfrom_data(response['Items']), cls = Encoder)
    }