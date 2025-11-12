import styled from 'styled-components';
import NxWelcome from './nx-welcome';

import React from 'react';

// const GetAllClaimsLazy = React.lazy(() => import("./get-all"));

// const GetDetailLazy = React.lazy(() => import("./get-detail"));



const StyledApp = styled.div`
  // Your style here
`;

// console.log(GetAllClaimsLazy);


export function App() {
  return (
    <>
      <StyledApp>
        <NxWelcome title="characters" />
      </StyledApp>

      <React.Suspense fallback={<p>Loading...</p>}>
        {/* <ul>
          <li>
            <Link to="/getall">Get all Available Claims</Link>
          </li>
          <li>
            <Link to="/get-detail">Get Detail Claims</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/getall" element={<GetAllClaimsLazy />} />
          <Route path='/get-detail' element={<GetDetailLazy />} />
          <Route path='/test' element={<p>Test element</p>}/>
        </Routes> */}

        {/* <BrowserRouter basename="/remote1">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route path="/" element={<h2>Remote Home</h2>} />
            <Route path="/about" element={<h2>Remote About Page</h2>} />
          </Routes>
        </BrowserRouter> */}
      </React.Suspense>
    </>
  );
}

export default App;
