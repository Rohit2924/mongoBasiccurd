"use client";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "./RemoveBtn";
import { useEffect, useState } from "react";

interface Topic {
  _id: string;
  title: string;
  description?: string; 
}

export default function Topiclist() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();
        setTopics(data.topics || []);
      } catch (error) {
        console.log("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // This function removes the topic from the UI
  const handleDelete = (deletedId: string) => {
    setTopics(topics.filter(topic => topic._id !== deletedId));
  };

  if (loading) {
    return <div className="p-4">Loading topics...</div>;
  }

  return (
    <>
      {topics.map((t) => (  
        <div
          key={t._id}
          className="p-4 border border-gray-300 rounded-md m-4 shadow-lg my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div className="desc">{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} onDelete={handleDelete} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={20} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}