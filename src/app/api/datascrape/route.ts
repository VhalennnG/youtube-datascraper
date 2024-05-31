import { fetchTranscript, fetchVideoDetails } from "@/data/youtube-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
  }

  try {
    const videoDetails = await fetchVideoDetails(videoId);
    const transcript = await fetchTranscript(videoId);

    return NextResponse.json({ videoDetails, transcript }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    return NextResponse.json(
      { error: "Failed to fetch transcript" },
      { status: 500 }
    );
  }
}
