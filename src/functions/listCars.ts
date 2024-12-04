import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoClient } from '../lib/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {

  const command = new ScanCommand({
    TableName: 'CarsTable',
  });

  const { Items} = await dynamoClient.send(command);
  return {
    statusCode: 200,  
    body: JSON.stringify({Items}),
  };
};
