import Feed from "@/(components)/_feed/feed";
import photosHomeGet from "@/(components)/_service/photos-home-get";

export default async function Home() {
  const { data } = await photosHomeGet();


  return (
    <section className="container mainContainer">

      {data && <Feed photos={data} />}

    </section>
  );
}
