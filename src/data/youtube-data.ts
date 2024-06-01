import { parse } from "node-html-parser";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)";

class YoutubeTranscriptError extends Error {
  constructor(message: string) {
    super(`[YoutubeTranscript] ${message}`);
  }
}

type YtFetchConfig = {
  lang?: string; // Object with lang param (eg: en, es, hk, uk) format.
};

async function fetchTranscript(videoId: string, config: YtFetchConfig = {}) {
  // console.log("fetchTranscript", videoId);
  const identifier = extractYouTubeID(videoId);
  const lang = config?.lang ?? "en";
  try {
    const transcriptUrl = await fetch(
      `https://www.youtube.com/watch?v=${identifier}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    )
      .then((res) => res.text())
      .then((html) => parse(html))
      .then((html) => parseTranscriptEndpoint(html, lang));

    if (!transcriptUrl)
      throw new Error("Failed to locate a transcript for this video!");

    // Result is hopefully some XML.
    const transcriptXML = await fetch(transcriptUrl)
      .then((res) => res.text())
      .then((xml) => parse(xml));

    const chunks = transcriptXML.getElementsByTagName("text");

    let transcriptions = [];
    for (const chunk of chunks) {
      const [offset, duration] = chunk.rawAttrs.split(" ");
      transcriptions.push({
        text: chunk.text,
        offset: convertToMs(offset),
        duration: convertToMs(duration),
      });
    }
    return transcriptions;
  } catch (e: any) {
    throw new YoutubeTranscriptError(e);
  }
}

async function fetchVideoDetails(videoId: string) {
  const identifier = extractYouTubeID(videoId);
  try {
    const videoPageHtml = await fetch(
      `https://www.youtube.com/watch?v=${identifier}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    ).then((res) => res.text());

    const root = parse(videoPageHtml);
    const scriptTag = root
      .querySelectorAll("script")
      .find((script) =>
        script.text.includes("var ytInitialPlayerResponse = {")
      );

    if (!scriptTag)
      throw new Error("Failed to locate initial player response!");

    const dataString =
      scriptTag.text.split("var ytInitialPlayerResponse = ")[1].split("};")[0] +
      "}";

    const data = JSON.parse(dataString.trim());

    const videoDetails = data.videoDetails;
    // console.log("details: ", videoDetails);

    const description =
      videoDetails.shortDescription || "No description available";
    const title = videoDetails.title || "No title available";
    const author = videoDetails.author || "No title available";
    const viewCount = videoDetails.viewCount || "No view count available";
    const duration = videoDetails.lengthSeconds
      ? parseInt(videoDetails.lengthSeconds)
      : "No duration available";

    const engagementScript = root
      .querySelectorAll("script")
      .find((script) => script.text.includes("var ytInitialData = {"));

    if (!engagementScript) throw new Error("Failed to locate engagement data!");

    const engagementDataString =
      engagementScript.text.split("var ytInitialData = ")[1].split("};")[0] +
      "}";

    const engagementData = JSON.parse(engagementDataString.trim());

    // console.log(engagementData);

    const primaryInfoRenderer =
      engagementData.contents?.twoColumnWatchNextResults?.results?.results?.contents?.find(
        (content: any) => content.videoPrimaryInfoRenderer
      )?.videoPrimaryInfoRenderer;

    // console.log("primary:", primaryInfoRenderer);

    if (!primaryInfoRenderer)
      throw new Error("Failed to locate primary info renderer!");

    const publishDate =
      primaryInfoRenderer?.dateText?.simpleText || "No publish date available";

    const likeButtonRenderer =
      primaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.find(
        (button: any) =>
          button.segmentedLikeDislikeButtonViewModel?.likeButtonViewModel
      )?.segmentedLikeDislikeButtonViewModel?.likeButtonViewModel
        ?.likeButtonViewModel?.toggleButtonViewModel?.toggleButtonViewModel
        ?.defaultButtonViewModel?.buttonViewModel;

    const likes = likeButtonRenderer.accessibilityText || "0";

    return {
      title,
      author,
      duration,
      description,
      viewCount,
      publishDate,
      likes,
    };
  } catch (e: any) {
    throw new YoutubeTranscriptError(e.message);
  }
}

function convertToMs(text: string) {
  const float = parseFloat(text.split("=")[1].replace(/"/g, "")) * 1000;
  return Math.round(float);
}

function parseTranscriptEndpoint(document: any, langCode?: string) {
  try {
    // Get all script tags on document page
    const scripts = document.getElementsByTagName("script");

    // find the player data script.
    const playerScript = scripts.find((script: any) =>
      script.textContent.includes("var ytInitialPlayerResponse = {")
    );

    const dataString =
      playerScript.textContent
        ?.split("var ytInitialPlayerResponse = ")?.[1] //get the start of the object {....
        ?.split("};")?.[0] + // chunk off any code after object closure.
      "}"; // add back that curly brace we just cut.

    const data = JSON.parse(dataString.trim()); // Attempt a JSON parse
    const availableCaptions =
      data?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

    // If languageCode was specified then search for it's code, otherwise get the first.
    let captionTrack = availableCaptions?.[0];
    if (langCode)
      captionTrack =
        availableCaptions.find((track: any) =>
          track.languageCode.includes(langCode)
        ) ?? availableCaptions?.[0];

    return captionTrack?.baseUrl;
  } catch (e: any) {
    console.error(`parseTranscriptEndpoint Error: ${e.message}`);
    return null;
  }
}

export function extractYouTubeID(urlOrID: string): string | null {
  // Regular expression for YouTube ID format
  const regExpID = /^[a-zA-Z0-9_-]{11}$/;
  const regExpShareID = /^[a-zA-Z0-9_-]{11}/;

  // Check if the input is a YouTube ID
  if (regExpID.test(urlOrID)) {
    return urlOrID;
  }

  // Check if the input is a YouTube share ID
  if (regExpShareID.test(urlOrID)) {
    return urlOrID;
  }

  // Regular expression for standard YouTube links
  const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;

  // Regular expression for YouTube share links
  const regExpShare = /youtu\.be\/([a-zA-Z0-9_-]{11})/;

  // Regular expression for YouTube Shorts links
  const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

  // Regular expression for YouTube share Shorts links
  const regExpShortShare = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;

  // Check for standard YouTube link
  let match = urlOrID.match(regExpStandard);
  if (match) {
    return match[1];
  }

  // Check for YouTube share link
  match = urlOrID.match(regExpShare);
  if (match) {
    return match[1];
  }

  // Check for YouTube Shorts link
  match = urlOrID.match(regExpShorts);
  if (match) {
    return match[1];
  }

  // Check for YouTube Shorts link
  match = urlOrID.match(regExpShortShare);
  if (match) {
    return match[1];
  }

  // Return null if no match is found
  return null;
}

export { fetchTranscript, fetchVideoDetails, YoutubeTranscriptError };
