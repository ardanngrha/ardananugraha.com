export default interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    username: string;
    image: string | null;
  };
}