import AWS, { type SNS } from 'aws-sdk';

const sns = new AWS.SNS();

const { TEST_TOPIC_ARN, STAGE } = process.env;

export const handler = async () => {
  try {
    const params: SNS.Types.PublishInput = {
      Message: 'Hello World',
      TargetArn: TEST_TOPIC_ARN,
      MessageAttributes: {
        MessageType: {
          DataType: 'String',
          StringValue: 'Test Update'
        },
        Env: {
          DataType: 'String',
          StringValue: STAGE
        },
      }
    };
    const { MessageId } = await sns.publish(params).promise();
    return MessageId;
  } catch (error) {
    const err = <Error>error;
    console.error('🚀 ~ file: handler.ts:16 ~ handler ~ err', err.message);
    throw error;
  }
};
