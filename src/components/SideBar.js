import React, { useState } from 'react'
import MenuList from './MenuList';
import { exploreList, helpList, mainList, moreFromWatchly, subscriptionList, youList } from "../utils/menuConstants"

const SideBar = () => {

  const [active, setActive] = useState("home");

  return (
    <div className="flex mt-2">
      <div className="pl-2 ml-4 h-screen  overflow-y-scroll">
        <MenuList setActive={setActive} active={active} list={mainList}></MenuList>
        <MenuList setActive={setActive} active={active} title={"You >"} list={youList}></MenuList>
        <MenuList setActive={setActive} active={active} title={"Subscriptions >"} list={subscriptionList}></MenuList>
        <MenuList setActive={setActive} active={active} title={"Explore"} list={exploreList}></MenuList>
        <MenuList setActive={setActive} active={active} title={"More from Watchly"} list={moreFromWatchly}></MenuList>
        <MenuList setActive={setActive} active={active} title={"Help"} list={helpList}></MenuList>
      </div>
    </div>
  )
}

export default SideBar