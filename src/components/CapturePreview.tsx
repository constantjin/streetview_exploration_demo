import React, { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import dayjs from 'dayjs';

import {
  base64EncodedImageAtom,
  sceneCapturedAtom,
  streetViewCommentListAtom,
  initialLocationAtom,
  streetViewRefAtom,
} from '../stores';

export default function CapturePreview() {
  const base64EncodedImage = useAtomValue(base64EncodedImageAtom);
  const setSceneCaptured = useSetAtom(sceneCapturedAtom);

  const [commentData, setCommentData] = useState({
    id: '',
    comment: '',
  });
  const [validationErrorMessage, setValidationErrorMessage] = useState('');
  const setStreetViewCommentList = useSetAtom(streetViewCommentListAtom);
  const streetViewRef = useAtomValue(streetViewRefAtom);
  const initialLocation = useAtomValue(initialLocationAtom);

  const handleEscToExitPreview = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSceneCaptured(false); // Unmount this CapturePreview component
    }
  };

  const handleCommentDataChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setCommentData({
      ...commentData,
      [name]: name === 'id' ? value.toUpperCase() : value,
    });
  };

  const validateCommentSubmit = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter') {
      if (commentData.id === '') {
        setValidationErrorMessage('ID is empty');
      } else if (commentData.comment === '') {
        setValidationErrorMessage('Comment is empty');
      } else {
        setValidationErrorMessage('');
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss'); // now as a formatted string
        const city = initialLocation.city;
        const latLngString = streetViewRef?.getPosition()?.toString();
        const heading = streetViewRef?.getPov().heading;

        // .getPosition() and .getPov() are potentially nullable
        // Practically they should not be null, so maybe non-null assertion operator is OK?
        if (!(latLngString && heading)) {
          setValidationErrorMessage(
            'Street View error(s). Please refresh this page',
          );
        } else {
          setStreetViewCommentList((commentList) => [
            ...commentList,
            {
              timestamp,
              city,
              id: commentData.id,
              comment: commentData.comment,
              latLngString,
              heading,
            },
          ]);
          setCommentData({ id: '', comment: '' }); // Reset the input field
        }
      }
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
      <p className="text-white text-xl mb-2">Press [ESC] to exit preview</p>
      {base64EncodedImage && <img src={base64EncodedImage} />}
      <div
        className="flex flex-row mt-2 w-full"
        onKeyUp={validateCommentSubmit}
      >
        <div className="w-1/4 flex justify-items-start items-center">
          <label className="text-white pr-4">ID</label>
          <input
            className="w-1/2 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
            type="text"
            name="id"
            placeholder="ID (initial)"
            onChange={handleCommentDataChange}
            value={commentData.id}
          />
        </div>
        <div className="w-3/4 flex justify-items-end items-center">
          <label className="w-1/6 text-white pr-4">Comment</label>
          <input
            className="w-5/6 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
            type="text"
            name="comment"
            placeholder="Comment"
            onChange={handleCommentDataChange}
            value={commentData.comment}
          />
        </div>
      </div>
      <div className="w-full text-right mt-1">
        {validationErrorMessage !== '' && (
          <p className="text-red-500 text-right mb-1">
            ❌ {validationErrorMessage}
          </p>
        )}
        <p className="text-white">↳ [Enter] to leave a comment</p>
      </div>
    </div>
  );
}
