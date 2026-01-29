"use client";

import FBXViewer from "@/components/FbxRender";
import ObjViewer from "@/components/ObjRender";

export default function Home() {
  return (
    <div className="h-screen bg-gray-500">
      <FBXViewer/>
      {/* <ObjViewer/> */}
    </div>
  );
}
