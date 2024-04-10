"use client"
import React, { useState, useEffect } from 'react';
import className from './casts.module.css'
import Header from '../components/Header/Header';
import Spinnner from '../components/Spinner/Spinnner';
import Copyclip from '../utils/Copyclip';

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_APP_URL || ''

function page() {

  const [blogs, setBlogs] = useState([])
  const [loading, setIsLoading] = useState(false)

  interface IDataModel {
    id: number;
    blog: string;
    created_at: string;

  }

  const GetPost = async () => {
    const response = await fetch('/api/query_blogs', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const json = await response.json()

    if (response.ok) { setBlogs(json); setIsLoading(false) }
  }


  useEffect(() => {
    setIsLoading(true)
    GetPost()
  }, [])

  return (
    <>
      <Header />
      {loading && <Spinnner />}
      <div className={className.blogGrid}>
        {blogs?.map((item: IDataModel) => {
          console.log(item)
          return (
            <div key={item?.id} className={`${className.blogItem} `}>
              <div>
                <span className="font-extrabold">Blog Link: </span>
                <span className="">{item?.blog}</span>
              </div>
              <a
                href={NEXT_PUBLIC_URL + `/subscribers/` + item?.id}
                rel="noopener noreferrer"
                className="font-extrabold"
              >
                ↗️ All Registrations  {item?.id}
              </a>
              <Copyclip id={String(item?.id)} />

            </div>
          );
        })}
      </div>
    </>
  );
}

export default page;
