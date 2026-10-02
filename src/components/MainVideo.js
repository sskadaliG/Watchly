import React from 'react'
import useVideos from '../hooks/useVideos'
import views from '../utils/views';
import { mainVideoList } from '../utils/buttonConstants';

const MainVideo = ({ params }) => {
  const videos = useVideos();

  const video = videos.find((video) => video.id === params);

  if (!video) return <div>Loading...</div>
  const { snippet, statistics } = video;

  const { title, channelTitle } = snippet;

  return (
    <div className="border-b   pb-4"><iframe className="rounded-lg w-full aspect-video"

      src={`https://www.youtube.com/embed/${params}?autoplay=1&disablekb=1&loop=1&playlist=${params}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>

      <ul >
        <li className="font-bold text-xl pt-4 pb-1">{title}</li>
        <div className="flex justify-between">
          <div className=" pl-4 flex space-x-6">
            <div>
              <li className="text-black text-md pt-2 font-bold">{channelTitle}</li>
              <li className="text-gray-600 text-sm font-medium">{views(statistics.viewCount)} views</li>
            </div>
            <button className="px-3  py-2 m-2 w-max h-min  font-bold text-sm rounded-full whitespace-nowrap hover:cursor-pointer hover:bg-opacity-80 bg-black text-white">Subscribe</button>
          </div>
          <div>
            {mainVideoList.map((b, index) => <button key={index} className="px-3  py-2 m-2 w-max h-min  font-bold text-sm rounded-full whitespace-nowrap hover:cursor-pointer hover:bg-gray-200 bg-gray-100 text-black">{b}</button>)}
          </div>
        </div>
      </ul>


    </div >
  )
}

export default MainVideo