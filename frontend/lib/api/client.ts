/**
 * Base HTTP Client
 * Handles all API communication
 */

export interface RequestOptions {
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  signal?: AbortSignal;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

export class HttpClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const method = options.method || "GET";

    const fetchOptions: RequestInit = {
      method,
      headers: {
        ...this.headers,
        ...options.headers,
      },
      signal: options.signal,
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const error = await this.parseError(response);
        throw error;
      }

      if (response.status === 204) {
        return undefined as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("UNKNOWN_ERROR", error instanceof Error ? error.message : "Unknown error", 500);
    }
  }

  async get<T>(path: string, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<T>(path: string, body?: any, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  async put<T>(path: string, body?: any, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }

  async patch<T>(path: string, body?: any, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }

  async delete<T>(path: string, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  private async parseError(response: Response): Promise<ApiError> {
    try {
      const data = await response.json();
      return new ApiError(
        data.error?.code || "HTTP_ERROR",
        data.error?.message || response.statusText,
        response.status
      );
    } catch {
      return new ApiError("HTTP_ERROR", response.statusText, response.status);
    }
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  removeHeader(key: string): void {
    delete this.headers[key];
  }
}

// Error class
export class ApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Create global client instance
export const httpClient = new HttpClient();
