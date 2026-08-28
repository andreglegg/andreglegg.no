import { fireEvent, render, screen } from '@testing-library/react';
import PortfolioApp from './PortfolioApp';

describe('portfolio', () => {
  it('presents the senior-engineer positioning and verified Forge evidence', () => {
    render(<PortfolioApp />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'I build complex systems and turn them into products that ship.',
    );
    expect(screen.getAllByText('60.00%').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/135 \/ 225/).length).toBeGreaterThan(0);
    expect(screen.getByText('npm install --global @aglegg/forge-harness')).toBeInTheDocument();
  });

  it('links to the real resume and public Forge destinations', () => {
    render(<PortfolioApp />);

    expect(screen.getAllByRole('link', { name: /view résumé/i })[0]).toHaveAttribute(
      'href',
      '/andre-glegg-resume.pdf',
    );
    expect(screen.getAllByRole('link', { name: /source/i })[0]).toHaveAttribute(
      'href',
      'https://github.com/andreglegg/forge',
    );
    expect(screen.getAllByRole('link', { name: /npm package/i })[0]).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/@aglegg/forge-harness',
    );
  });

  it('uses the verified experience dates, product evidence and contact email', () => {
    render(<PortfolioApp />);

    expect(screen.getByText('Aug 2021 — Jun 2024')).toBeInTheDocument();
    expect(screen.getByText('Jun 2018 — Aug 2021')).toBeInTheDocument();
    expect(screen.getByText('Jul 2024 — Present')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /published Aize digital-twin product interface/i })).toHaveAttribute(
      'src',
      '/assets/aize-product.jpg',
    );
    expect(screen.getByRole('img', { name: /Endless Descent App Store gameplay screenshot/i })).toHaveAttribute(
      'src',
      '/assets/endless-descent-gameplay.png',
    );
    expect(screen.getByRole('img', { name: /LastCoil App Store gameplay screenshot/i })).toHaveAttribute(
      'src',
      '/assets/lastcoil-gameplay.png',
    );
    expect(screen.getByRole('link', { name: /andreglegg@me.com/i })).toHaveAttribute(
      'href',
      'mailto:andreglegg@me.com',
    );
    expect(screen.queryByText(/hello@aglegg\.dev/i)).not.toBeInTheDocument();
  });

  it('opens and closes the mobile navigation accessibly', () => {
    render(<PortfolioApp />);

    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(screen.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
