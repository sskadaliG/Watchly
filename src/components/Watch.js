import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeSideBar } from '../store/appSlice';
import MainVideo from './MainVideo';
import VideoList from './VideoList';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import { ChatContainer } from './ChatContainer';

const Watch = () => {

    const [searchParams] = useSearchParams();
    const params = searchParams.get("v")

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(closeSideBar());
    }, [dispatch]);

    return (
        <div className="flex flex-col lg:flex-row w-full px-4 pt-4">
            <div className="flex-1 min-w-0 lg:pl-16">
                <MainVideo params={params} />
                <CommentsContainer></CommentsContainer>
            </div>
            <div className="lg:px-4 lg:w-[26rem] lg:shrink-0">
                <ChatContainer></ChatContainer>
                <p className="font-bold px-2"> Suggestions</p>
                <VideoList params={searchParams}></VideoList>
            </div>
        </div>
    )
}

export default Watch