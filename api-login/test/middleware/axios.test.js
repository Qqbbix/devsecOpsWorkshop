const axiosMiddleware = require('../../src/middleware/axios')

describe('axios interceptors middleware', () => {
  
  describe('request middleware', () => {

    it('middleware request should return config with metadata.startTime', () => {
      const request = {
        url: "https://localhost"
      }

      const actualConfig = axiosMiddleware.request(request)

      expect(actualConfig.metadata).toBeDefined()
      expect(actualConfig.metadata.startTime).toBeDefined()
    })

    it('middleware request reject should return', async () => {
      const config = {
        url: "https://localhost"
      }

      await axiosMiddleware.requestReject(config).catch(error => {
        expect(error).toEqual(config)
      })
    })

  })

  describe('response interceptors', () => {
    it('resolve should return response with response duration', () => {
      const response = {
        config: {
          url: "https://localhost",
          metadata: {
            startTime: new Date()
          },
        }
      }

      const res = axiosMiddleware.response(response)

      expect(res).toBeDefined()
      expect(res.config.metadata.endTime).toBeDefined()
      expect(res.responseTime).toBeDefined()
      expect(res.responseTime).toBeGreaterThanOrEqual(0)
    })

    it('reject should return error with response duration', async () => {
      const response = {
        response: {
          status: 404,
        },
        config: {
          url: "https://localhost",
          metadata: {
            startTime: new Date()
          },
        }
      }

      await axiosMiddleware.responseReject(response).catch((error) => {
        expect(error).toBeDefined()
        expect(error.config.metadata.endTime).toBeDefined()
        expect(error.responseTime).toBeDefined()
        expect(error.responseTime).toBeGreaterThanOrEqual(0)
      })
    })
  })
})
