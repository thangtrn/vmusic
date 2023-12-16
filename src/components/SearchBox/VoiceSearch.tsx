import React, { useEffect } from 'react';
import { Button } from '../Commons';
import { Microphone2, MicrophoneSlash } from 'iconsax-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setValue } from '~/redux/slices/searchSlice';

interface VoiceSearchProps {
   setFocus: () => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ setFocus }) => {
   const dispatch = useDispatch();

   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
      useSpeechRecognition();

   const handleStartListening = () => {
      dispatch(setValue(''));
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
   };
   const handleEndListening = () => {
      SpeechRecognition.stopListening();
   };

   useEffect(() => {
      if (listening === true) {
         dispatch(setValue(transcript));
      }
   }, [dispatch, listening, transcript]);

   if (!browserSupportsSpeechRecognition) {
      toast.warning('Trình duyệt không hỗ trợ nhận dạng giọng nói.');
   }
   return (
      <div onClick={setFocus} className="ml-2">
         {!listening ? (
            <Button
               tippyContent="Bắt đầu nói"
               onClick={handleStartListening}
               className="bg-alpha-color !w-10 !h-10"
            >
               <Microphone2 size="16" />
            </Button>
         ) : (
            <Button
               tippyContent="Đừng nói"
               onClick={handleEndListening}
               className="bg-alpha-color !w-10 !h-10"
            >
               <MicrophoneSlash size="16" />
            </Button>
         )}
         {/* <span className="fixed top-1/2 lef-1/2 h-40 w-96 bg-white p-3 rounded shadow-button">
            {transcript}
         </span> */}
      </div>
   );
};

export default VoiceSearch;
