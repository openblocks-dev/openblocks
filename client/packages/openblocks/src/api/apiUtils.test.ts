import {
  apiFailureResponseInterceptor,
  apiRequestInterceptor,
  apiSuccessResponseInterceptor,
  axiosConnectionAbortedCode,
  AxiosResponseWithTimer,
  doValidResponse,
  validateResponse,
} from "./apiUtils";
import { AxiosResponse } from "axios";
import { ApiResponse } from "./apiResponses";
import {
  createMessage,
  ERROR_0,
  ERROR_401,
  ERROR_500,
  SERVER_API_TIMEOUT_ERROR,
} from "../constants/messages";
import log from "loglevel";
import { API_STATUS_CODES, ERROR_CODES } from "../constants/apiConstants";

beforeAll(() => {
  jest.spyOn(log, "error").mockImplementation(() => {});
});

test("apiRequestInterceptor", () => {
  expect(apiRequestInterceptor({})).toHaveProperty("timer");
});

test("apiSuccessResponseInterceptor", () => {
  expect(apiSuccessResponseInterceptor(undefined as unknown as AxiosResponseWithTimer)).toEqual(
    undefined
  );
  expect(apiSuccessResponseInterceptor({} as AxiosResponseWithTimer)).not.toHaveProperty(
    "data.runTime"
  );
  expect(
    apiSuccessResponseInterceptor({ config: { url: "test" } } as AxiosResponseWithTimer)
  ).not.toHaveProperty("data.runTime");
  expect(
    apiSuccessResponseInterceptor({ config: { url: "/query/execute" } } as AxiosResponseWithTimer)
  ).not.toHaveProperty("data.runTime");
  expect(
    apiSuccessResponseInterceptor({
      config: { url: "/query/execute", timer: 1 },
    } as AxiosResponseWithTimer)
  ).toHaveProperty("data.runTime");
  expect(
    apiSuccessResponseInterceptor({
      config: { url: "/query/execute", timer: 1 },
      data: { success: true },
    } as AxiosResponseWithTimer)
  ).toHaveProperty("data.success", true);
});

test("apiFailureResponseInterceptor", () => {
  expect(apiFailureResponseInterceptor(undefined)).rejects.toEqual(undefined);
  expect(apiFailureResponseInterceptor({})).resolves.toEqual({});
  expect(
    apiFailureResponseInterceptor({
      code: axiosConnectionAbortedCode,
      message: "timeout of 1ms exceeded",
    })
  ).rejects.toMatchObject({
    message: createMessage(SERVER_API_TIMEOUT_ERROR),
    code: ERROR_CODES.REQUEST_TIMEOUT,
  });
  expect(
    apiFailureResponseInterceptor({
      isAxiosError: true,
      response: {
        status: API_STATUS_CODES.SERVER_ERROR,
        timer: 1,
      },
    })
  ).resolves.toMatchObject({
    isAxiosError: true,
    response: {
      status: API_STATUS_CODES.SERVER_ERROR,
      timer: 1,
    },
  });
  expect(
    apiFailureResponseInterceptor({
      isAxiosError: true,
      config: { timer: 1 },
      response: {
        status: API_STATUS_CODES.SERVER_ERROR,
        timer: 1,
      },
    })
  ).rejects.toMatchObject({
    code: ERROR_CODES.SERVER_ERROR,
    message: createMessage(ERROR_500),
  });
  expect(
    apiFailureResponseInterceptor({
      isAxiosError: true,
      config: { timer: 1, url: "/query/execute" },
    })
  ).toMatchObject({});
  expect(
    apiFailureResponseInterceptor({
      isAxiosError: true,
      config: { timer: 1, url: "/query/execute" },
      response: { config: { timer: 1, url: "/query/execute" } },
    })
  ).toHaveProperty("data.runTime");
});

test("validateResponse", () => {
  expect(() => validateResponse(undefined as unknown as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_0))
  );
  expect(() => validateResponse({} as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_0))
  );
  expect(() => validateResponse({ status: 9999 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error("")
  );
  expect(() => validateResponse({ status: 0 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_0))
  );
  expect(() => validateResponse({ status: 401 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_401))
  );
  expect(() => validateResponse({ status: 500 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_500))
  );
  expect(() =>
    validateResponse({
      status: 500,
      data: { success: false, code: 1, message: "fail", data: "" },
      statusText: "",
      headers: [],
      config: {},
    })
  ).toThrowError(Error("fail"));
  expect(
    validateResponse({
      status: 500,
      data: { success: true, code: 1, message: "", data: "" },
      statusText: "",
      headers: [],
      config: {},
    })
  ).toEqual(true);
});

test("doValidResponse", () => {
  expect(() => doValidResponse(undefined as unknown as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_0))
  );
  expect(() => validateResponse({} as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_0))
  );
  expect(() => doValidResponse({ status: 9999 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error("")
  );
  expect(() => doValidResponse({ status: 0 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_0))
  );
  expect(() => doValidResponse({ status: 401 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_401))
  );
  expect(() => doValidResponse({ status: 500 } as AxiosResponse<ApiResponse>)).toThrowError(
    Error(createMessage(ERROR_500))
  );
  expect(
    doValidResponse({
      status: 500,
      data: { success: false, code: 1, message: "fail", data: "" },
      statusText: "",
      headers: [],
      config: {},
    })
  ).toEqual(false);
  expect(
    doValidResponse({
      status: 500,
      data: { success: true, code: 1, message: "", data: "" },
      statusText: "",
      headers: [],
      config: {},
    })
  ).toEqual(true);
});
