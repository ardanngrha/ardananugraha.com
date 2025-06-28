"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import getNowPlayingItem from "@/lib/spotify-api"

interface CurrentTrack {
  name: string
  artist: string
  isPlaying: boolean
  albumImageUrl: string
}

export default function NowPlaying() {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack>({
    name: "Bohemian Rhapsody",
    artist: "Queen",
    isPlaying: false,
    albumImageUrl: ""
  })

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
        const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

        if (!clientId || !clientSecret || !refreshToken) {
          console.warn('Spotify environment variables not configured');
          return;
        }

        const track = await getNowPlayingItem(
          clientId,
          clientSecret,
          refreshToken
        );

        if (track) {
          setCurrentTrack({
            name: track.title,
            artist: track.artist,
            isPlaying: track.isPlaying,
            albumImageUrl: track.albumImageUrl
          });
        }
      } catch (error) {
        console.error('Failed to fetch current track:', error);
      }
    };

    fetchCurrentTrack();
    // Refresh every 30 seconds
    const interval = setInterval(fetchCurrentTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Currently Playing</h3>
      <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
          {currentTrack.albumImageUrl ? (
            <Image
              src={currentTrack.albumImageUrl}
              alt={`${currentTrack.name} album cover`}
              width={48}
              height={48}
              className="rounded-lg"
            />
          ) : (
            <span className="text-muted-foreground">No Image</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{currentTrack.name}</p>
          <p className="text-muted-foreground text-xs truncate">{currentTrack.artist}</p>
          <div className="flex items-center gap-1 mt-1">
            <div className={`w-1 h-1 rounded-full ${currentTrack.isPlaying ? 'bg-green-500' : 'bg-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">
              {currentTrack.isPlaying ? 'Now playing' : 'Last played'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}