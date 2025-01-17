import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignIn } from '../../../components/SignIn';
import { useSignIn } from '../../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

// Mock the hooks
jest.mock('../../../hooks/useSignIn');
jest.mock('react-router-native', () => ({
  useNavigate: jest.fn(),
}));

describe('SignIn', () => {
  it('calls signIn function with correct arguments when a valid form is submitted', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ data: {} });
    useSignIn.mockReturnValue([mockSignIn]);
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const { getByTestId } = render(<SignIn />);

    fireEvent.changeText(getByTestId('usernameField'), 'kalle');
    fireEvent.changeText(getByTestId('passwordField'), 'password');

    fireEvent.press(getByTestId('submitButton'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledTimes(1);
      expect(mockSignIn).toHaveBeenCalledWith({
        username: 'kalle',
        password: 'password',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});

