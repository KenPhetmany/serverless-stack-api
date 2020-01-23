import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userid: event.requestContext.identity.userid,
      noteid: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  console.log(event);
  console.log(params);

  //try {
  await dynamoDbLib.call("put", params);
  return success(params.Item);
  // } catch (e) {
  //   console.log(e);
  //   return failure({ status: false });
  // }
}
