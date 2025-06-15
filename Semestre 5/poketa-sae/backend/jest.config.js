module.exports = {
    testEnvironment: 'node',
    testMatch: [
        "**/__tests__/**/*.test.js"
    ],
   collectCoverage: true,
    coverageReporters: [
        "html",
        "text",
        "text-summary"
  ],
};