import { GetCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoClient } from '../lib/dynamoClient';


export async function handler(event: APIGatewayProxyEventV2) {
  const { carId } = event.pathParameters || {};
  const command = new GetCommand({
    TableName: 'CarsTable',
    Key: {
      id: carId
    },
  });
  
  const {Item} = await dynamoClient.send(command);

  if(!Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Car not found',
      }),
    };
  }

  return {
    statusCode: 200,  
    body: JSON.stringify({car: Item,})
  };
};
