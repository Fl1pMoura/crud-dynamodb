import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoClient } from '../lib/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  const { carId } = event.pathParameters || {};
  const command = new DeleteCommand({
    TableName: "CarsTable",
    Key: {
      id: carId,
    },
    ConditionExpression: "attribute_exists(id)",
  });

  try {
    await dynamoClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Car deleted successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Car not found",
      }),
    };
  }
};
