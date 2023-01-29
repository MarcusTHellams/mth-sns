import { type SNSEvent } from 'aws-lambda';

export const handler = ({ Records }: SNSEvent) => {
  Records.forEach((record) => {
    console.log(
      `RECORD: ${record.Sns.Timestamp}-${record.Sns.MessageId}: ${record.Sns.Message}`
    );
  });
};
