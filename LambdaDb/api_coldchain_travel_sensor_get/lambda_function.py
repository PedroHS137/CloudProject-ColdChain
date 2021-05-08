import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
import decimal

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal): return float(obj)
        
        
DYNAMODB_RESOURCE = 'dynamodb'
COLD_CHAIN_TABLE = 'COLD_CHAIN'
ATTR_TRAVEL_ID = 'TravelId'
ATTR_SENSOR_ID = 'SensorId'

PATH_PARAMETERS = "pathParameters"
PARM_TRAVEL_ID = "travel"
PARM_SENSOR_ID = "sensor"

def lambda_handler(event, context):
    
    travel = event[PATH_PARAMETERS][PARM_TRAVEL_ID]
    sensor = event[PATH_PARAMETERS][PARM_SENSOR_ID]

    # Get the service resource.
    dynamodb = boto3.resource(DYNAMODB_RESOURCE)
    cold_chain_table = dynamodb.Table(COLD_CHAIN_TABLE)
    response = cold_chain_table.scan(
        FilterExpression = Attr(ATTR_TRAVEL_ID).eq(travel) & Attr(ATTR_SENSOR_ID).eq(sensor),
        ExpressionAttributeNames =  {"#time": "Timestamp"},
        ProjectionExpression = "#time, Temperature"
    )
    
    return {
        "isBase64Encoded": True,
        "statusCode": 200,
        "headers": { 
            "headerName": "headerValue"
        },
        "body": json.dumps(response['Items'], cls = Encoder)
    }
