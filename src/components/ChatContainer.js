import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../store/chatSlice'
import { generateRandomMessage, generateRandomName } from '../store/helper'

export const ChatContainer = () => {
    const [chatmessage, setChatMessage] = useState("");

    const messages = useSelector(store => store.chat.messages);
    console.log(messages);
    const dispatch = useDispatch()

    useEffect(
        () => {
            const timer = setInterval(() => {
                dispatch(addMessage({
                    name: generateRandomName(),
                    message: generateRandomMessage()
                }))
            }, 10000);
            return () => clearInterval(timer);
        }, []
    );



    return (
        <div className="grid h-[480px] lg:h-[600px] grid-rows-12 border border-gray-300 rounded-lg mt-4 lg:mt-0 mb-6 w-full">
            <h1 className="row-span-1 font-medium p-4">Live Chat</h1>
            <div className="row-span-10 w-full p-4 border-b border-t overflow-y-scroll">
                {messages.map((m) => <Chat key={m.name} name={m.name} message={m.message}></Chat>)}
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch(addMessage({
                    name: "Sri",
                    message: chatmessage
                }));
                setChatMessage("")
            }
            }
                className="row-span-1 flex">
                <input className="bg-gray-100 rounded-full w-3/5 p-2 pl-2 placeholder:pl-1 m-2 font-medium ml-6 text-sm placeholder:text-gray-500"
                    type="text"
                    placeholder="Chat..."
                    value={chatmessage}
                    onChange={(e) => {
                        setChatMessage(e.target.value);
                    }}

                ></input>
                <button type='submit' className="bg-gray-100 w-1/5 rounded-3xl p-2 m-2 font-medium hover:bg-gray-500 text-sm"
                >Submit</button>
            </form>

        </div>
    )
}
