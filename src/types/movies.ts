export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  character: string;
  popularity?: number;
}