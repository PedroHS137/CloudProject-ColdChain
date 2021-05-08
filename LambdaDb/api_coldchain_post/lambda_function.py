import json
import boto3
import uuid
from decimal import Decimal
import datetime

DYNAMODB_RESOURCE = 'dynamodb'
COLD_CHAIN_TABLE = 'COLD_CHAIN'
TRAVELS_TABLE = 'TRAVELS'
UNIQUE_ID = 'UniqueId'
TRAVEL_ID = 'TravelId'
SENSOR_ID = 'SensorId'
TEMPERATURE = 'Temperature'
TIMESTAMP = 'Timestamp'

def register_travel(travel_id, dynamodb):
    travels_table = dynamodb.Table(TRAVELS_TABLE)
    response = travels_table.get_item(
        Key = {
            'TravelId': travel_id
        }
    )
    if 'Item' not in response:
        travels_table.put_item(
            Item = {
                'TravelId': travel_id
            }
        )


def decode(temp):
    dec_temp = int(('0x' + temp), 16)
    if dec_temp & 0x1F == 0:
        float_temp = float((dec_temp >> 5)) * 0.125
    else:
        float_temp = float('nan')
    
    return str(float_temp)
     
  
def lambda_handler(event, context):
    
    dynamodb = boto3.resource(DYNAMODB_RESOURCE)
    cold_chain_table = dynamodb.Table(COLD_CHAIN_TABLE)
    data = json.loads(event["body"])
    
    if len(data) > 0:
        register_travel("0x" + data[0]['V'], dynamodb)
    
        with cold_chain_table.batch_writer() as batch:
            for read in data:
                print(read)
                batch.put_item(
                    Item = {
                        UNIQUE_ID: str(uuid.uuid1()),
                        TRAVEL_ID: "0x" + read['V'],
                        SENSOR_ID: "0x" + read['S'],
                        TEMPERATURE: Decimal(decode(read['C'])),
                        TIMESTAMP: datetime.datetime.utcfromtimestamp(int(('0x' + read['T']), 16)).strftime('%Y-%m-%d %H:%M:%S')
                    }
                )

    return {
        "isBase64Encoded": True,
        "statusCode": 200,
        "headers": { 
            "Endpoint": "POST api/coldchain"
        },
        "body": "Success"
    }
