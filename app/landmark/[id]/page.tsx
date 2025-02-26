import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandmark from "@/components/map/MapLandmark";
import { redirect } from "next/navigation";

interface Landmark {
  id: string;
  name: string;
  image: string;
  description: string;
  lat: number;
  lng: number;
}

interface LandmarkDetailProps {
  params: { id: string };
}

const LandmarkDetail = async ({ params }: LandmarkDetailProps) => {
  const { id } = params;
  const landmark: Landmark = await fetchLandmarkDetail({ id }); // ใช้ประเภท Landmark ที่นี่

  if (!landmark) redirect("/");

  return (
    <section>
      <Breadcrums name={landmark.name} />
      <header className="flex justify-between mt-4 items-center">
        <h1 className="text-4xl font-bold"> {landmark.name}</h1>
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