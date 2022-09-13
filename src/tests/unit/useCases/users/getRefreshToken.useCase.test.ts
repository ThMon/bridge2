import getRefreshTokenUseCase from "../../../../app/useCases/users/getRefreshToken.useCase";

describe("Test to get refresh token", () => {
  it("Should return status 200", async () => {
    const response = await getRefreshTokenUseCase("BankinUser", "12345678");
    expect(response.status).toEqual(200);
  });

  it("Should return status 404", async () => {
    const response = await getRefreshTokenUseCase("Bob", "12345678");
    expect(response.status).toEqual(404);
  });
});
