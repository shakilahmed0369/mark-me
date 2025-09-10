import React, { useState } from 'react';
import Home from '../pages/Home';
// import { Switch } from "@/components/ui/switch"
function App() {
    const [count, setCount] = useState(0);

    return (
      <Home />
    );
}

export default App;
