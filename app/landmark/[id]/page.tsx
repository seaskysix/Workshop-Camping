import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandmark from "@/components/map/MapLandmark";
import { notFound } from "next/navigation";

// กำหนดประเภทให้ตรงกับ Next.js PageProps
interface LandmarkPageProps {
  params: {
    id: string;
  };
}

const LandmarkDetail = async ({ params }: LandmarkPageProps) => {
  const { id } = params; // params เป็น object ที่ไม่มี async/await
  const landmark = await fetchLandmarkDetail({ id });

  // หากไม่พบ landmark ให้แสดงหน้าผิดพลาด
  if (!landmark) {
    notFound(); // ใช้ notFound เพื่อแสดงหน้าผิดพลาด
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
      {/* Image */}
      <ImageContainer mainImage={landmark.image} name={landmark.name} />
      {/* Detail */}
      <section>
        <div>
          <Description description={landmark.description} />
          <MapLandmark 
            location={{ lat: landmark.lat, lng: landmark.lng }} 
          />
        </div>
      </section>
    </section>
  );
};

export default LandmarkDetail;
