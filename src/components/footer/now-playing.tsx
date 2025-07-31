"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import getNowPlayingItem from "@/lib/spotify"
import Link from "next/link"

interface CurrentTrack {
  name: string
  artist: string
  isPlaying: boolean
  albumImageUrl: string
  songUrl: string
}

// Sound waves component
function SoundWaves({ isPlaying }: { isPlaying: boolean }) {
  if (!isPlaying) return null;

  return (
    <div className="sound-wave">
      <div className="sound-wave-bar"></div>
      <div className="sound-wave-bar"></div>
      <div className="sound-wave-bar"></div>
      <div className="sound-wave-bar"></div>
      <div className="sound-wave-bar"></div>
    </div>
  );
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
            albumImageUrl: track.albumImageUrl,
            songUrl: track.songUrl,
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

  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <h3 className="font-semibold text-4xl font-handwriting">Ardana Nugraha</h3>
      <p className="text-sm text-muted-foreground italic">&quot;stay foolish, stay hungry&quot;</p>

      {currentTrack ? (
        <Link className="flex items-center gap-2 custom-cursor" href={currentTrack.songUrl} target="_blank" rel="noopener noreferrer">
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
                {currentTrack.isPlaying ? 'Now Playing' : 'Last Played'}
              </span>
            </div>
          </div>
          <SoundWaves isPlaying={currentTrack.isPlaying} />
        </Link>
      ) : (
        <></>
        // No track is currently playing

      )}
    </div>
  )
}