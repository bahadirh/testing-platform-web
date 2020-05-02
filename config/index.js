require('dotenv').config()

const requiredParams = []

requiredParams.forEach(param => {
  if (!process.env[param]) {
    throw new Error(`Required param ${param} is missing.`)
  }
})
