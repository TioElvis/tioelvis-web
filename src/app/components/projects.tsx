import { findProjects } from "@/lib/project";

export async function Projects() {
  const { data, success } = await findProjects("?limit=3");

  if (!success) {
    return <div>Error</div>;
  }

  console.log(data);

  return (
    <section className="min-h-screen flex justify-center items-center">
      Projects
    </section>
  );
}
