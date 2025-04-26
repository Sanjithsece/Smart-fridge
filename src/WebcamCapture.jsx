import { useEffect, useRef, useState } from 'react';

const DroidCamViewer = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [activeStream, setActiveStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const getCameras = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setAvailableDevices(videoDevices);

      const droidCam = videoDevices.find(device =>
        device.label.toLowerCase().includes('droidcam')
      );

      if (!droidCam) {
        throw new Error(`
          DroidCam not found. Available devices:
          ${videoDevices.map(d => d.label || 'Unlabeled Device').join(', ')}
        `);
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: droidCam.deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setActiveStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError(err.message);
      console.error('Camera error:', err);
    }
  };

  useEffect(() => {
    getCameras();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
    }
  };

  const useDirectVideoStream = () => {
    return (
      <video
        src="" // fill the ip code here 
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxWidth: '800px' }}
      />
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>DroidCam USB Viewer</h2>

      {error ? (
        <div style={{ color: 'red', background: '#ffebee', padding: '15px' }}>
          <strong>Error:</strong> {error}
          <div style={{ marginTop: '10px' }}>
            <h4>Trying fallback method...</h4>
            {useDirectVideoStream()}
          </div>
          <div style={{ marginTop: '20px' }}>
            <h4>Available Cameras:</h4>
            <ul>
              {availableDevices.map((device, index) => (
                <li key={index}>
                  {device.label || `Camera ${index + 1}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', maxWidth: '800px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleCapture} style={{ backgroundcolour : 'orange',padding: '10px 20px', fontSize: '16px' }}>
              Capture
            </button>
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {capturedImage && (
            <div style={{ marginTop: '20px' }}>
              <h4>Captured Image:</h4>
              <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', border: '1px solid #ccc' }} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DroidCamViewer;
