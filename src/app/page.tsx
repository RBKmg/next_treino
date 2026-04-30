import Feed from "@/(components)/_feed/feed";
import photosGet from "@/(components)/_service/photos-get";

export default async function Home() {
  const response = await photosGet();
  const data = response.ok ? response.data : null;

  return (
    <section className="container mainContainer">

      {data && <Feed photos={data} />}

    </section>
  );
}
