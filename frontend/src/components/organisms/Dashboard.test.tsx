import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
