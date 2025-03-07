import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandmark from "@/components/map/MapLandmark";
import { redirect } from "next/navigation";

// const LandmarkDetail = async ({
//   // params,
//   // searchParams: _searchParams,

//   params: { id }, // ✅ Destructure `params` ที่นี่
//   searchParams: _searchParams,
// }: {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] };
// }) => {
//   if (!id) {
//     redirect("/"); // Redirect ถ้า id ไม่มี
//     return null; // ป้องกันการทำงานต่อไป
//   }

//   // const { id } = params;
//   const landmark = await fetchLandmarkDetail({ id });
//   // if (!landmark) redirect("/");

//   if (!landmark) redirect("/");

const LandmarkDetail = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>; // ✅ กำหนดว่า params เป็น Promise
  searchParams: { [key: string]: string | string[] };
}) => {
  const { id } = await params; // ✅ ใช้ await เพื่อดึงค่า `id` อย่างปลอดภัย

  if (!id) {
    redirect("/");
    return null;
  }

  const landmark = await fetchLandmarkDetail({ id });

  if (!landmark) {
    redirect("/");
    return null;
  }

  return (
    <section>
      <Breadcrums name={landmark.name} />
      <header className="flex justify-between mt-4 items-center">
        <h1 className="text-4xl font-bold">{landmark.name}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton landmarkId={landmark.id} name={landmark.name} />
          <FavoriteToggleButton landmarkId={landmark.id} />
        </div>
      </header>
      <ImageContainer mainImage={landmark.image ?? ""} name={landmark.name} />
      <section>
        <div>
          <Description description={landmark.description} />
          <MapLandmark
            location={{ lat: landmark.lat ?? 0, lng: landmark.lng ?? 0 }}
          />
        </div>
      </section>
    </section>
  );
};

export default LandmarkDetail;

