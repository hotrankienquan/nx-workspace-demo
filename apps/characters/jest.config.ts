import type { Config } from 'jest';

export default {
  displayName: 'characters',
  preset: '../../jest.preset.js',
  // transform: {
  //   '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  //   '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  // },
  transform: {
    // Thay thế babel-jest bằng ts-jest
    '^.+\\.[tj]sx?$': [
      'ts-jest', 
      { 
        // Cấu hình ts-jest, ví dụ trỏ đến tsconfig.spec.json
        tsconfig: './tsconfig.spec.json', 
      }
    ],
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: 'test-output/jest/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    "!src/app/*.{js,ts,jsx,tsx}",
    "!src/app/app/*.{js,ts,jsx,tsx}",
    "!src/*.{ts,tsx}"
  ]
} satisfies Config;
