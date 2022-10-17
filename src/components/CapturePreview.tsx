import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { base64EncodedImageAtom, sceneCapturedAtom } from '../stores';

export default function CapturePreview() {
  const base64EncodedImage = useAtomValue(base64EncodedImageAtom);
  const setSceneCaptured = useSetAtom(sceneCapturedAtom);

  const handleEscToExitPreview = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSceneCaptured(false); // Unmount this CapturePreview component
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscToExitPreview);

    return () => {
      document.removeEventListener('keydown', handleEscToExitPreview);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {base64EncodedImage && <img src={base64EncodedImage} />}
      <p className="text-white text-xl mt-2">Press [ESC] to exit preview</p>
    </div>
  );
}
