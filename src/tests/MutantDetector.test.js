import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MutantDetector from '../components/MutantDetector';
import { isMutant } from '../utils/dnaChecker';

jest.mock('../utils/dnaChecker', () => ({
    isMutant: jest.fn(),
}));

describe('MutantDetector Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<MutantDetector />);
        expect(screen.getByText(/Detector ADN/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Ingrese la secuencia/i)).toBeInTheDocument();
        expect(screen.getByText(/Verificar ADN/i)).toBeInTheDocument();
    });

    test('updates DNA input correctly', () => {
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        fireEvent.change(dnaInput, { target: { value: 'atcg' } });
        expect(dnaInput.value).toBe('ATCG');
    });

    test('shows error modal for invalid DNA', async () => {
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        const verifyButton = screen.getByText(/Verificar ADN/i);

        fireEvent.change(dnaInput, { target: { value: 'INVALID' } });
        fireEvent.click(verifyButton);

        expect(verifyButton).toBeDisabled();
        expect(screen.getByText(/Validando.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Eres un humano, no podes formar parte del clan de Magneto./i)).toBeInTheDocument();
        });

        expect(verifyButton).not.toBeDisabled();
    });

    test('shows success modal when DNA is mutant', async () => {
        isMutant.mockReturnValue(true);
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        const verifyButton = screen.getByText(/Verificar ADN/i);

        fireEvent.change(dnaInput, { target: { value: 'ATCGAT' } });
        fireEvent.click(verifyButton);

        expect(verifyButton).toBeDisabled();
        expect(screen.getByText(/Validando.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Felicitaciones, eres un mutante/i)).toBeInTheDocument();
        });

        expect(verifyButton).not.toBeDisabled();
    });

    test('shows error modal when DNA is not mutant', async () => {
        isMutant.mockReturnValue(false);
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        const verifyButton = screen.getByText(/Verificar ADN/i);

        fireEvent.change(dnaInput, { target: { value: 'ATCGAT' } });
        fireEvent.click(verifyButton);

        expect(verifyButton).toBeDisabled();
        expect(screen.getByText(/Validando.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/No se detectó mutante./i)).toBeInTheDocument();
        });

        expect(verifyButton).not.toBeDisabled();
    });

    test('handles email submission correctly', async () => {
        isMutant.mockReturnValue(true);
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        const verifyButton = screen.getByText(/Verificar ADN/i);

        fireEvent.change(dnaInput, { target: { value: 'ATCGAT' } });
        fireEvent.click(verifyButton);

        await waitFor(() => {
            expect(screen.getByText(/Completa tu email y Magneto te reclutará en breve./i)).toBeInTheDocument();
        });

        const emailInput = screen.getByPlaceholderText(/Ingresa tu email/i);
        const sendButton = screen.getByText(/Enviar/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText(/Email enviado exitosamente. ¡Te esperamos, mutante!/i)).toBeInTheDocument();
        });
    });

    test('closes error modal when close button is clicked', async () => {
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        const verifyButton = screen.getByText(/Verificar ADN/i);

        fireEvent.change(dnaInput, { target: { value: 'INVALID' } });
        fireEvent.click(verifyButton);

        await waitFor(() => {
            expect(screen.getByText(/Eres un humano, no podes formar parte del clan de Magneto./i)).toBeInTheDocument();
        });

        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        expect(screen.queryByText(/Eres un humano, no podes formar parte del clan de Magneto./i)).not.toBeInTheDocument();
    });

    test('closes success modal when close button is clicked', async () => {
        isMutant.mockReturnValue(true);
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        const verifyButton = screen.getByText(/Verificar ADN/i);

        fireEvent.change(dnaInput, { target: { value: 'ATCGAT' } });
        fireEvent.click(verifyButton);

        await waitFor(() => {
            expect(screen.getByText(/Felicitaciones, eres un mutante/i)).toBeInTheDocument();
        });

        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        expect(screen.queryByText(/Felicitaciones, eres un mutante/i)).not.toBeInTheDocument();
    });

    test('shows loading spinner during validation', () => {
        render(<MutantDetector />);
        const dnaInput = screen.getByPlaceholderText(/Ingrese la secuencia/i);
        const verifyButton = screen.getByText(/Verificar ADN/i);

        fireEvent.change(dnaInput, { target: { value: 'ATCGAT' } });
        fireEvent.click(verifyButton);

        expect(screen.getByText(/Validando.../i)).toBeInTheDocument();
        expect(screen.getByText(/Validando.../i)).toBeDisabled();
    });
});