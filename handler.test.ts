import { handler } from './handler';
import crypto from 'crypto';

describe('Testing Handler Function', () => {
  describe('Happy Path', () => {
    it('should return a message id', async () => {
      vi.mock('aws-sdk', () => {
        const SNS = vi.fn();
        SNS.prototype.publish = vi.fn(function (this: typeof SNS) {
          return this;
        });
        SNS.prototype.promise = vi
          .fn()
          .mockResolvedValueOnce({ MessageId: 'marcus' });
        return {
          __esModule: true,
          default: { SNS },
        };
      });

      const result = await handler();
      expect(result).toBe('marcus');
    });
  });

  describe('Unhappy Path', () => {
    it('should throw an error ', async () => {
      vi.mock('aws-sdk', () => {
        const SNS = vi.fn();
        SNS.prototype.publish = vi.fn(function (this: typeof SNS) {
          return this;
        });
        SNS.prototype.promise = vi.fn().mockRejectedValueOnce('Ish Went Wrong');
        return {
          __esModule: true,
          default: { SNS },
        };
      });

      try {
        await handler();
      } catch (error) {
        const err = <Error>error;
        expect(err.message).toBe(
          "Cannot destructure property 'MessageId' of '(intermediate value)' as it is undefined."
        );
      }
    });
  });
});
