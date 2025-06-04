import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [searchParams] = useSearchParams();
  const trackingParam = searchParams.get('t');

  useEffect(() => {
    console.log('Tracking Parameter:', trackingParam);
    console.log('Parameter Length:', trackingParam?.length);
    console.log('Is Empty:', !trackingParam || trackingParam.trim() === '');
    
    if (!trackingParam || trackingParam.trim() === '' || trackingParam.length > 151) {
      window.location.href = 'https://www.librarypass.com';
    }
  }, [trackingParam]);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = e.currentTarget.href;

    try {
      // Try using the Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      // Navigate after a short delay
      setTimeout(() => {
        window.location.href = url;
      }, 100);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      // If copying fails, just navigate
      window.location.href = url;
    }
  };

  if (!trackingParam || trackingParam.trim() === '' || trackingParam.length > 151) {
    return null; // Will redirect in useEffect
  }

  const decodedTrackingParam = decodeURIComponent(trackingParam);
  const encodedTrackingParam = encodeURIComponent(decodedTrackingParam);
  
  // Add debug logs
  console.log('Original tracking param:', trackingParam);
  console.log('Decoded tracking param:', decodedTrackingParam);
  console.log('Encoded tracking param:', encodedTrackingParam);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <a
        href={`https://apps.apple.com/app/id1520340626?t=${encodedTrackingParam}`}
        onClick={handleClick}
        style={{
          padding: '12px 24px',
          backgroundColor: '#007AFF',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007AFF'}
      >
        Get From App Store
      </a>
    </div>
  );
}

export default App; 