import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'
import type { z } from 'zod'

export type TSuccess<D = undefined> = {
  type: 'success';
  message?: string;
  data?: D;
  status: number;
};

type TError = {
  type: 'error';
  message?: string;
  status?: number;
};

export type TResponse<D = undefined> = TSuccess<D> | TError;

type MergeConfig = {
  url: AxiosRequestConfig['url'];
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  config?: AxiosRequestConfig;
};

class API {
	private axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({ baseURL: process.env.API_URL })

		this.axiosInstance.interceptors.request.use(
			/* async */ (req) => {
				// const session = await getServerSession(authOptions)

				// const token = session?.token.access_token || ''
				// const tokenType = session?.token.token_type || ''

				// if (token) {
				// 	value.headers.Authorization = `${tokenType} ${token}`
				// }

				req.headers.Authorization =
                'Bearer $2a$10$8uS27VaAO7m3pYxKVUCMGe8Sg8sbkqgcfzIVYX.wyRK/Xan5H.2CW'

				return req
			},
			(error) => {
				return Promise.reject(error)
			}
		)
	}

	private async request<D = undefined>(
		config: AxiosRequestConfig,
		schema: z.Schema<D>
	) {
		try {
			const res = await this.axiosInstance.request<D>(config)

			return this.getResponse<D>(res, schema)
		} catch (err) {
			return this.getError(err)
		}
	}

	private getError(error: unknown): TError {
		const obj: TError = {
			type: 'error',
			message: 'Something went wrong',
		}

		if (error instanceof AxiosError) {
			if (error.response) {
				const detail = error.response.data.detail

				if (typeof detail === 'string') {
					obj.message = detail
				}

				obj.status = error.response.status
			}
		} else if (error instanceof Error) {
			obj.message = error.message
		}

		return obj
	}

	private getResponse<D>(
		res: AxiosResponse<D>,
		schema: z.Schema<D>
	): TSuccess<D> {
		return {
			type: 'success',
			status: res.status,
			data: schema.parse(res.data),
		}
	}

	private mergeConfig({ url, method, data, config }: MergeConfig) {
		return {
			...config,
			url,
			method,
			data,
		}
	}

	public get<D = undefined>(
		url: string,
		schema: z.Schema,
		config?: AxiosRequestConfig
	) {
		const finalConfig = this.mergeConfig({ url, method: 'GET', config })
		return this.request<D>(finalConfig, schema)
	}

	public post<D = undefined>(
		url: string,
		data: unknown,
		schema: z.Schema,
		config?: AxiosRequestConfig
	) {
		const finalConfig = this.mergeConfig({ url, method: 'POST', data, config })
		return this.request<D>(finalConfig, schema)
	}

	public put<D = undefined>(
		url: string,
		data: unknown,
		schema: z.Schema,
		config?: AxiosRequestConfig
	) {
		const finalConfig = this.mergeConfig({ url, method: 'PUT', data, config })
		return this.request<D>(finalConfig, schema)
	}

	public patch<D = undefined>(
		url: string,
		data: unknown,
		schema: z.Schema,
		config?: AxiosRequestConfig
	) {
		const finalConfig = this.mergeConfig({
			url,
			method: 'PATCH',
			data,
			config,
		})
		return this.request<D>(finalConfig, schema)
	}

	public delete<D = undefined>(
		url: string,
		schema: z.Schema,
		config?: AxiosRequestConfig
	) {
		const finalConfig = this.mergeConfig({ url, method: 'DELETE', config })
		return this.request<D>(finalConfig, schema)
	}
}

function createApiInstance() {
	return new API()
}

const api = createApiInstance()

export default api
