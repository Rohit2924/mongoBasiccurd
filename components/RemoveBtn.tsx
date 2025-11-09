"use client";
import { HiOutlineTrash } from "react-icons/hi";

interface RemoveBtnProps {
  id: string;
  onDelete?: (id: string) => void;
}

export default function RemoveBtn({ id, onDelete }: RemoveBtnProps) {
    const removeTopic = async () => {
        const confirmed = confirm("Are you sure you want to delete this topic?");
        
        if (confirmed) {
            try {
                const res = await fetch(`/api/topics?id=${id}`, {
                    method: "DELETE",
                });

                if (!res.ok) {
                    throw new Error(`Failed to delete topic: ${res.status}`);
                }
                
                // Call the callback to remove from UI
                if (onDelete) {
                    onDelete(id);
                }
                
            } catch (error) {
                console.error("Error deleting topic:", error);
                alert("Failed to delete topic. Please try again.");
            }
        }
    };

    return (
        <button onClick={removeTopic} className="text-red-400 hover:text-red-600 transition-colors">
            <HiOutlineTrash size={20} />
        </button>
    );
}