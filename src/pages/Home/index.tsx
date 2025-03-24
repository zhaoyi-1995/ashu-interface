import { useImmer } from "@/hooks/useImmer";
import { useEffect } from "react";
type BooksListItem = {
  id: string | number,
  name: string,
  desc?: string,
  auth: string,
  price: number
}

const Home = () => {
  const [bookList, setBookList] = useImmer<BooksListItem[]>([])
  useEffect(() => {
    fetch('/api/bookList')
    .then((res) => res.json())
    .then((result) => setBookList(result.data))
    .catch((err) => console.error("Error:", err));
  }, [])

  return <>
    <h2>书籍列表</h2>
    {bookList.map(item => <div>{item.name} ---- {item.auth}</div> )}
    <p>22222222</p>
  </>;
};

export default Home;
