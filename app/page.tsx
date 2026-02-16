"use client"
import React, { useState } from "react"

export default function Page() {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">動作テスト</h1>
      <button 
        onClick={() => {
          console.log("Button clicked")
          setClicked(true)
        }}
        className="px-10 py-5 bg-blue-500 text-white rounded-full font-bold active:scale-90"
      >
        テストボタン
      </button>
      {clicked && <p className="text-red-500 text-xl font-bold">ボタンは反応しています！</p>}
    </div>
  )
}
