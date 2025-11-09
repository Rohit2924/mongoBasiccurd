import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {title, description} = await request.json();
    await connectMongoDB();

    await Topic.create({title, description});

    return NextResponse.json({message: "Topic created successfully"}, {status: 201});

}


export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find().sort({createdAt: -1});

    return NextResponse.json({topics}, {status: 200});
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);

    return NextResponse.json({message: "Topic deleted successfully"}, {status: 200});


}