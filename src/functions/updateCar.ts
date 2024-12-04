import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { dynamoClient } from '../lib/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  const body = JSON.parse(event.body || '{}');
  const { carId } = event.pathParameters || {};
  const command = new UpdateCommand({
    TableName: "CarsTable",
    Key: {
      id: carId,
    },
    UpdateExpression: "set #name = :name, #price = :price, #make = :make, #tags = :tags",
    ExpressionAttributeNames: {
      "#name": "name",
      "#price": "price",
      "#make": "make",
      "#tags": "tags",
    },
    ExpressionAttributeValues: {
      ":name": body.name,
      ":price": body.price,
      ":make": body.make,
      ":tags": body.tags,
    },
    ConditionExpression: "attribute_exists(id)",
  })

  try {
    await dynamoClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Car updated successfully",
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
