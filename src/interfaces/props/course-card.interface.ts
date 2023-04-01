export interface ICourseCardProps {
  category: string;
  creatorName: string;
  description: string;
  id: number;
  image: {
    ID: number;
    Name: string;
    Path: string;
    url: string;
  };
  name: string;
  route: string;
  updatedAt: string;
}
