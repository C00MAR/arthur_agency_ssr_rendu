interface BackgroundVideoProps {
    videoSrc?: string;
    className?: string;
  }
  
  const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
    videoSrc = 'https://www.usestate.org/assets/video/home-background.mp4',
    className = ''
  }) => {
    return (
      <div className={`backgroundVideo ${className}`.trim()}>
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline=""
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    );
  };
  
  export default BackgroundVideo;