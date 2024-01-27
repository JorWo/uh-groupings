module.exports = {
    rootDir: './',
    clearMocks: true,
    collectCoverageFrom: [
        './**/*.ts*',
    ],
    coveragePathIgnorePatterns: [
        '/app/.next/'
    ],
    coverageReporters: ['json-summary', 'text', 'html'],
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: []
    },
    transform: {
        '^.+\\.tsx?$': [
            '@swc/jest', 
            { jsc: { transform: { react: { runtime: 'automatic' } } } },
            { tsconfig: { jsx: 'react-jsx' } },
        ],
    },
    setupFilesAfterEnv: [
        '<rootDir>/tests/setupJest.tsx'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
};
