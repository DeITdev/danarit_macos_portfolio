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

const album1Songs: Song[] = [
    {
        _id: "song-1-1",
        title: "Liked Song 1",
        artist: "Danar IT",
        albumId: "album-1",
        imageUrl: "/cover-images/1_1.jpg",
        audioUrl: "/music/1_1.mp3",
        duration: 0,
    },
    {
        _id: "song-1-2",
        title: "Liked Song 2",
        artist: "Danar IT",
        albumId: "album-1",
        imageUrl: "/cover-images/1_2.jpg",
        audioUrl: "/music/1_2.mp3",
        duration: 0,
    },
];

const album2Songs: Song[] = [
    {
        _id: "song-2-1",
        title: "Song 2-1",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_1.jpg",
        audioUrl: "/music/2_1.mp3",
        duration: 0,
    },
    {
        _id: "song-2-2",
        title: "Song 2-2",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_2.jpg",
        audioUrl: "/music/2_2_0.mp3",
        duration: 0,
    },
    {
        _id: "song-2-3",
        title: "Song 2-3",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_3.jpg",
        audioUrl: "/music/2_3.mp3",
        duration: 0,
    },
    {
        _id: "song-2-4",
        title: "Song 2-4",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_4.jpg",
        audioUrl: "/music/2_4.mp3",
        duration: 0,
    },
    {
        _id: "song-2-5",
        title: "Song 2-5",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_5.jpg",
        audioUrl: "/music/2_5.mp3",
        duration: 0,
    },
    {
        _id: "song-2-6",
        title: "Song 2-6",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_6.jpg",
        audioUrl: "/music/2_6.mp3",
        duration: 0,
    },
    {
        _id: "song-2-7",
        title: "Song 2-7",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_7.jpg",
        audioUrl: "/music/2_7.mp3",
        duration: 0,
    },
    {
        _id: "song-2-8",
        title: "Song 2-8",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_8.jpg",
        audioUrl: "/music/2_8.mp3",
        duration: 0,
    },
    {
        _id: "song-2-9",
        title: "Song 2-9",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_9.jpg",
        audioUrl: "/music/2_9.mp3",
        duration: 0,
    },
    {
        _id: "song-2-10",
        title: "Song 2-10",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_10.jpg",
        audioUrl: "/music/2_10.mp3",
        duration: 0,
    },
    {
        _id: "song-2-11",
        title: "Song 2-11",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_11.jpg",
        audioUrl: "/music/2_11.mp3",
        duration: 0,
    },
    {
        _id: "song-2-12",
        title: "Song 2-12",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_12.jpg",
        audioUrl: "/music/2_12.mp3",
        duration: 0,
    },
    {
        _id: "song-2-13",
        title: "Song 2-13",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_13.jpg",
        audioUrl: "/music/2_13.mp3",
        duration: 0,
    },
    {
        _id: "song-2-14",
        title: "Song 2-14",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_14.jpg",
        audioUrl: "/music/2_14.mp3",
        duration: 0,
    },
    {
        _id: "song-2-15",
        title: "Song 2-15",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_15.jpg",
        audioUrl: "/music/2_15.mp3",
        duration: 0,
    },
    {
        _id: "song-2-16",
        title: "Song 2-16",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_16.jpg",
        audioUrl: "/music/2_16.mp3",
        duration: 0,
    },
    {
        _id: "song-2-17",
        title: "Song 2-17",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_17.jpg",
        audioUrl: "/music/2_17.mp3",
        duration: 0,
    },
    {
        _id: "song-2-18",
        title: "Song 2-18",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_18.jpg",
        audioUrl: "/music/2_18.mp3",
        duration: 0,
    },
    {
        _id: "song-2-19",
        title: "Song 2-19",
        artist: "Electric Dreams",
        albumId: "album-2",
        imageUrl: "/cover-images/2_2.jpg",
        audioUrl: "/music/2_2_1.mp3",
        duration: 0,
    },
];

const album3Songs: Song[] = [
    {
        _id: "song-3-1",
        title: "Dari Lubuk Hati",
        artist: "Sandy Dewangga",
        albumId: "album-3",
        imageUrl: "/cover-images/3_0_cover.jpg",
        audioUrl: "/music/3_1.mp3",
        duration: 0,
    },
    {
        _id: "song-3-2",
        title: "Jangan Takut Pada Cinta",
        artist: "Sandy Dewangga",
        albumId: "album-3",
        imageUrl: "/cover-images/3_0_cover.jpg",
        audioUrl: "/music/3_2.mp3",
        duration: 0,
    },
    {
        _id: "song-3-3",
        title: "Aku dan Langit",
        artist: "Sandy Dewangga",
        albumId: "album-3",
        imageUrl: "/cover-images/3_0_cover.jpg",
        audioUrl: "/music/3_3.mp3",
        duration: 0,
    },
];

const album4Songs: Song[] = [
    {
        _id: "song-4-1",
        title: "Song 4-1",
        artist: "Luna Ridge",
        albumId: "album-4",
        imageUrl: "/cover-images/4_0_cover.jpg",
        audioUrl: "/music/4_1.mp3",
        duration: 0,
    },
    {
        _id: "song-4-2",
        title: "Song 4-2",
        artist: "Luna Ridge",
        albumId: "album-4",
        imageUrl: "/cover-images/4_0_cover.jpg",
        audioUrl: "/music/4_2.mp3",
        duration: 0,
    },
];

const featuredSongs: Song[] = [...album1Songs];

const madeForYouSongs: Song[] = [...album2Songs];

const trendingSongs: Song[] = [...album3Songs];

const albums: Album[] = [
    {
        _id: "album-1",
        title: "Liked Songs",
        artist: "Danar IT",
        imageUrl: "/albums/1_0_album.jpg",
        releaseYear: 2026,
        songs: album1Songs,
    },
    {
        _id: "album-2",
        title: "Album 2",
        artist: "Electric Dreams",
        imageUrl: "/albums/2_0_album.jpg",
        releaseYear: 2024,
        songs: album2Songs,
    },
    {
        _id: "album-3",
        title: "Aku dan Langit",
        artist: "Sandy Dewangga",
        imageUrl: "/albums/3_0_album.jpg",
        releaseYear: 2025,
        songs: album3Songs,
    },
    {
        _id: "album-4",
        title: "Album 4",
        artist: "Luna Ridge",
        imageUrl: "/albums/4_0_album.jpg",
        releaseYear: 2024,
        songs: album4Songs,
    },
];

const allSongs: Song[] = [
    ...album1Songs,
    ...album2Songs,
    ...album3Songs,
    ...album4Songs,
];

export { featuredSongs, madeForYouSongs, trendingSongs, albums, allSongs };