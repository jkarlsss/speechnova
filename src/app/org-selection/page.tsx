import { OrganizationList } from "@clerk/nextjs"

const Page = () => {
  return (
    <div className="min-h-screen bg-background flex flex-1 items-center justify-center">
      <OrganizationList 
        hidePersonal
        afterCreateOrganizationUrl={"/"}
        afterSelectOrganizationUrl={"/"}
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg"
          }
        }}
      />
    </div>
  )
}

export default Page