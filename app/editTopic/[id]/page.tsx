import EditTopicForm from "@/components/EditTopicForm";



const getTopicById = async (id: string) => {
    try{
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {cache: "no-store"});
        
        if (!res.ok) {
            throw new Error("Failed to fetch topic");
        }
        return res.json();
    }catch (error) {
        console.error("Error fetching topic:", error);
        return null;
    }
};

export default async function EditTopic({params}: {params: Promise<{id: string}>}){ // Fix this line
    const {id} = await params;     
   const data = await getTopicById(id); 
const { title, description } = data.topic; // Destructure from data.topic
    
    return <EditTopicForm id={id} title={title} description={description} />;
}