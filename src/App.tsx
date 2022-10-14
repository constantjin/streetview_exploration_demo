import { Routes, Route } from 'react-router-dom';

import StartPage from './routes/StartPage';

export default function App() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </div>
    </>
  );
}
