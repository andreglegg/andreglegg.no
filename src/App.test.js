import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders the portfolio with the public Forge release', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  expect(div.textContent).toContain('Forge');
  expect(div.textContent).toContain('@aglegg/forge-harness');
  expect(div.querySelector('a[href="https://github.com/andreglegg/forge"]')).not.toBeNull();
  expect(div.querySelector('a[href="https://www.npmjs.com/package/@aglegg/forge-harness"]')).not.toBeNull();

  ReactDOM.unmountComponentAtNode(div);
});
