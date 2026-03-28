export interface Song {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: number;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
}

const featuredSongs: Song[] = [
    {
        _id: "song-1",
        title: "Midnight Dreams",
        artist: "Sarah Mitchell",
        albumId: "album-1",
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/music/1.mp3",
        duration: 234,
    },
    {
        _id: "song-2",
        title: "Electric Pulse",
        artist: "The Wanderers",
        albumId: "album-1",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/music/2.mp3",
        duration: 198,
    },
    {
        _id: "song-3",
        title: "Ocean Breeze",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/music/3.mp3",
        duration: 267,
    },
    {
        _id: "song-4",
        title: "Urban Nights",
        artist: "Sarah Mitchell",
        albumId: "album-2",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/music/4.mp3",
        duration: 245,
    },
    {
        _id: "song-5",
        title: "Stellar Journey",
        artist: "The Wanderers",
        albumId: "album-3",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/music/5.mp3",
        duration: 312,
    },
    {
        _id: "song-6",
        title: "Digital Hearts",
        artist: "Electric Dreams",
        albumId: "album-3",
        imageUrl: "/cover-images/6.jpg",
        audioUrl: "/music/6.mp3",
        duration: 189,
    },
];

const madeForYouSongs: Song[] = [
    {
        _id: "song-7",
        title: "Summer Vibes",
        artist: "Luna Ridge",
        albumId: "album-4",
        imageUrl: "/cover-images/7.jpg",
        audioUrl: "/music/7.mp3",
        duration: 223,
    },
    {
        _id: "song-8",
        title: "Mountain Echo",
        artist: "Sarah Mitchell",
        albumId: null,
        imageUrl: "/cover-images/8.jpg",
        audioUrl: "/music/8.mp3",
        duration: 278,
    },
    {
        _id: "song-9",
        title: "City Rain",
        artist: "Electric Dreams",
        albumId: null,
        imageUrl: "/cover-images/9.jpg",
        audioUrl: "/music/9.mp3",
        duration: 256,
    },
    {
        _id: "song-10",
        title: "Sunset Drive",
        artist: "The Wanderers",
        albumId: "album-4",
        imageUrl: "/cover-images/10.jpg",
        audioUrl: "/music/10.mp3",
        duration: 201,
    },
];

const trendingSongs: Song[] = [
    {
        _id: "song-11",
        title: "Neon Skyline",
        artist: "Luna Ridge",
        albumId: null,
        imageUrl: "/cover-images/11.jpg",
        audioUrl: "/music/11.mp3",
        duration: 234,
    },
    {
        _id: "song-12",
        title: "Crystal Clear",
        artist: "Sarah Mitchell",
        albumId: null,
        imageUrl: "/cover-images/12.jpg",
        audioUrl: "/music/12.mp3",
        duration: 189,
    },
    {
        _id: "song-13",
        title: "Wild Dreams",
        artist: "Electric Dreams",
        albumId: null,
        imageUrl: "/cover-images/13.jpg",
        audioUrl: "/music/13.mp3",
        duration: 267,
    },
    {
        _id: "song-14",
        title: "Electric Soul",
        artist: "The Wanderers",
        albumId: null,
        imageUrl: "/cover-images/14.jpg",
        audioUrl: "/music/14.mp3",
        duration: 298,
    },
];

const albums: Album[] = [
    {
        _id: "album-1",
        title: "Urban Nights",
        artist: "Sarah Mitchell",
        imageUrl: "/albums/1.jpg",
        releaseYear: 2024,
        songs: featuredSongs.filter((s) => s.albumId === "album-1"),
    },
    {
        _id: "album-2",
        title: "Coastal Dreaming",
        artist: "Electric Dreams",
        imageUrl: "/albums/2.jpg",
        releaseYear: 2024,
        songs: featuredSongs.filter((s) => s.albumId === "album-2"),
    },
    {
        _id: "album-3",
        title: "Midnight Sessions",
        artist: "The Wanderers",
        imageUrl: "/albums/3.jpg",
        releaseYear: 2024,
        songs: featuredSongs.filter((s) => s.albumId === "album-3"),
    },
    {
        _id: "album-4",
        title: "Eastern Dreams",
        artist: "Luna Ridge",
        imageUrl: "/albums/4.jpg",
        releaseYear: 2024,
        songs: madeForYouSongs.filter((s) => s.albumId === "album-4"),
    },
];

const allSongs: Song[] = [
    ...featuredSongs,
    ...madeForYouSongs,
    ...trendingSongs,
];

export { featuredSongs, madeForYouSongs, trendingSongs, albums, allSongs };