import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Baby Shower Invitation - Adebukola Ayeni Jolayemi';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f3ef',
          backgroundImage: 'linear-gradient(135deg, #fff9f0 0%, #ffe8d6 100%)',
          fontFamily: 'system-ui',
        }}
      >
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#1a4d2e',
              marginBottom: '20px',
              fontFamily: 'Georgia, serif',
            }}
          >
            🎉 Baby Shower 🎉
          </div>
          
          <div
            style={{
              fontSize: 48,
              color: '#2d5a3d',
              marginBottom: '30px',
              fontStyle: 'italic',
            }}
          >
            Adebukola Ayeni Jolayemi
          </div>
          
          <div
            style={{
              fontSize: 36,
              color: '#5a7c65',
              marginBottom: '40px',
            }}
          >
            Saturday, March 28th, 2026
          </div>
          
          <div
            style={{
              fontSize: 32,
              color: '#6b8e75',
              marginBottom: '50px',
            }}
          >
            1:30 PM - 4:30 PM CTGMT
          </div>

          {/* Call to Action */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#1a4d2e',
              color: 'white',
              fontSize: 40,
              fontWeight: 'bold',
              padding: '20px 60px',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(26, 77, 46, 0.3)',
            }}
          >
            RSVP Today! ✨
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}