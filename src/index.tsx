import React from 'react';
import * as ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { App } from './App/App';

ReactDOM.render(
  <div>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </div>,
  document.getElementById('root'),
);
