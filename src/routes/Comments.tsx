import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';

import { streetViewCommentListAtom } from '../stores';

export default function Comments() {
  const streetViewCommentList = useAtomValue(streetViewCommentListAtom);

  const navigate = useNavigate();

  const handleReturnToExploration = () => {
    navigate('/explore');
  };

  return (
    <div className="flex flex-col items-center w-1/2">
      <div className="flex-row justify-center">
        <p className="text-white text-left">
          ⬅{' '}
          <span
            className="hover:underline cursor-pointer"
            onClick={handleReturnToExploration}
          >
            Return to exploration
          </span>
        </p>
      </div>
      <div className="mt-2"></div>
    </div>
  );
}
