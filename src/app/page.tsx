import Navbar from "@/components/Navbar"
import FontStats from "@/components/font-stats"
import ShowCase from "./_home/show-case"

// Sample font data with correct paths
const fontsData = [
  {
    name: "Roboto",
    designer: "Christian Robertson",
    path: "/fonts/Roboto.ttf",
  },
  {
    name: "Open Sans",
    designer: "Steve Matteson",
    path: "/fonts/OpenSans.ttf",
  },
  {
    name: "Lato",
    designer: "Łukasz Dziedzic",
    path: "/fonts/Lato.ttf",
  },
  {
    name: "Montserrat",
    designer: "Julieta Ulanovsky",
    path: "/fonts/Montserrat.otf",
  },
]

export default function Home() {
  return (
    <div className="mx-auto">

      <nav
        className="flex justify-center items-center p-3"
        style={{
          backgroundColor: "#FF6347",
        }}
      >
        <input
          type="text"
          placeholder="Search Font Here"
          style={{ padding: "5px", width: "300px", borderRadius: "4px" }}
        />
      </nav>

      <hr />

      <ShowCase fonts={fontsData} />
      <FontStats />
    </div>
  )
}

// Dynamically load fonts by adding @font-face declarations
// useEffect(() => {
//   const style = document.createElement("style")
//   document.head.appendChild(style)

//   fontsData.forEach((font) => {
//     const fontFace = new FontFace(font.name, `url(${font.file})`)
//     fontFace
//       .load()
//       .then((loadedFace) => {
//         document.fonts.add(loadedFace)
//       })
//       .catch((err) => {
//         console.error(`Failed to load font: ${font.name}`, err)
//       })
//   })

//   return () => {
//     document.head.removeChild(style)
//   }
// }, [])
