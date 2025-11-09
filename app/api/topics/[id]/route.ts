import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // still keep context
) {

    //According to updated version of Next.js 13, we need to upwrap params like this form this 
    // const { id } = params;  to this 
    
  // unwrap the params promise
  const {id} = await context.params;  

  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();

  const updatedTopic = await Topic.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );

  if (!updatedTopic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Topic updated successfully", topic: updatedTopic },
    { status: 200 }
  );
}


// New GET function to fetch a single topic by ID
export async function GET(
  request: Request, context: { params: { id: string } } 
) {
    try{

        const {id} = await context.params;  
        
        await connectMongoDB();
        const topic = await Topic.findOne({ _id: id });
        if (!topic) {
            return NextResponse.json({error: "Topic not found"}, {status: 404});
        }   
        return NextResponse.json({topic}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
