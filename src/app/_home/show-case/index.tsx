"use client"

import { useState } from "react"
import Controller from "./controller"
import View from "./view"
import PreviewInput from "./preview-input"

export type Fonts = {
  name: string
  designer: string
  path: string
}

export type TextTransform = "uppercase" | "lowercase" | "capitalize" | "none"

export default function ShowCase({ fonts }: { fonts: Fonts[] }) {
  const [previewText, setPreviewText] = useState("Type here to preview font")
  const [fontSize, setFontSize] = useState(24)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [textTransform, setTextTransform] = useState<TextTransform>("none")

  return (
    <>
      <PreviewInput previewText={previewText} setPreviewText={setPreviewText} />

      <Controller
        letterSpacing={letterSpacing}
        fontSize={fontSize}
        setTextTransform={setTextTransform}
        setFontSize={setFontSize}
        setLetterSpacing={setLetterSpacing}
      />

      <View
        fonts={fonts}
        fontSize={fontSize}
        letterSpacing={letterSpacing}
        textTransform={textTransform}
        previewText={previewText}
      />
    </>
  )
}
