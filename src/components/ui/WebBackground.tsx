"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function WebBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <MeshGradient
        className="w-full h-full"
        colors={["#f5f0eb", "#e0cbb5", "#c9a882", "#ede5d8"]}
        speed={0.35}
        distortion={0.45}
        swirl={0.06}
      />
    </div>
  )
}
