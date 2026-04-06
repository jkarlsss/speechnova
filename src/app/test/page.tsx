import { prisma } from "../../lib/db"

export default async function Page() {
  const voices = await prisma.voice.findMany()
  return (
    <div>
      {voices.map((voice) => (
        <div key={voice.id}>{voice.name}</div>
      ))}
    </div>
  )
}
