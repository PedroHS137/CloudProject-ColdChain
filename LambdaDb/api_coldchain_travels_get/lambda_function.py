import json
import boto3

def get_travels():
    dynamodb = boto3.resource('dynamodb')
    travels_table = dynamodb.Table('TRAVELS')
    scan = travels_table.scan()
    return scan['Items']
    

def lambda_handler(event, context):
    return {
        "isBase64Encoded": True,
        "statusCode": 200,
        "headers": { 
            "endpoint": "/api/coldchain/travels"
        },
        "body": json.dumps(get_travels())
    }
