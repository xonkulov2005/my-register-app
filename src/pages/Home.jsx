import { useCollection } from "../hooks/useCollaction";

function Home() {
  const { data } = useCollection("recepies");

  return (
    <div>
      {data &&
        data.map((r) => {
          return <h2 key={r.id}>{r.title}</h2>;
        })}
    </div>
  );
}

export default Home;
