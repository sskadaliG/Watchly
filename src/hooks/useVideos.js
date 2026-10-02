import { useEffect, useState } from 'react';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';

const useVideos = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      if (!data.ok) throw new Error(json?.error?.message ?? `Videos request failed: ${data.status}`);
      setVideos(json?.items ?? []);
    } catch (err) {
      console.error(err);
      setVideos([]);
    }
  };
  return videos;
};

export default useVideos;