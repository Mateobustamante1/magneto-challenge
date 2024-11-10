import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCarousel from './ProductCarousel';
import productsData from '../mocks/products.json';

jest.mock('../mocks/products.json', () => [
  { id: 1, name: 'Producto 1', price: '$100', location: 'Ubicación 1', description: 'Descripción 1', image: 'image1.jpg', productUrl: 'https://example.com/product1' },
  { id: 2, name: 'Producto 2', price: '$200', location: 'Ubicación 2', description: 'Descripción 2', image: 'image2.jpg', productUrl: 'https://example.com/product2' }
]);

describe('ProductCarousel Component', () => {
  let onBackMock;

  beforeEach(() => {
    onBackMock = jest.fn();
    global.open = jest.fn();
    render(<ProductCarousel onBack={onBackMock} />);
  });

  it('renders correctly with products data', () => {
    expect(screen.getByText(/UPPS, parece que tu ADN no es de mutante/i)).toBeInTheDocument();
    productsData.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.price)).toBeInTheDocument();
      expect(screen.getByText(product.location)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });

  it('calls onBack function when back icon is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /back-arrow/i }));
    expect(onBackMock).toHaveBeenCalled();
  });

  it('opens a new tab with the correct URL when a card is clicked', () => {
    const firstProduct = productsData[0];
    const card = screen.getByText(firstProduct.name).closest('.card');
    fireEvent.click(card);
    expect(global.open).toHaveBeenCalledWith(firstProduct.productUrl, '_blank');
  });
});
