import React from "react";
import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import { notFound } from "next/navigation";  // ใช้ notFound แทน redirect
import { GetServerSidePropsContext } from "next"; // Import GetServerSidePropsContext

const LandmarkDetail = async ({ params }: GetServerSidePropsContext) => {
  if (!params || typeof params.id !== 'string') {
    notFound(); // ถ้าไม่พบข้อมูลให้ใช้ notFound()
    return;
  }

  const { id } = params;

  // ดึงข้อมูลจาก server โดยตรง
  const landmarkData = await fetchLandmarkDetail({ id });

  if (!landmarkData) {
    notFound(); // ถ้าไม่พบข้อมูลให้ใช้ notFound()
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