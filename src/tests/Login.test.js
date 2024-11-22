import React from 'react'; // Import necessário para JSX
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Components/Login/Login';

// Mock para alert
window.alert = jest.fn();

describe('Componente Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o título da página', () => {
    render(<Login />);
    const titleElement = screen.getByText(/Acesse o sistema/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('deve renderizar os campos de e-mail e senha', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/Senha/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('deve renderizar o botão "Entrar"', () => {
    render(<Login />);
    const buttonElement = screen.getByText(/Entrar/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('deve atualizar o valor do campo de e-mail quando o usuário digitar', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/E-mail/i);

    fireEvent.change(emailInput, { target: { value: 'usuario@teste.com' } });
    expect(emailInput.value).toBe('usuario@teste.com');
  });

  test('deve atualizar o valor do campo de senha quando o usuário digitar', () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/Senha/i);

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(passwordInput.value).toBe('123456');
  });

  test('deve exibir um alerta com os dados ao enviar o formulário', () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(/E-mail/i);
    const passwordInput = screen.getByPlaceholderText(/Senha/i);
    const submitButton = screen.getByText(/Entrar/i);

    fireEvent.change(emailInput, { target: { value: 'usuario@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Enviando os dados:usuario@teste.com-senha123');
  });
});
