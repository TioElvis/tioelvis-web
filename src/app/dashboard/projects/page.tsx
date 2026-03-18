import { findRepos } from "@/lib/github";
import { CardRepo } from "@/components/card-repo";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default async function Page() {
  const response = await findRepos();

  if (!response.success) {
    return <div>Error</div>;
  }

  const repos = response.data;

  return (
    <MaxWidthWrapper className="min-h-screen flex flex-col py-8 gap-4">
      <h2 className="text-5xl sm:text-6xl my-4">
        TioElvis <span className="text-primary">Projects.</span>
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        {repos.map((repo, index) => (
          <CardRepo key={repo.url} repo={repo} index={index} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
