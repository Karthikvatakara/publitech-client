import React, { useEffect, useState } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryVideo } from "@cloudinary/url-gen/assets/CloudinaryVideo";
import { Transformation } from "@cloudinary/url-gen";
import { concatenate } from "@cloudinary/url-gen/actions/videoEdit";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { reverse, accelerate } from "@cloudinary/url-gen/actions/effect";
import { videoSource } from "@cloudinary/url-gen/qualifiers/concatenate";

function Announcements() {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Initialize Cloudinary instance with a dummy configuration
    const cld = new Cloudinary({
      cloud: {
        cloudName: "dozwnxgav", // Use 'demo' for Cloudinary's demo account
      },
    });

    // Create a CloudinaryVideo instance with a dummy video
    const video = cld.video('https://res.cloudinary.com/dozwnxgav/video/upload/v1719469788/videos/nbktpulb3ijw1xbvaulv.mp4');

    // Apply transformations
    video
      .videoEdit(
        concatenate(
          videoSource("https://res.cloudinary.com/dozwnxgav/video/upload/v1719469788/videos/nbktpulb3ijw1xbvaulv.mp4").transformation(
            new Transformation().effect(reverse())
          )
        )
      )
      .videoEdit(
        concatenate(
          videoSource("dog").transformation(
            new Transformation().effect(accelerate().rate(-50))
          )
        )
      )
      .resize(scale().width(400))
      .roundCorners(max());

    // Set the video URL in state
    setVideoUrl(video.toURL());
  }, []);

  return (
    <div>
      {videoUrl ? (
        <video controls width="400">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default Announcements;
