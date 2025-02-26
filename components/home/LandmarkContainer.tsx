import { fetchLandmarks, fetchLandmarksHero } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";
import CategoriesList from "./CategoriesList";
import EmptyList from "./EmptyList";

const LandmarkContainer = async ({
  search,
  category
}: {
  search?: string;
  category?: string;
}) => {
  let landmarks: LandmarkCardProps[] = [];
  let landmarksHero: LandmarkCardProps[] = [];

  try {
    landmarks = await fetchLandmarks({ search, category }) || [];
  } catch (error) {
    console.error("Error fetching landmarks:", error);
  }

  try {
    landmarksHero = await fetchLandmarksHero() || [];
  } catch (error) {
    console.error("Error fetching hero landmarks:", error);
  }

  return (
    <div suppressHydrationWarning>
      <Hero landmarks={landmarksHero} />
      <CategoriesList search={search} category={category} />
      {
        landmarks.length === 0
          ? <EmptyList heading="No results" btnText="Clear Filters" />
          : <LandmarkList landmarks={landmarks} />
      }
    </div>
  );
};

export default LandmarkContainer;
