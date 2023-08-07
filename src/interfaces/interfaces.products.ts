interface IParams {
  id: string | number;
}

interface IBody {
  id: string | number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export { IBody, IParams };
