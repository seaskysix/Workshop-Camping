"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/types"; // import actionFunction type

const initialState = {
  message: "",
};

const FormContainer = ({ action, children }: { action: actionFunction, children: React.ReactNode }) => {
  const { toast } = useToast();
  const [state, setState] = useState(initialState); // ให้ค่าเริ่มต้นกับ state
  const [formData, setFormData] = useState<FormData | null>(null); // ใช้ formData สำหรับเก็บข้อมูลฟอร์ม

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData) {
      try {
        // เรียกใช้ action พร้อมกับ prevState และ formData
        const result = await action(state, formData); // ส่ง prevState และ formData ไป
        if (result?.message) {
          setState(prevState => ({ ...prevState, message: result.message })); // อัพเดต state
        }
      } catch (error) {
        console.error("Error in action:", error);
        setState(prevState => ({ ...prevState, message: "เกิดข้อผิดพลาดในการทำงาน" }));
      }
    }
  };

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state.message, toast]);

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default FormContainer;
