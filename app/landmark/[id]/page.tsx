import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandmark from "@/components/map/MapLandmark";
import { notFound } from "next/navigation";

// Define the type of the props correctly
interface LandmarkPageProps {
  params: {
    id: string;
  };
}

const LandmarkDetail = async ({ params }: LandmarkPageProps) => {
  const { id } = params; // Ensure this matches the structure of the params field
  const landmark = await fetchLandmarkDetail({ id });

  // If no landmark is found, show a 404 page
  if (!landmark) {
    notFound(); // Use Next.js's notFound to display a 404 page
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