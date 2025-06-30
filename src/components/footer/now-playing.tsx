"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import getNowPlayingItem from "@/lib/spotify"

interface CurrentTrack {
  name: string
  artist: string
  isPlaying: boolean
  albumImageUrl: string
}

export default function NowPlaying() {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
        const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

        if (!clientId || !clientSecret || !refreshToken) {
          console.warn('Spotify environment variables not configured');
          setLoading(false);
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
        } else {
          // No track is currently playing or available
          setCurrentTrack(null);
        }
      } catch (error) {
        console.error('Failed to fetch current track:', error);
        setCurrentTrack(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentTrack();
    // Refresh every 30 seconds
    const interval = setInterval(fetchCurrentTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Loading...</h3>
        <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
          <div className="w-12 h-12 bg-primary/20 rounded-lg animate-pulse"></div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-primary/20 rounded animate-pulse"></div>
            <div className="h-3 bg-primary/20 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentTrack) {
    return (
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg">Ardana Nugraha</h3>
        <div className="flex items-center gap-2 pt-4">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-xs">♪</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-muted-foreground text-sm">No music playing</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col " >
      <h3 className="font-semibold text-lg">Ardana Nugraha</h3>
      <div className="flex items-center gap-2 pt-4">
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
            <span className="text-muted-foreground text-xs">♪</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{currentTrack.name}</p>
          <p className="text-muted-foreground text-xs truncate">{currentTrack.artist}</p>
          <div className="flex items-center gap-1">
            <div className={`w-1 h-1 rounded-full ${currentTrack.isPlaying ? 'bg-green-500' : 'bg-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">
              {currentTrack.isPlaying ? 'Now playing' : 'Last played'}
            </span>
          </div>
        </div>
      </div>
    </div >
  )
}