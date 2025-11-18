import { fetcher, fetchPostSaveStage } from "./fetcher";
import { BASE_URL_APP } from "../../../globals/constants";

describe("fetcher", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("returns JSON when response is ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ foo: "bar" }),
    });

    const data = await fetcher<{ foo: string }>("/test-url");
    expect(data).toEqual({ foo: "bar" });
    expect(global.fetch).toHaveBeenCalledWith("/test-url");
  });

  it("throws error when response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(fetcher("/bad-url")).rejects.toThrow("Failed to fetch: /bad-url");
  });
});

describe("fetchPostSaveStage", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("posts data and returns JSON when ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const claimId = "123";
    const stageId = "456";
    const payload = { foo: "bar" };

    const result = await fetchPostSaveStage(claimId, stageId, payload);

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL_APP}/claims/stage/save/${claimId}/${stageId}}`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    );
    expect(result).toEqual({ success: true });
  });

  it("throws error when response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(fetchPostSaveStage("1", "2", {})).rejects.toThrow(
      `Failed to post data to: ${BASE_URL_APP}/claims/stage/save/1/2}`
    );
  });
});
