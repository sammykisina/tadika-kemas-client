import { useAuth } from "@/hooks";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  /**
   * page states
   */
  const { user } = useAuth();
  console.log("user", user);

  /**
   * page functions
   */

  return (
    <>
      <Head>
        <title>Title</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="border-c_dark flex h-full items-center justify-center rounded-[2rem] border">
        <div>The start</div>
      </main>
    </>
  );
};

export default Home;