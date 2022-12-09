import { TokenVerifyGuard } from './token-verify.guard';

describe('TokenVerifyGuard', () => {
  it('should be defined', () => {
    expect(new TokenVerifyGuard()).toBeDefined();
  });
});
