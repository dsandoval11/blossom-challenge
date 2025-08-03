import '@testing-library/jest-dom';

vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useLocation: () => ({ pathname: '/' }),
}));
