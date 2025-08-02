import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="character/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
