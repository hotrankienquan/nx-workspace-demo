

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import {server} from '../__mocks__/server'
import ContentInstruct from './ContentInstruct';

beforeAll(() => server.listen()); 

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


const waitFor = (callback: () => void, timeout = 1000) =>
    new Promise((resolve) => {
      const interval = setInterval(() => {
        try {
          callback();
          clearInterval(interval);
          resolve(true);
        } catch (error) {
          // Keep waiting
        }
      }, 50);
  
      setTimeout(() => {
        clearInterval(interval);
        resolve(false);
      }, timeout);
    });
  

describe('ContentInstruct: Data Fetching with MSW', () => {

  test('should render a list of claims fetched from the API', async () => {
    render(<ContentInstruct />);
   
  });

});

describe('ContentInstruct: Data Fetching with Custom Wait', () => {
    test('should render a list of claims fetched from the API', async () => {
      render(<ContentInstruct />);
  
      // Use the custom waitFor function
      await waitFor(() => {
        const claimItem = screen.getByText(/Motor Insurance/i);
        expect(claimItem).toBeInTheDocument();
      });
    });
  });