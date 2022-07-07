import React, {useState} from 'react';

import Map from './components/map/map';
import Nav from './components/nav/nav';

import * as NavTargets from './components/nav/nav-targets';

function App() {
  const [viewState, setViewState] = useState(NavTargets.NYC3D);
  const onNavChange = origin => setViewState(prev => ({
      ...prev,
      ...origin,
      //transitionDuration: 2000
  }));   
  return (
    <>
      <Map viewState={viewState} 
        onViewStateChange={setViewState}
      />
      <Nav onChange={onNavChange}/>                  
    </>
  );
}

export default App;
