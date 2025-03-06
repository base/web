const videoContainer = {
    position: 'relative',
    width: '100%',
    height: '0',
    paddingBottom: '56.25%',
    marginBottom: '15px',
  };
  
  const video = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };
  
  export default function Video({ videoId, title }) {
    return (
      <div style={videoContainer}>
        <iframe
          style={video}
          src={`https://player.vimeo.com/video/${videoId}`}
          allow="accelerometer; autoplay; gyroscope; fullscreen; picture-in-picture"
          title={title}
        />
      </div>
    );
  }
  