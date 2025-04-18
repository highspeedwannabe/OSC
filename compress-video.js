const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if ffmpeg is installed
exec('ffmpeg -version', (error) => {
  if (error) {
    console.error('Error: ffmpeg is not installed. Please install ffmpeg first.');
    console.error('Visit https://ffmpeg.org/download.html for installation instructions.');
    process.exit(1);
  }
  
  // Create assets directory if it doesn't exist
  const assetsDir = path.join(__dirname, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
    console.log('Created assets directory');
  }
  
  // Check if the original video exists
  const originalVideo = path.join(__dirname, 'backgroundvideo.mp4');
  if (!fs.existsSync(originalVideo)) {
    console.error('Error: backgroundvideo.mp4 not found in the root directory.');
    process.exit(1);
  }
  
  // Compress video for mobile (480p)
  console.log('Compressing video for mobile devices (480p)...');
  exec(`ffmpeg -i ${originalVideo} -vf "scale=854:480" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -movflags +faststart ${path.join(assetsDir, 'backgroundvideo-mobile.mp4')}`, (error) => {
    if (error) {
      console.error('Error compressing mobile video:', error);
    } else {
      console.log('Mobile video compression complete!');
    }
    
    // Compress video for tablet (720p)
    console.log('Compressing video for tablet devices (720p)...');
    exec(`ffmpeg -i ${originalVideo} -vf "scale=1280:720" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart ${path.join(assetsDir, 'backgroundvideo-tablet.mp4')}`, (error) => {
      if (error) {
        console.error('Error compressing tablet video:', error);
      } else {
        console.log('Tablet video compression complete!');
      }
      
      // Create a poster image from the first frame
      console.log('Creating poster image...');
      exec(`ffmpeg -i ${originalVideo} -ss 00:00:01 -frames:v 1 ${path.join(assetsDir, 'video-poster.jpg')}`, (error) => {
        if (error) {
          console.error('Error creating poster image:', error);
        } else {
          console.log('Poster image created successfully!');
          console.log('\nAll compression tasks completed!');
          console.log('The following files have been created in the assets directory:');
          console.log('- backgroundvideo-mobile.mp4 (480p)');
          console.log('- backgroundvideo-tablet.mp4 (720p)');
          console.log('- video-poster.jpg (poster image)');
        }
      });
    });
  });
}); 