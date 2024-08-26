import { Fonts, TextTransform } from "."

type Props = {
  fonts: Fonts[]
  fontSize: number
  letterSpacing: number
  textTransform: TextTransform
  previewText: string
}

export default function View({
  fonts,
  fontSize,
  letterSpacing,
  textTransform,
  previewText,
}: Props) {
  return (
    <div className="space-y-6">
      {fonts.map((font, index) => (
        <div
          key={index}
          className="flex items-center space-x-6 border-b border-gray-300 pb-4 mx-24"
        >
          <div className="flex-1">
            <p
              className="text-gray-800"
              style={{
                fontFamily: font.name,
                fontSize: `${fontSize}px`,
                letterSpacing: `${letterSpacing}px`,
                textTransform:
                  textTransform === "none" ? "none" : textTransform,
              }}
            >
              {previewText}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {font.name}
              </h3>
              <p className="text-gray-700">{font.designer}</p>
            </div>

            <div className="flex space-x-4">
              <button className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition duration-300 text-sm">
                Image Download
              </button>

              <button className="px-3 py-1.5 bg-orange-400 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300 text-sm">
                Font Download
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
