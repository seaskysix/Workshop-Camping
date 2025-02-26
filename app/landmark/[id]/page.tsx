// app/landmark/[id]/page.tsx
import React from "react";
import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import { notFound } from "next/navigation";  // ใช้ notFound แทน redirect

interface Landmark {
  id: string;
  name: string;
  image: string;
  description: string;
}

const LandmarkDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // ดึงข้อมูลใน server
  const landmarkData = await fetchLandmarkDetail({ id });

  // ถ้าข้อมูลไม่พบ ให้ใช้ notFound()
  if (!landmarkData) {
    notFound();
  }

  return (
    <section>
      <Breadcrums name={landmarkData.name} />
      <header className="flex justify-between mt-4 items-center">
        <h1 className="text-4xl font-bold">{landmarkData.name}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton landmarkId={landmarkData.id} name={landmarkData.name} />
          <FavoriteToggleButton landmarkId={landmarkData.id} />
        </div>
      </header>
      {/* Image */}
      <ImageContainer mainImage={landmarkData.image} name={landmarkData.name} />
      {/* Detail */}
      <section>
        <div>
          <Description description={landmarkData.description} />
        </div>
      </section>
    </section>
  );
};

export default LandmarkDetail;
