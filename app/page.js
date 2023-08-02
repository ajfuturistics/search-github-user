import Input from "@/components/Input";
import Image from "next/image";

async function getGithubUser(username) {
  console.log(username);
  if (!username || username === "") return false;

  const data = await fetch(`https://api.github.com/users/${username}`, {
    cache: "no-store",
  });

  if (!data.ok) {
    return data.json();
  }

  return data.json();
}

export default async function Home({ searchParams }) {
  const data = await getGithubUser(searchParams.username);

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-center my-6 text-xl font-semibold">
          Get Github User Data
        </h1>
        <Input />
        <div className="flex justify-center my-2">
          {data?.login && (
            <div className="flex flex-col justify-center max-w-xs py-3 shadow-md rounded-xl px-6 dark:bg-gray-900 dark:text-gray-100">
              <Image
                src={data?.avatar_url}
                alt={data?.login}
                width="0"
                height="0"
                sizes="100vw"
                className="w-28 h-28 mx-auto rounded-full dark:bg-gray-500 aspect-square"
              />
              <div className="space-y-4 divide-y divide-gray-700">
                <div className="my-2 text-center">
                  <h2 className="text-2xl font-semibold">{data?.name}</h2>
                  <p className="text-base dark:text-gray-400">{data?.login}</p>
                </div>
                <div className="flex flex-col text-sm pt-4">
                  <div>Public Repos: {data?.public_repos}</div>
                  <div>Public Gists: {data?.public_gists}</div>
                  <div>Created At: {data?.created_at.split("T")[0]}</div>
                </div>
              </div>
            </div>
          )}
          {data?.message ? (
            <p className="text-center my-2">
              {data?.message || "Something went wrong"}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
