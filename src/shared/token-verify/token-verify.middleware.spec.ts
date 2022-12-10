import { TokenVerifyMiddleware } from './token-verify.middleware';

describe('TokenVerifyMiddleware', () => {
  it('should be defined', () => {
    expect(new TokenVerifyMiddleware()).toBeDefined();
  });
});
