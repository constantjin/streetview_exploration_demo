import { Routes, Route } from 'react-router-dom';

import StartPage from './routes/StartPage';
import Exploration from './routes/Exploration';
import Comments from './routes/Comments';

export default function App() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/explore" element={<Exploration />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>
    </>
  );
}
